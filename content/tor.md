---
title: "Lesson 4: Browse with Tor"
---

<div class="lesson-banner">
  <span class="lesson-banner-label">LESSON 4 OF 6</span>
  <span class="lesson-banner-time">⏱ 5 minutes</span>
</div>

# Browse with Tor

**Tor** (short for **The Onion Router**) is a free, open-source network designed to provide strong anonymity online. Unlike a VPN or a proxy, which typically route your traffic through a single server, Tor routes your traffic through **three layers of encryption** across **three volunteer-operated relays**, stripping one layer at each hop. This makes it significantly harder to trace traffic back to you — but it also comes with trade-offs in speed and usability.

This guide covers how Tor works, how to use it, when to use it, and its limitations.

---

## How Tor Works

### Onion Routing

The name "onion routing" refers to the layered encryption structure. When you send traffic through Tor:

```
Your Device → Guard Relay → Middle Relay → Exit Relay → Internet
     │            │             │             │
    Layer 3     Layer 2       Layer 1      Unencrypted
   (encrypted   (encrypted    (encrypted    plaintext
    to Exit)    to Middle)    to Guard)     to destination)
```

1. Your Tor client fetches a list of available relays from a **directory authority**.
2. It builds a path (a "circuit") of three relays: a **guard**, a **middle**, and an **exit**.
3. The data is encrypted in three layers. Each relay can only decrypt its assigned layer, which tells it where to forward the data next.
4. No single relay knows both the origin and the destination. The guard knows who you are but not what you are doing. The exit knows what you are doing but not who you are. The middle knows neither.
5. Circuits are rotated every 10 minutes for additional security.

### Onion Services (formerly "Hidden Services")

Tor also hosts **onion services** — websites and services reachable only through the Tor network, identified by `.onion` addresses. These provide:

- **Anonymity for the server** — The hosting server's IP address is hidden.
- **Anonymity for the visitor** — Access is routed through Tor, providing mutual anonymity.
- **End-to-end encryption** — Traffic never leaves the Tor network unencrypted (no exit node risk).
- **Censorship resistance** — .onion sites are extremely difficult to block at the network level.

---

## Getting Started: Tor Browser

The **Tor Browser** is the easiest and safest way to use Tor. It is a modified version of Firefox ESR with privacy and security hardening built in.

### Installation

