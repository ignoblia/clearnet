---
title: Overview of Bypass Methods
---

This page provides a comparative overview of the main methods for bypassing internet restrictions. Each method has different trade-offs in terms of privacy, speed, ease of use, and resilience against blocking.

---

## Quick Comparison

| Method | Privacy | Speed | Ease of Use | Blocking Resistance | Cost |
|---|---|---|---|---|---|
| **VPN** | High (trusts provider) | Fast | Easy | Moderate | £ |
| **Tor** | Very high | Slow | Easy (Tor Browser) | High (with bridges) | Free |
| **Proxy** | Low–Moderate | Fast | Easy | Low | Free–£ |
| **SSH Tunnel** | High | Moderate | Moderate | Low–Moderate | Free (with server) |
| **DNS Change** | Low | Very fast | Easy | Low | Free |
| **Encrypted DNS** | Moderate | Fast | Easy | Low | Free |
| **Bridge/PT** | Very high | Slow | Moderate | Very high | Free |
| **Snowflake** | Moderate | Moderate | Very easy | High | Free |

---

## Decision Flowchart

```
What are you trying to do?
│
├─ Browse a blocked website quickly?
│   ├─ Is it just DNS-blocked? → Change DNS ([[dns-filtering]])
│   └─ Is it IP-blocked? → Use a [[proxies|proxy]] or [[vpns|VPN]]
│
├─ Browse privately without your ISP seeing?
│   └─ Use a [[vpns|VPN]] (or [[tor|Tor]] if anonymity is critical)
│
├─ Need strong anonymity against surveillance?
│   └─ Use [[tor|Tor Browser]] with bridges
│
├─ Need one specific application routed through a different country?
│   └─ Use a [[proxies|SOCKS5 proxy]] or [[vpns|VPN]] with split tunnelling
│
└─ Want to help others bypass censorship?
    └─ Run a Tor [[tor|bridge]] or a Snowflake proxy
```

---

## Method Deep Dives

### VPNs — Best balance of speed and privacy

**Best for**: Daily use, streaming, general browsing, mobile use.
**Limitations**: You must trust the VPN provider; provider IPs can be blocked.
**Cost**: £3–£12/month for a reliable provider.
**Setup complexity**: Low (download client → connect).
**Learn more**: [[vpns|VPNs guide]]

### Tor — Strongest anonymity

**Best for**: High-risk situations, accessing .onion sites, whistleblowing.
**Limitations**: Slow, not suitable for streaming, exit node can eavesdrop on unencrypted traffic.
**Cost**: Free.
**Setup complexity**: Low (download Tor Browser → connect).
**Learn more**: [[tor|Tor guide]]

### Proxies — Lightweight IP masking

**Best for**: Quick unblocking of a single website, routing non-browser traffic.
**Limitations**: No encryption (unless HTTPS), application-specific, easily detected.
**Cost**: Free (public proxies) or £ (paid proxy services).
**Setup complexity**: Low–moderate.
**Learn more**: [[proxies|Proxies guide]]

### SSH Tunnels — Technical but reliable

Creates an encrypted tunnel through any server you have SSH access to. No special software needed beyond an SSH client.

| Use case | Command |
|---|---|
| SOCKS5 proxy via SSH | `ssh -D 1080 user@server` |
| Local port forwarding | `ssh -L 8080:localhost:80 user@server` |
| Remote port forwarding | `ssh -R 8080:localhost:80 user@server` |

**Best for**: Users who already have access to a remote server and want a quick encrypted tunnel.
**Limitations**: Not designed for general browsing; no built-in leak protection; manual setup per session.

### DNS Changes — Simplest bypass for DNS blocks

If a site is blocked only at the DNS level (common with ISP-level blocks), switching to a public DNS resolver is the fastest fix. See [[dns-filtering]] for setup instructions.

### Bridges and Pluggable Transports — For heavily censored environments

When Tor is actively blocked, bridges provide access through unlisted entry points. Pluggable transports disguise Tor traffic to evade deep packet inspection:

- **obfs4** — Scrambles traffic to look like random noise.
- **WebTunnel** — Makes Tor traffic look like regular HTTPS.
- **Snowflake** — A decentralised proxy system where volunteers donate bandwidth to help censored users connect. Extremely easy to set up (browser extension or Tor Browser built-in).
- **meek** — Uses a third-party service (e.g., Microsoft Azure, Amazon CloudFront) to relay traffic, making it look like CDN traffic.

### Combined Approaches

For maximum resilience, combine methods:

| Combination | Use Case |
|---|---|
| **Tor over VPN** | Hide Tor usage from ISP; harder to block |
| **VPN over Tor** | Not recommended (adds single point of failure) |
| **Proxy → VPN** | Add an extra hop before the VPN entry point |
| **Bridge → Tor** | Access Tor through an unlisted entry point |
| **Obfsproxy → Tor** | Disguise Tor traffic for DPI-heavy networks |

---

## Which Countries Block What

| Country | Common Methods | Recommended Bypass |
|---|---|---|
| **China** | Great Firewall: DPI, IP blocking, DNS poisoning, VPN protocol blocking | Tor with WebTunnel bridges; Shadowsocks (custom obfuscation protocol); WireGuard over obfuscation |
| **Iran** | DPI, social media blocking, VPN blocking | Tor with obfs4 bridges; Psiphon; custom VPN protocols |
| **Russia** | RKN blocking, DPI, VPN restriction laws | Tor with bridges; GoodbyeDPI (Windows); VPNs that explicitly support Russia |
| **Turkey** | Social media blocks, DNS filtering | DNS change + VPN; Tor Browser |
| **UAE** | VoIP blocking, VPN restrictions (legal) | VPN with obfuscation; careful about local laws |

---

## OpSec Tips for Bypassing Restrictions

1. **Use HTTPS everywhere** — Even with a VPN or Tor, unencrypted HTTP traffic can be intercepted or modified.
2. **Test for leaks** — Always verify your IP, DNS, and WebRTC are not leaking:
   - IP: `ifconfig.me`
   - DNS leak: `dnsleaktest.com`
   - WebRTC leak: `browserleaks.com/webrtc`
3. **Avoid logging into personal accounts** — Any account linked to your real identity breaks anonymity.
4. **Use separate browsers** — Keep one browser for personal use and one (with different fingerprint) for bypassing.
5. **Keep software updated** — Exploits in old VPN clients or Tor Browser versions can de-anonymise you.
6. **Know the law** — In some countries, using circumvention tools is itself illegal. Assess your threat model honestly.

---

## Related

- [[vpns|VPNs — Virtual Private Networks]]
- [[tor|Tor — The Onion Router]]
- [[proxies|Proxies — How They Compare]]
- [[dns-filtering|DNS Filtering]]
- [[open-letter-to-the-government|Open Letter to the Government]]
