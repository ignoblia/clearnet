#!/usr/bin/env node
import fs from "fs"
import path from "path"
import YAML from "yaml"
import { installPlugins, parsePluginSource } from "./gitLoader.js"

const CONFIG_YAML_PATH = path.join(process.cwd(), "quartz.config.yaml")

function getPluginSources(): string[] {
  if (!fs.existsSync(CONFIG_YAML_PATH)) {
    console.log("No quartz.config.yaml found.")
    return []
  }

  const raw = fs.readFileSync(CONFIG_YAML_PATH, "utf-8")
  let parsed: any
  try {
    parsed = YAML.parse(raw)
  } catch {
    console.error("Failed to parse quartz.config.yaml")
    return []
  }

  const plugins: any[] = parsed?.plugins ?? []
  const sources: string[] = []

  for (const entry of plugins) {
    if (entry && entry.source && entry.enabled !== false) {
      sources.push(entry.source)
    }
  }

  return sources
}

async function main() {
  const sources = getPluginSources()

  if (sources.length === 0) {
    console.log("No external plugins to install.")
    return
  }

  console.log(`Installing ${sources.length} plugin(s) from Git...`)

  const specs = sources.map((source: string) => parsePluginSource(source))
  const installed = await installPlugins(specs, { verbose: true })

  if (installed.size === sources.length) {
    console.log("✓ All plugins installed successfully")
  } else {
    console.error(`✗ Only ${installed.size}/${sources.length} plugins installed`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error("Failed to install plugins:", err)
  process.exit(1)
})
