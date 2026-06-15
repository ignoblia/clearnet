---
title: DNS Filtering
---

**DNS filtering** is a method of controlling which websites can be accessed on a network by blocking domain name resolution for undesirable sites. When a user tries to visit a blocked domain, the DNS resolver returns a non-routable address (e.g., `0.0.0.0`) or a block page instead of the real IP address.

This page explains what DNS filtering is, how it differs from other forms of restriction, and why it is referenced as a better alternative in the [[open-letter-to-the-government|Open Letter to the Government]].

---

## How DNS Works (Briefly)

Every time you visit a website, your device performs a **DNS lookup** to translate a human-readable domain name (e.g., `example.com`) into a machine-readable IP address (e.g., `93.184.216.34`). This is like looking up a phone number in a directory.

DNS filtering intercepts this lookup:

```
Normal:     Device → DNS Server → "93.184.216.34" → Website loads
Filtered:   Device → DNS Server → "0.0.0.0"       → Block page
```

Because DNS lookups happen **before** any connection is made to the website, blocking at the DNS level is efficient — the blocked content never reaches the device.

---

## Types of DNS Filtering

### ISP-Level Filtering

The UK's four largest ISPs (BT, Sky, TalkTalk, Virgin Media) offer opt-in parental controls that operate at the DNS level. When enabled, their DNS servers return blocked responses for domains categorised as adult content, violence, gambling, etc.

- **Default**: Off (opt-in required)
- **Coverage**: ~90% of UK residential broadband connections
- **Granularity**: Category-based toggles
- **Uptake**: ~35% of eligible households

### Public DNS Filtering Services

Several organisations operate DNS resolvers that filter content by category. These are free to use and require only changing your device or router's DNS settings:

| Provider | Primary DNS | Block Categories | Notes |
|---|---|---|---|
| **CleanBrowsing** | `185.228.168.9` | Adult content, security threats | Family filter; strict |
| **OpenDNS FamilyShield** | `208.67.222.123` | Adult content | Operated by Cisco |
| **Cloudflare 1.1.1.3** | `1.1.1.3` | Malware + adult content | Also blocks malware at `1.1.1.2` |
| **AdGuard DNS** | `94.140.14.15` | Adult content, ads, trackers | Family protection filter |

### Self-Hosted DNS Filtering

For granular control, you can run your own DNS filter using open-source software:

**Pi-hole** — A DNS-level ad and content blocker that runs on a Raspberry Pi or any Linux server. It maintains blocklists of known advertisement, tracker, and adult domains.

```
Your Devices → Pi-hole (DNS) → Upstream DNS → Internet
                    │
              Blocks known
              undesirable domains
```

Pi-hole provides a dashboard showing which devices are making which queries, and allows whitelisting and blacklisting individual domains.

---

## DNS Filtering vs. Other Restriction Methods

| Aspect | DNS Filtering | Platform Age Verification | ISP Deep Packet Inspection |
|---|---|---|---|
| **Privacy impact** | Minimal — DNS queries only | High — identity documents, biometrics | High — inspects packet contents |
| **Circumvention difficulty** | Low — change DNS server or use VPN | Moderate — VPN or obfuscation | Moderate — VPN or encryption |
| **Granularity** | Domain-level only | Content-level | Protocol + content-level |
| **User awareness** | Transparent — block page shown | Explicit — must verify age | Invisible — may not know |
| **Chilling effect** | Low — easily understood and configurable | High — discourages legitimate access | Medium — invasive by nature |
| **False positives** | Moderate (whole-domain blocking) | High (biometric errors) | Low |
| **Operational cost** | Very low | Very high | High |

---

## Using DNS Filtering as a Bypass Tool

DNS filtering is usually deployed as a **restriction** measure, but it can also be used to **bypass** certain types of blocks:

### Bypassing ISP-Level DNS Blocks

If your ISP is blocking access to a site at the DNS level, you can bypass it simply by changing your DNS resolver:

**On Windows**:
```
Settings → Network & Internet → Change adapter options
→ Right-click your connection → Properties
→ Internet Protocol Version 4 (TCP/IPv4) → Properties
→ Use the following DNS server addresses:
   Preferred: 1.1.1.1
   Alternate: 8.8.8.8
```

**On macOS**:
```
System Settings → Network → Select your connection → DNS
→ Add: 1.1.1.1
→ Add: 8.8.8.8
```

**On a router**: Change the DNS settings in the router admin panel so all devices on the network benefit.

### Using Encrypted DNS (DoH / DoT)

Standard DNS queries are unencrypted, meaning your ISP can see which domains you are querying. **DNS over HTTPS (DoH)** and **DNS over TLS (DoT)** encrypt the lookup, preventing your ISP from seeing or tampering with your DNS requests:

| Protocol | Port | How it works |
|---|---|---|
| **DNS over HTTPS (DoH)** | 443 | DNS queries sent inside HTTPS traffic (looks like regular web traffic) |
| **DNS over TLS (DoT)** | 853 | DNS queries sent over a TLS-encrypted connection |

Most major DNS providers support both:
- **Cloudflare**: `https://cloudflare-dns.com/dns-query` (DoH), `1.1.1.1` (DoT)
- **Quad9**: `https://dns.quad9.net/dns-query` (DoH), `9.9.9.9` (DoT)
- **Google**: `https://dns.google/dns-query` (DoH), `8.8.8.8` (DoT)

---

## Why DNS Filtering Is a Better Alternative for Child Safety

As argued in the [[open-letter-to-the-government|Open Letter to the Government]], DNS filtering offers a superior approach to protecting children online compared to blanket platform bans or age verification mandates:

1. **Opt-in** — Families choose to enable it, rather than having access restrictions imposed on everyone.
2. **Privacy-preserving** — No identity documents, biometric data, or personal information required.
3. **Transparent** — Parents and children can see what was blocked and discuss why.
4. **Configurable** — Different families have different values; DNS filtering respects that diversity.
5. **Cost-effective** — Public DNS services are free; ISP-level filtering is already deployed.
6. **Targeted** — Blocks specific categories of content rather than entire platforms.

---

## Limitations of DNS Filtering

- **Domain-level only** — DNS filtering cannot block specific pages or content within a domain; it blocks (or allows) the entire domain.
- **Trivially bypassed** — Any user who can change their DNS settings (or use a VPN) can circumvent DNS filtering. This is a feature, not a bug — it means consenting adults are not restricted.
- **Not encrypted by default** — Standard DNS is plaintext. Encrypted DNS (DoH/DoT) should be used to prevent tampering.
- **No content classification is perfect** — Blocklists have false positives (blocking legitimate content) and false negatives (missing harmful content).

---

## Related

- [[open-letter-to-the-government|Open Letter to the Government]]
- [[vpns|VPNs — Virtual Private Networks]]
- [[bypass-methods|Overview of Bypass Methods]]
