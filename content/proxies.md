---
title: "Lesson 5: Try Proxies"
---

<div class="lesson-banner">
  <span class="lesson-banner-label">LESSON 5 OF 6</span>
  <span class="lesson-banner-time">⏱ 5 minutes</span>
</div>

# Try Proxies

A **proxy server** acts as an intermediary between your device and the internet. When you use a proxy, your traffic is sent to the proxy server first, which then forwards it to the destination on your behalf. The destination sees the proxy's IP address rather than your own.

Proxies are simpler and lighter than VPNs, but offer less comprehensive protection. Understanding the differences is essential for choosing the right tool for a given situation.

---

## How a Proxy Works

```
Your Device → Proxy Server → Internet
                    │
          Destination sees
          proxy server's IP
```

Unlike a VPN, a standard proxy does **not** encrypt your traffic by default. It simply changes the source IP address. The connection between you and the proxy is unencrypted unless you are using HTTPS — in which case the HTTPS encryption protects the content, but the proxy still sees which domains you are connecting to.

---

## Types of Proxies

### HTTP Proxy

The most basic type. Designed for web traffic only. The proxy understands HTTP (and HTTPS) requests and forwards them.

| Pros | Cons |
|---|---|
| Simple to set up | Only works for web traffic |
| Widely supported | No native encryption |
| Fast | Can inject or modify content |

**Use case**: Bypassing a simple website block where encryption is not needed.

### HTTPS / CONNECT Proxy
Same as an HTTP proxy but supports tunnelling HTTPS connections. Your browser connects to the proxy and sends a `CONNECT` request, establishing a tunnel through which encrypted HTTPS traffic flows.

| Pros | Cons |
|---|---|
| Supports encrypted traffic | Only HTTP/HTTPS |
| Widely supported in browsers | Proxy can see domain names (SNI) |

**Use case**: Bypassing website-level blocks while maintaining HTTPS security.

### SOCKS5 Proxy
A lower-level proxy that operates at the transport layer. It can handle any kind of traffic — HTTP, HTTPS, email, BitTorrent, SSH — not just web traffic. Unlike HTTP proxies, SOCKS5 does not interpret the traffic; it simply forwards packets.

| Pros | Cons |
|---|---|
| Handles any protocol | No built-in encryption |
| Can support UDP | Can be slower than HTTP proxies |
| Supports authentication | Not natively proxied in browsers (needs extension) |

**Use case**: Applications that need non-HTTP traffic routed through a proxy (e.g., IRC clients, torrenting).

### Transparent Proxy
A proxy that intercepts traffic without any client configuration. Often deployed by organisations, ISPs, or governments to monitor or filter traffic. The user may not even know it exists.

**Use case**: Not used for bypassing — this is what you are trying to bypass.

### Reverse Proxy
Sits in front of web servers to cache, load-balance, or hide server IPs. Used by website operators, not by end users.

**Use case**: Not relevant for bypassing restrictions, but the technology is related.

---

## Proxy vs VPN

| Feature | Proxy | VPN |
|---|---|---|
| **Encryption** | No (unless HTTPS tunnel) | Yes (full tunnel encryption) |
| **Scope** | Per-application (typically browser) | Whole device (all traffic) |
| **Speed** | Fast (no encryption overhead) | Moderate (encryption adds overhead) |
| **Protocol support** | Limited (HTTP/HTTPS/SOCKS) | All protocols |
| **Kill switch** | No | Yes (in good clients) |
| **Leak protection** | Minimal | DNS + IPv6 leak protection |
| **Set-up complexity** | Simple | Moderate |
| **Blocking resistance** | Low (easy to detect) | Moderate (obfuscatable) |

**Bottom line**: Use a proxy when you only need to change your IP for a single application and speed is a priority. Use a VPN when you need comprehensive protection.

---

## Setting Up a Proxy

### In a Browser

**Firefox**:
```
Settings → Network Settings → Manual proxy configuration
→ Enter HTTP/HTTPS proxy address and port
```

**Chrome / Edge**:
Use system proxy settings:
```
Settings → System → Open your computer's proxy settings
```

Or use a browser extension that manages proxy switching.

### Using SOCKS5 with SSH

You can create a SOCKS5 proxy tunnel using only SSH access to a remote server:

```bash
ssh -D 1080 user@your-server.com
```

This opens a SOCKS5 proxy on `localhost:1080`. Configure your browser or application to use `127.0.0.1:1080` with SOCKS5 protocol. The traffic will be forwarded through the SSH connection, which **is** encrypted — this is effectively a lightweight VPN alternative.

Add `-N` to run the tunnel without opening a shell, and `-f` to run in the background:

```bash
ssh -D 1080 -N -f user@your-server.com
```

### Proxy Chains

**ProxyChains** is a tool for Linux/macOS that forces any application's TCP traffic through a chain of proxies. This makes tracing more difficult:

```bash
proxychains4 curl https://example.com
```

Configure `/etc/proxychains4.conf` with a list of proxy servers. A common setup chains SOCKS5 proxies in sequence (e.g., Proxy1 → Proxy2 → Destination).

**Warning**: ProxyChains does not work with all applications. It hooks `connect()` syscalls, so applications that use UDP or custom transport mechanisms may leak traffic.

---

## Detecting Whether a Proxy Is Working

| Test | Tool |
|---|---|
| Check visible IP | Visit `ifconfig.me` |
| Check for proxy headers | Visit `whatismyip.com/proxy-check` |
| WebRTC leak test | Visit `browserleaks.com/webrtc` |
| DNS leak test | Visit `dnsleaktest.com` |

---

## Limitations

- **No encryption** — A standard proxy does not protect your traffic from interception. Always use HTTPS websites when behind a proxy.
- **Application support** — Many applications do not support proxy configuration natively and will bypass the proxy entirely.
- **Logging** — Free proxies commonly log traffic and sell data. Assume any free proxy is compromised.
- **Detection** — HTTP headers like `X-Forwarded-For` and `Via` can reveal that a proxy is being used. Some websites block known proxy IP ranges.
- **Not anonymous** — Proxies alone do not provide anonymity. Your activities can still be correlated through cookies, browser fingerprinting, and login sessions.

---

<div class="lesson-nav">
  <a href="tor" class="lesson-nav-prev">← Previous: Browse with Tor</a>
  <a href="bypass-methods" class="lesson-nav-next">Next Lesson: Pick the Right Tool →</a>
</div>