1. Go to [https://www.torproject.org](https://www.torproject.org)
2. Download Tor Browser for your operating system.
3. Verify the GPG signature (recommended — see [verifying signatures](https://support.torproject.org/tbb/how-to-verify-signature/)).
4. Extract and run.

**Important**: Always download Tor Browser from the official website or a trusted mirror. Third-party distributions may be tampered with.

### First Connection

On first launch, Tor Browser will ask whether Tor is censored in your country:

- **"Connect"** — Use for direct connection to the Tor network (most cases).
- **"Configure"** — Use if you need to configure **bridges** or a proxy to reach the Tor network.

Once connected, Tor Browser behaves like a regular browser. The **Security Level** slider (shield icon in the address bar) lets you balance usability against protection:

- **Standard** — Full functionality.
- **Safer** — Disables some features (e.g., JavaScript on non-HTTPS sites, some fonts).
- **Safest** — Disables JavaScript entirely, limits media playback. Use for high-risk situations.

---

## Bridges and Pluggable Transports

In countries where Tor is actively blocked (China, Iran, Russia, etc.), the network monitors and blocks connections to public Tor relays. **Bridges** are secret, unlisted relays that are harder to block.

### Getting Bridges

1. In Tor Browser, click "Configure" on the connection screen.
2. Select "Use a bridge."
3. Choose from:
   - **Built-in bridges** — Tor Browser comes with some preloaded bridge addresses.
   - **Request a bridge from torproject.org** — Visit `https://bridges.torproject.org/` to receive bridges via email, or use the Telegram bot (@GetBridgesBot).
   - **Moats** — Use the same Telegram bot to request bridges inside Tor Browser.

### Pluggable Transports

Pluggable transports disguise Tor traffic to look like something else:

| Transport | What it looks like | Best for |
|---|---|---|
| **obfs4** | Random noise | General blocking circumvention |
| **WebTunnel** | Regular HTTPS traffic | Deep packet inspection (DPI) environments |
| **Snowflake** | WebRTC calls | Decentralised; users host proxies for others |
| **Conjure** | Obfuscated SSH | Highly restricted networks |
| **meek** | Microsoft Azure traffic | Corporate firewalls |

To use a pluggable transport, select it in the bridge configuration screen. If one transport is blocked, try another.

---

## Running a Tor Relay

If you have a reasonably stable internet connection, consider running a **Tor relay** to help strengthen the network. Running a relay does not require the same legal or operational caution as running an exit node, because non-exit relays simply pass encrypted traffic between other relays.

| Relay Type | Bandwidth | What it does | Legal Risk |
|---|---|---|---|
| **Bridge** | Low | Provides access for censored users | Minimal |
| **Guard/Middle** | Moderate | Passes encrypted traffic | Minimal |
| **Exit** | High | Passes decrypted traffic to the internet | Significant — may attract abuse complaints |

To run a relay, follow the guide at [community.torproject.org/relay](https://community.torproject.org/relay/).

---

## Tor vs VPN

| | Tor | VPN |
|---|---|---|
| **Anonymity** | Strong — distributed trust across three relays | Moderate — trusts the VPN provider entirely |
| **Speed** | Slow — traffic passes through three nodes | Fast — single server hop |
| **Target** | Anonymity against a strong adversary | Privacy from ISP or local network |
| **Ease of use** | Easy with Tor Browser | Easy with a provider client |
| **Blocking resistance** | Moderate — uses bridges/transports | Moderate — uses obfuscation |
| **Stream isolation** | Yes — each circuit is independent | No — all traffic shares one tunnel |
| **Cost** | Free | Typically paid |
| **Logging** | None by design | Depends on provider policy |

### Tor over VPN / VPN over Tor

These are advanced configurations for specific threat models:

**Tor over VPN**: Connect to your VPN first, then launch Tor Browser over the VPN connection. This hides Tor usage from your ISP (they see only VPN traffic). The VPN provider can see you are using Tor but not what you do through it.

**VPN over Tor**: Route your VPN connection through the Tor network. This is complex and generally **not recommended** because it adds a single point of failure (the VPN provider) downstream of Tor's exit node.

---

## Limitations and Risks

### Exit Node Sniffing
Data leaving the Tor network through the exit node is in plaintext unless the destination uses HTTPS. A malicious exit node operator can intercept unencrypted traffic. Always use HTTPS when browsing through Tor.

### Tor Does Not Magically Make Everything Anonymous
- Tor only anonymises traffic routed through it. Other applications on your system still use your normal connection.
- Browser fingerprinting can still identify you even behind Tor. Do not install extra add-ons, resize the Tor Browser window, or log into personal accounts.
- Tor does not protect against malware, phishing, or physical surveillance (e.g., a camera pointed at your screen).

### Slow Speeds
By design, Tor is slower than a standard connection. Multi-hop routing, bandwidth constraints of volunteer relays, and circuit rotation all contribute. Tor is not suitable for streaming video, large downloads, or real-time communication.

### Association Risk
If you use Tor and a clearnet identity simultaneously (e.g., logging into your real Facebook account through Tor Browser), you have linked your anonymous activity to your real identity. Use separate browsers and separate personas.

### Legal Attention
In some countries, simply running Tor Browser can draw scrutiny from authorities. This does not mean you are doing anything wrong — Tor is a legitimate privacy tool — but it is worth being aware of local attitudes.

---

## Recommended Practices

| Do | Don't |
|---|---|
| Use Tor Browser for all Tor traffic | Install extra add-ons or modify the browser |
| Maximise the window to fill your screen (anti-fingerprinting) | Maximise to a unique size that identifies you |
| Use HTTPS everywhere | Log into personal accounts |
| Close Tor Browser when not in use | Leave tabs open overnight |
| Use bridges if Tor is blocked | Use Tor for torrenting (bypasses Tor anonymity) |
| Keep Tor Browser updated | Resize the browser window uniquely |

---

<div class="lesson-nav">
  <a href="vpns" class="lesson-nav-prev">← Previous: Use a VPN</a>
  <a href="proxies" class="lesson-nav-next">Next Lesson: Try Proxies →</a>
</div>
