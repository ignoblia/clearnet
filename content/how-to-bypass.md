---
title: "Lesson 1: Get Unblocked Now"
---

<div class="lesson-banner">
  <span class="lesson-banner-label">LESSON 1 OF 6</span>
  <span class="lesson-banner-time">⏱ 2 minutes</span>
</div>

# Get Unblocked Now

This is the **quickstart**. If you just need to get past a block **right now**, pick the method that matches your situation and follow the steps. No theory — just what to do.

---

## The Easiest Way: Change Your DNS

**Works against**: ISP-level blocks (the most common kind in the UK).
**Time**: 2 minutes.
**Skill level**: None.

If a site is blocked and you haven't tried this yet, start here. Most ISP blocks work by refusing to look up the website's address. Use a different lookup service.

### Windows

1. Open **Settings** → **Network & Internet**.
2. Click **Change adapter options**.
3. Right-click your connection (Wi-Fi or Ethernet) → **Properties**.
4. Select **Internet Protocol Version 4 (TCP/IPv4)** → **Properties**.
5. Select **Use the following DNS server addresses**.
6. Enter:
   - Preferred: `1.1.1.1`
   - Alternate: `8.8.8.8`
7. Click **OK** → **Close**.
8. Done. Try the site again.

### macOS

1. **System Settings** → **Network**.
2. Select your connection → **Details**.
3. Click **DNS** → tap the **+** button.
4. Add `1.1.1.1` and `8.8.8.8`.
5. Click **OK**.
6. Done.

### Android

1. **Settings** → **Wi-Fi** → tap your connected network.
2. Tap **Modify network** → expand **Advanced options**.
3. Change **IP settings** to **Static**.
4. Set **DNS 1** to `1.1.1.1` and **DNS 2** to `8.8.8.8`.
5. Save. Reconnect to the network.

### iPhone / iPad

1. **Settings** → **Wi-Fi** → tap the ⓘ next to your network.
2. Scroll down to **Configure DNS** → switch to **Manual**.
3. Remove any existing servers, tap **Add Server**.
4. Add `1.1.1.1` and `8.8.8.8`.
5. Tap **Save**.

### Router (covers every device in your house)

1. Open your router admin page (usually `192.168.0.1` or `192.168.1.1` — check the sticker on the router).
2. Log in (admin credentials are usually on the sticker too).
3. Find **DNS Settings** (often under Internet/WAN or Advanced Settings).
4. Change from "Obtain automatically" to **Use the following DNS**.
5. Enter `1.1.1.1` and `8.8.8.8`.
6. Save and reboot the router.

---

## Still Blocked? Use a VPN

**Works against**: Most other blocks (IP blocking, deep packet inspection).
**Time**: 10 minutes.
**Skill level**: Low.

A VPN encrypts everything and routes it through a server in a different location. Your ISP sees only encrypted gibberish going to the VPN server — nothing else.

### Step-by-Step

1. **Pick a provider** (see [[vpns|Lesson 3: VPN guide]] for details on choosing). For beginners:
   - **Mullvad** — £5/month, no personal details needed, accepts cash.
   - **ProtonVPN** — Free tier available (limited speed, no logs).
   - **IVPN** — £6/month, audited no-log policy.

2. **Download the app** from the provider's official website (not an app store, if possible — app store versions can be censored).

3. **Install and open it**. Sign up if needed.

4. **Select a server** in a country where the content isn't blocked (usually any country outside your own).

5. **Click Connect**.

6. **Verify** — visit `ifconfig.me` in a browser. You should see an IP address that is not your own. Visit the blocked site — it should now load.

### Enable the Kill Switch

Before doing anything sensitive, make sure the **kill switch** is on. This prevents your real IP from leaking if the VPN disconnects unexpectedly. It's usually in the settings/privacy section of the VPN app.

### If the VPN Doesn't Connect

Some networks actively block VPNs. Look for **obfuscation** or **stealth** settings in your VPN app and enable them. This makes VPN traffic look like regular web traffic.

---

## Free Option That Works: Tor Browser

**Works against**: Almost everything, including VPN blocks.
**Time**: 5 minutes.
**Skill level**: Low.
**Cost**: Free.

Tor Browser is a modified Firefox that routes your traffic through three anonymous relays. It's slower than a VPN but does not require payment or trusting a provider.

### Step-by-Step

1. **Download Tor Browser** from [torproject.org](https://www.torproject.org).
   - If the site is blocked, use a mirror or get it via email from `gettor@torproject.org`.

2. **Install it** (portable — no admin rights needed on Windows).

3. **Open it**. Click **Connect**.

4. Wait for the connection to establish (20–60 seconds).

5. Browse normally. The blocked site should now load.

### If Tor Is Blocked Too

1. On the connection screen, click **Configure**.
2. Select **Use a bridge**.
3. Choose **Request a bridge from torproject.org**.
4. Follow the prompts, or click **Select a built-in bridge** → choose **obfs4**.
5. Connect again.

### Tips

- Do not resize the Tor Browser window. Keep it at default size — this prevents fingerprinting.
- Do not install extra add-ons.
- Do not log into your real accounts (Facebook, email, etc.) — this links your anonymous activity to your identity.

---

## One-Liners for the Command Line

**Works against**: DNS blocks, some IP blocks.
**Time**: 30 seconds.
**Skill level**: Moderate.
**Requires**: Access to a server outside your country (any cheap VPS).

If you have SSH access to a server in another country, this creates a SOCKS5 proxy tunnel:

```bash
ssh -D 1080 -N -f user@your-server.com
```

Then configure your browser to use **SOCKS5 proxy** at `127.0.0.1:1080`. All browser traffic will be forwarded through your server, encrypted. See [[proxies|Lesson 5: Proxies guide]] for details.

---

## What NOT to Do

| Don't Do This | Why |
|---|---|
| Use a free "VPN" from the app store | Most log your traffic, inject ads, or sell your bandwidth. Some are run by state actors. |
| Post about bypassing on social media with your real account | You are linking your real identity to the activity. Make a separate anonymous account. |
| Ignore HTTPS warnings | If your browser says a connection is not secure, someone may be intercepting your traffic. |
| Forget to test for leaks | Always check `dnsleaktest.com` and `ipleak.net` after setting up a VPN or proxy. |
| Use the same browser for personal and bypassed browsing | Cookies and fingerprinting can link both activities. Use Tor Browser for bypassing, or a separate browser profile. |

---

## Quick Reference

| Situation | Do This | Time |
|---|---|---|
| A specific website is blocked | Change DNS to `1.1.1.1` | 2 min |
| Multiple sites blocked / ISP blocking | Install a VPN | 10 min |
| VPN is also blocked | Enable obfuscation in VPN settings | 2 min |
| Need free option now | Download Tor Browser | 5 min |
| Tor is also blocked | Use bridges (obfs4) | 5 min |
| Everything blocked (authoritarian firewall) | Tor + WebTunnel bridges, or Snowflake | 10 min |
| Just need to check one thing quickly | Try a text-mode proxy | 1 min |

---

<div class="lesson-nav">
  <a href="index" class="lesson-nav-prev">← Back to Home</a>
  <a href="dns-filtering" class="lesson-nav-next">Next Lesson: Change Your DNS →</a>
</div>
