---
title: VPNs (Virtual Private Networks)
---

A **Virtual Private Network (VPN)** is one of the most widely used tools for bypassing internet restrictions. It creates an encrypted tunnel between your device and a server operated by the VPN provider, routing all of your internet traffic through that server. To anyone monitoring your connection — your ISP, a government firewall, or a network administrator — the traffic appears to be going to the VPN server and nothing more.

This guide covers what VPNs are, how they work, how to choose one, and their limitations.

---

## How a VPN Works

```
Your Device → Encrypted Tunnel → VPN Server → Internet
                    │
          ISP sees only encrypted
          traffic to VPN server
```

1. **Connection initiation** — Your device connects to a VPN server using a VPN protocol (WireGuard, OpenVPN, IKEv2, etc.).
2. **Tunnel creation** — An encrypted tunnel is established. All data passing through is encrypted with a key that only your device and the VPN server possess.
3. **Traffic routing** — Your device's network traffic is routed through this tunnel to the VPN server. The VPN server then forwards your requests to the wider internet.
4. **Response relay** — Responses from the internet go to the VPN server, which encrypts and sends them back through the tunnel to you.

The result: your real IP address is hidden from the websites you visit, and the content you access is hidden from your ISP or network monitor.

---

## Key Concepts

### VPN Protocols

| Protocol | Speed | Security | Best For |
|---|---|---|---|
| **WireGuard** | Very fast | Excellent | General use; modern, lean, audited |
| **OpenVPN** | Moderate | Excellent | Compatibility; works almost everywhere |
| **IKEv2/IPsec** | Fast | Good | Mobile devices; handles network switches well |
| **SSH Tunnel** | Moderate | Good | Technical users; no extra software needed |
| **SSTP** | Moderate | Good | Windows users; can bypass some firewalls |

### Kill Switch

A **kill switch** is a critical feature. If the VPN connection drops unexpectedly, the kill switch blocks all internet traffic to prevent your real IP from leaking. Without a kill switch, a momentary VPN failure can expose your identity and defeat the purpose of using the VPN in the first place.

### Split Tunnelling

Some VPNs allow **split tunnelling** — sending only selected traffic through the VPN while the rest uses your normal connection. This is useful if you only need to bypass restrictions for specific services (e.g., a blocked news site) while keeping local services (e.g., banking) on your regular connection.

### DNS Leak Protection

Even when your traffic is tunnelled, DNS queries can leak outside the tunnel if not properly configured. A good VPN routes DNS queries through the same encrypted tunnel. **DNS leak tests** are available online and should be run after setting up any VPN.

---

## Choosing a VPN Provider

Not all VPNs are equal. Some keep logs, some cooperate with authorities, and some are outright scams. Here is what to evaluate:

### No-Logging Policy
The provider should have a publicly stated and ideally audited policy of not logging your traffic or connection metadata. Independent audits by third-party firms (e.g., Deloitte, Cure53) add credibility.

### Jurisdiction
Where the VPN company is incorporated matters. Providers based in:
- **14 Eyes countries** (UK, US, Australia, etc.) — can be legally compelled to hand over data
- **Privacy-friendly jurisdictions** (Switzerland, Iceland, Panama) — stronger legal protections

### Protocol Support
Prefer providers that support **WireGuard** (fast and modern) alongside **OpenVPN** (widely compatible). Avoid providers that rely solely on proprietary, closed-source protocols.

### Obfuscation
Some networks actively detect and block VPN traffic. **Obfuscation features** (sometimes called "stealth" or "camouflage") make VPN traffic look like ordinary HTTPS traffic, helping it bypass deep packet inspection (DPI).

### Transparency
Look for:
- Open-source clients where possible
- Regular security audits published publicly
- A clear history of responding to legal requests transparently

---

## Setting Up a VPN

### On Desktop (Windows / macOS / Linux)

1. **Choose a provider** and sign up.
2. **Download and install** the provider's client application.
3. **Log in** and connect to a server in your chosen location.
4. **Verify** the connection using an IP-checking website or a DNS leak test.

For advanced setups, you can configure OpenVPN or WireGuard manually without using a provider's client. This gives you more control and avoids potential client-side telemetry.

### On Mobile (Android / iOS)

1. Install the provider's app from the official app store.
2. Log in and grant the VPN permission when prompted.
3. Connect and verify.

On Android, you can also import OpenVPN or WireGuard configuration files directly using the official apps for those protocols.

### On a Router

Flashing a compatible router with **OpenWrt** or **DD-WRT** allows you to install a VPN at the router level. Every device connected to that router is then protected without individual configuration. This is useful for devices that cannot run VPN software (games consoles, smart TVs, etc.).

---

## Limitations and Risks

### VPNs Can Be Blocked
Governments and platforms increasingly block known VPN server IP addresses. This is an arms race — providers add new servers, and blocks adapt. **Obfuscation** and **Tor over VPN** are partial solutions.

### The VPN Provider Can See Your Traffic
A VPN does not make you anonymous to the VPN provider. The provider sees everything. This is why choosing a no-log provider in a safe jurisdiction matters.

### Not a Cure-All
A VPN protects your traffic **in transit**. It does not:
- Protect against malware or phishing
- Prevent tracking via cookies, browser fingerprinting, or logged-in accounts
- Make you anonymous on its own (that requires additional operational security)

### Speed Impact
Encryption and routing through a remote server adds latency and can reduce throughput. WireGuard minimises this overhead but some slowdown is inevitable.

---

## Free vs Paid VPNs

| | Free VPN | Paid VPN |
|---|---|---|
| **Cost** | Free | £3–£12/month |
| **Speed** | Often throttled | Typically full bandwidth |
| **Data cap** | Common (5–10GB/month) | Usually unlimited |
| **Server locations** | Limited | Hundreds in dozens of countries |
| **Privacy** | Many log and sell data | Audited no-log policies |
| **Ads** | Common | Rare |
| **Business model concern** | You are the product | Subscription-funded |

**Recommendation**: Avoid free VPNs unless you have thoroughly vetted them. Many free VPNs have been caught logging, injecting ads, or selling bandwidth. If you cannot afford a paid VPN, consider using Tor instead (see [[tor|Tor guide]]).

---

## Quick Reference

| Task | Command / Action |
|---|---|
| Check your public IP | Visit `ifconfig.me` or `ipinfo.io` |
| DNS leak test | Visit `dnsleaktest.com` |
| WebRTC leak test | Visit `browserleaks.com/webrtc` |
| Disable IPv6 (prevents leaks) | Network settings → disable IPv6 on VPN adapter |
| Test VPN speed | `speedtest-cli` or `fast.com` |

---

## Related

- [[proxies|Proxies — How They Compare to VPNs]]
- [[tor|Tor — The Onion Router]]
- [[bypass-methods|Overview of Bypass Methods]]
