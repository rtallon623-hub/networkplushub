import { useState, useCallback, useRef } from "react";

// ─────────────────────────────────────────────
// MESSER VIDEO LINKS
// ─────────────────────────────────────────────
const MESSER = {
  osi:        "https://www.professormesser.com/network-plus/n10-009/n10-009-video/understanding-the-osi-model-n10-009/",
  devices:    "https://www.professormesser.com/network-plus/n10-009/n10-009-video/networking-devices-n10-009/",
  protocols:  "https://www.professormesser.com/network-plus/n10-009/n10-009-video/introduction-to-ip-n10-009/",
  cloud:      "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/",
  ipv4:       "https://www.professormesser.com/network-plus/n10-009/n10-009-video/calculating-ipv4-subnets-and-hosts-n10-009/",
  magic:      "https://www.professormesser.com/network-plus/n10-009/n10-009-video/magic-number-subnetting-n10-009/",
  seven:      "https://www.professormesser.com/network-plus/n10-009/n10-009-video/seven-second-subnetting-n10-009/",
  vlans:      "https://www.professormesser.com/network-plus/n10-009/n10-009-video/vlans-and-trunking-n10-009/",
  routing:    "https://www.professormesser.com/network-plus/n10-009/n10-009-video/routing-technologies-n10-009/",
  method:     "https://www.professormesser.com/network-plus/n10-009/n10-009-video/network-troubleshooting-methodology-n10-009/",
  ipissues:   "https://www.professormesser.com/network-plus/n10-009/n10-009-video/routing-and-ip-issues-n10-009/",
  index:      "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/",
};

const MESSER_PLAYLIST = "PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8";
const MESSER_VIDEO_IDS = {
  osi: "AYgXr1dynKU",
  tcp: "ueth6WvFVMU",
  ports: "ueth6WvFVMU",
  devices: "iqjj4ZSPV08",
  ipv4: "cYQOMifDlKI",
  cloud: "wI2x6eGF1Yg",
  vlans: "ATbzbST_OIw",
  routing: "hU9bbmFhKxk",
  wireless: "NeTwL-040ds",
  method: "dovuPm3dGhc",
};

const getMesserEmbed = (lessonId) => {
  const videoId = MESSER_VIDEO_IDS[lessonId];
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?list=${MESSER_PLAYLIST}`
    : `https://www.youtube.com/embed/videoseries?list=${MESSER_PLAYLIST}`;
};

// ─────────────────────────────────────────────
// MEDALS
// ─────────────────────────────────────────────
const MEDALS = [
  // ── Milestone medals ────────────────────────
  { id:"first_lesson", tier:"bronze", icon:"🎯", name:"First Step", desc:"Complete your first lesson", category:"Milestone" },
  { id:"week1_done",   tier:"bronze", icon:"🏗️", name:"Foundations", desc:"Complete all of Week 1", category:"Milestone" },
  { id:"halfway",      tier:"silver", icon:"🏁", name:"Halfway There", desc:"Complete 4 full weeks", category:"Milestone" },
  { id:"all_done",     tier:"gold",   icon:"🎓", name:"Network+", desc:"Complete all 8 weeks", category:"Milestone" },
  // ── Flashcard medals ────────────────────────
  { id:"flashcard_50", tier:"bronze", icon:"🃏", name:"Card Shark", desc:"Review 50 flashcards", category:"Flashcards" },
  { id:"flashcard_100",tier:"silver", icon:"🂡", name:"Card Master", desc:"Review 100 flashcards", category:"Flashcards" },
  // ── Quiz medals ─────────────────────────────
  { id:"quiz_perfect", tier:"gold", icon:"💎", name:"Perfect Score", desc:"Score 100% on any quiz", category:"Quiz" },
  { id:"speed_demon",  tier:"silver", icon:"💨", name:"Speed Demon", desc:"Complete a quiz in under 3 minutes", category:"Quiz" },
  // ── Lab medals ──────────────────────────────
  { id:"subnet_master",tier:"gold", icon:"🧮", name:"Subnet Master", desc:"Solve 10 subnet problems", category:"Lab" },
];

// Alias for backward compatibility
const BADGES = MEDALS;

// ─────────────────────────────────────────────
// COURSE DATA
// ─────────────────────────────────────────────
const WEEKS = [
  {
    week:1, title:"Networking Concepts — Foundations", domain:"Domain 1A", color:"#00d4ff", xpReward:600,
    lessons:[
      {
        id:"osi", title:"The OSI Model", duration:"25 min",
        messerUrl: MESSER.osi, messerTitle:"Understanding the OSI Model – N10-009 1.1",
        content:`## The OSI Model — 7 Layers You Must Know Cold

The OSI model describes how data moves through a network in 7 layers. Every device, protocol, and troubleshooting scenario maps to one of these layers.

### The 7 Layers

| # | Layer | PDU | Key Devices / Protocols | Real Job |
|---|-------|-----|------------------------|---------|
| 7 | **Application** | Data | HTTP, FTP, DNS, SMTP, POP3, IMAP | User-facing services |
| 6 | **Presentation** | Data | SSL/TLS, JPEG, ASCII | Format, encrypt, compress |
| 5 | **Session** | Data | NetBIOS, RPC, SIP | Start / manage / end sessions |
| 4 | **Transport** | Segment | TCP, UDP | End-to-end delivery, ports |
| 3 | **Network** | Packet | IP, ICMP, ARP, Routers | Logical addressing, routing |
| 2 | **Data Link** | Frame | Ethernet, Switches | Physical addressing, frames |
| 1 | **Physical** | Bit | Cables, Hubs, NICs | Bits over wire / fiber / wireless |

### Memory Tricks
- Bottom → Top: **"Please Do Not Throw Sausage Pizza Away"**
- Top → Bottom: **"All People Seem To Need Data Processing"**

### Encapsulation — How Data Travels Down
When you send data, each layer wraps it:
1. App layer creates the data
2. Presentation encrypts (TLS)
3. Session opens a channel
4. Transport adds TCP segment (ports)
5. Network adds IP packet (addresses)
6. Data Link adds Ethernet frame (MACs)
7. Physical converts to bits on the wire

The receiver de-encapsulates in reverse — strips each wrapper going up.

### Layer-to-Device Mapping

| Device | OSI Layer | Why |
|--------|-----------|-----|
| Hub / repeater | Layer 1 | Repeats electrical signals only |
| Switch | Layer 2 | Uses MAC addresses to forward |
| Router | Layer 3 | Uses IP addresses to route |
| Wireless AP | Layer 2 | Bridges 802.11 ↔ 802.3 |
| Firewall | Layer 3–7 | Depends on type |
| Load balancer | Layer 4–7 | Inspects ports and content |
| Proxy | Layer 7 | Full application-layer awareness |

### Common Exam Traps
- "Switch operates at?" → **Layer 2** (unless Layer 3 switch)
- "TLS operates at?" → **Layer 6** (Presentation)
- "Adds port numbers?" → **Layer 4** (Transport)
- "ARP operates at?" → **Layer 3** (Network)

### OSI Troubleshooting — Bottom-Up Method
1. Layer 1: Cable plugged in? Link light on?
2. Layer 2: Correct VLAN? MAC address visible?
3. Layer 3: Valid IP? Can ping gateway?
4. Layer 4: Correct port open?
5. Layers 5–7: Application responding?`,
        practiceQuestions: [
          {
            q: "A user has a valid IP address and can ping the default gateway, but cannot connect to a web server. At which OSI layer should troubleshooting focus?",
            options: ["Layer 1 — Physical", "Layer 2 — Data Link", "Layer 3 — Network", "Layer 4 — Transport or above"],
            answer: 3,
            explanation: "Valid IP and successful gateway ping confirm Layers 1–3 are working. The failure to reach a web server points to Layer 4 (port blocked by firewall) or higher (application/service issue). Work bottom-up — eliminate lower layers first."
          },
          {
            q: "Which OSI layer is responsible for data encryption and format conversion such as TLS?",
            options: ["Layer 5 — Session", "Layer 6 — Presentation", "Layer 7 — Application", "Layer 4 — Transport"],
            answer: 1,
            explanation: "Layer 6 (Presentation) handles formatting, encryption, and compression. SSL/TLS lives here. Layer 7 is the user-facing application service layer — it uses Layer 6 for encryption but doesn't perform it."
          },
          {
            q: "At which OSI layer are source and destination MAC addresses added to a frame?",
            options: ["Layer 1 — Physical", "Layer 3 — Network", "Layer 2 — Data Link", "Layer 4 — Transport"],
            answer: 2,
            explanation: "MAC addresses are a Layer 2 (Data Link) concept. The PDU at L2 is a frame. IP addresses are added at Layer 3 (packet), and port numbers at Layer 4 (segment)."
          },
          {
            q: "What is the correct PDU name for data at OSI Layer 4?",
            options: ["Bit", "Frame", "Packet", "Segment"],
            answer: 3,
            explanation: "PDUs by layer: Layer 1 = Bit, Layer 2 = Frame, Layer 3 = Packet, Layer 4 = Segment (TCP) or Datagram (UDP). This is directly tested — memorize all four."
          },
          {
            q: "A next-generation firewall identifies and blocks a specific application regardless of which port it uses. At which OSI layer does this capability operate?",
            options: ["Layer 3 — Network", "Layer 4 — Transport", "Layer 6 — Presentation", "Layer 7 — Application"],
            answer: 3,
            explanation: "Application identification requires deep packet inspection at Layer 7. Traditional packet-filter firewalls only inspect L3–4 (IP and ports). NGFWs extend all the way to Layer 7, reading actual application content to identify traffic regardless of port."
          }
        ]
      },
      {
        id:"tcp", title:"TCP, UDP & Transport Layer", duration:"20 min",
        messerUrl: MESSER.protocols, messerTitle:"Introduction to IP – N10-009 1.4",
        content:`## TCP vs UDP — The Most Tested Transport Comparison

### TCP — Transmission Control Protocol
TCP is **connection-oriented**. Uses a 3-way handshake before any data flows.

**3-Way Handshake:**
1. **SYN** — Client: "I want to talk"
2. **SYN-ACK** — Server: "OK, here's my sequence number"
3. **ACK** — Client: "Got it. Let's go."

**TCP Features:**
- Sequencing — numbers every segment so they reassemble in order
- Acknowledgment — receiver ACKs every segment
- Retransmission — resends if no ACK received
- Flow control — sliding window limits how much is in-flight
- Congestion control — backs off when network is stressed

### UDP — User Datagram Protocol
UDP is **connectionless** — no handshake, no ACKs, no guarantee. Fire and forget.

**Why use UDP if it's unreliable?**
- Speed — no handshake or retransmission overhead
- Real-time — dropped packets better than delayed ones (video call)
- Broadcast support — DHCP, DNS queries

### Side-by-Side Comparison

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | Best-effort |
| Order | Sequenced | Not guaranteed |
| Speed | Slower (overhead) | Faster |
| Header size | 20 bytes min | 8 bytes |
| Flow control | Yes | No |
| Use cases | HTTP, SSH, FTP, email | DNS, DHCP, VoIP, streaming |

### ICMP — Internet Control Message Protocol
ICMP is at Layer 3. Used for **diagnostics only** — NOT data transfer.
- **ping** sends ICMP Echo Request → expects Echo Reply
- **tracert/traceroute** uses TTL-exceeded messages to map hops
- TTL (Time to Live): every router decrements by 1. At 0 → drops and sends ICMP error back

### TCP/IP Model vs OSI

| TCP/IP Layer | OSI Layers | Protocols |
|-------------|-----------|-----------|
| Application | 5, 6, 7 | HTTP, FTP, DNS, SMTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, ARP |
| Network Access | 1, 2 | Ethernet, Wi-Fi |`,
        practiceQuestions: [
          {
            q: "A VoIP application has choppy audio but calls connect successfully. Which transport layer characteristic is MOST likely the cause?",
            options: ["TCP retransmission delays adding variable latency", "UDP packet loss with no retransmission mechanism", "TCP three-way handshake overhead per call", "UDP connection table exhaustion on the router"],
            answer: 1,
            explanation: "VoIP uses UDP. When packets are lost there is no retransmission — those audio samples are simply gone, causing choppy audio. This is intentional design: a late retransmitted packet arriving out of sync would be more disruptive than brief silence."
          },
          {
            q: "How many total packets are exchanged in a normal TCP connection teardown?",
            options: ["2 — one FIN and one ACK", "3 — same count as the 3-way handshake", "4 — FIN, ACK, FIN, ACK", "1 — a single RST terminates immediately"],
            answer: 2,
            explanation: "TCP uses a 4-way FIN handshake to close gracefully: the initiating side sends FIN, the other ACKs it, then sends its own FIN, and gets a final ACK. Each side must independently signal it is done sending."
          },
          {
            q: "A router receives a packet and decrements the TTL field to 0. What does it do?",
            options: ["Forwards the packet to the default gateway", "Drops the packet and sends ICMP Type 11 (TTL Exceeded) back to the source", "Returns the packet to the sender unchanged", "Stores the packet and waits for a route refresh"],
            answer: 1,
            explanation: "TTL (Time to Live) prevents packets from looping forever. When TTL hits 0 the router drops the packet and sends ICMP Type 11 back to the source. traceroute deliberately exploits this by sending packets with incrementing TTL values to map each hop."
          },
          {
            q: "Which set of protocols uses UDP as its transport?",
            options: ["HTTP, SSH, FTP", "DNS, DHCP, SNMP, VoIP", "SMTP, IMAP, POP3", "RDP, SMB, LDAP"],
            answer: 1,
            explanation: "DNS, DHCP, SNMP, and VoIP all use UDP. DNS and SNMP are simple request/response where TCP overhead is unnecessary. DHCP relies on broadcast which requires UDP. VoIP is real-time and prioritizes low latency over guaranteed delivery. All others listed use TCP."
          },
          {
            q: "What is the minimum size of a TCP header?",
            options: ["8 bytes", "20 bytes", "32 bytes", "64 bytes"],
            answer: 1,
            explanation: "TCP minimum header = 20 bytes. UDP header = 8 bytes (fixed). TCP's larger header carries sequence numbers, acknowledgment numbers, window size, flags, and checksum — all required for its reliability and flow control features."
          }
        ]
      },
      {
        id:"ports", title:"Ports & Protocols — Complete Reference", duration:"30 min",
        messerUrl: MESSER.protocols, messerTitle:"Introduction to IP – N10-009 1.4",
        content:`## Ports & Protocols — Memorize Every One

A port identifies which **application** a packet is for. IP = street address, port = apartment number.

- Well-known: 0–1023
- Registered: 1024–49151
- Ephemeral (dynamic): 49152–65535

### The Complete Exam Port List

| Port | Protocol | Transport | Notes |
|------|----------|-----------|-------|
| 20 | FTP Data | TCP | Active mode data transfer |
| 21 | FTP Control | TCP | Commands and control |
| 22 | SSH / SCP / SFTP | TCP | Encrypted remote access |
| 23 | Telnet | TCP | Unencrypted — never use |
| 25 | SMTP | TCP | Sending email between servers |
| 49 | TACACS+ | TCP | Device administration AAA |
| 53 | DNS | UDP/TCP | UDP queries; TCP zone transfers |
| 67 | DHCP Server | UDP | Server offers to client |
| 68 | DHCP Client | UDP | Client requests from server |
| 69 | TFTP | UDP | No auth, used for PXE boot |
| 80 | HTTP | TCP | Unencrypted web |
| 88 | Kerberos | TCP/UDP | AD authentication tickets |
| 110 | POP3 | TCP | Retrieve email — downloads to client |
| 123 | NTP | UDP | Clock synchronization |
| 143 | IMAP | TCP | Retrieve email — stays on server |
| 161 | SNMP | UDP | Manager polls devices |
| 162 | SNMP Trap | UDP | Device-initiated alerts |
| 389 | LDAP | TCP/UDP | Directory services queries |
| 443 | HTTPS | TCP | Encrypted web (TLS) |
| 445 | SMB | TCP | Windows file and printer sharing |
| 514 | Syslog | UDP | Centralized log forwarding |
| 636 | LDAPS | TCP | Encrypted LDAP |
| 993 | IMAPS | TCP | Encrypted IMAP |
| 995 | POP3S | TCP | Encrypted POP3 |
| 1812 | RADIUS Auth | UDP | Network access authentication |
| 1813 | RADIUS Acct | UDP | Network access accounting |
| 3389 | RDP | TCP | Remote Desktop Protocol |
| 5060 | SIP | TCP/UDP | VoIP signaling |

### Key Comparison Groups

**Encrypted vs Unencrypted:**
- Telnet (23) → SSH (22)
- HTTP (80) → HTTPS (443)
- LDAP (389) → LDAPS (636)
- IMAP (143) → IMAPS (993)
- POP3 (110) → POP3S (995)

**Email protocols:**
- SMTP (25) = **sending** mail
- POP3 (110) = **receiving**, downloads and deletes from server
- IMAP (143) = **receiving**, stays on server, syncs across devices

**Exam Tip ⚡**
DNS = UDP for queries. TCP for zone transfers (>512 bytes).
SNMP 161 = polling. SNMP 162 = traps (device tells manager).
NTP (123) keeps clocks in sync — required for Kerberos/certificates.`,
        practiceQuestions: [
          {
            q: "A security admin requires encrypted email retrieval that keeps messages on the server and syncs across all user devices. Which protocol and port should be enforced?",
            options: ["POP3 on port 110", "SMTP on port 587", "IMAPS on port 993", "POP3S on port 995"],
            answer: 2,
            explanation: "IMAPS (IMAP over TLS) on port 993 satisfies all three requirements: encrypted (TLS), server-side storage (messages stay on server), and multi-device sync. POP3/POP3S downloads and deletes messages — no sync. SMTP is for sending, not receiving."
          },
          {
            q: "In which scenario does DNS switch from UDP to TCP on port 53?",
            options: ["When resolving AAAA (IPv6) records", "When performing a zone transfer between DNS servers", "When the client is running Windows", "When the DNS server is behind a NAT device"],
            answer: 1,
            explanation: "DNS zone transfers (full replication between DNS servers) always use TCP port 53 because the data exceeds the 512-byte UDP limit. DNS also falls back to TCP when a UDP response would be truncated. Record type and client OS do not determine the transport."
          },
          {
            q: "An admin needs to authenticate switch and router CLI access centrally and log every command entered. Which AAA protocol is the best fit?",
            options: ["RADIUS on port 1812 — encrypts the full session", "TACACS+ on port 49 — separates AAA and encrypts the entire payload", "Kerberos on port 88 — provides ticket-based authentication", "LDAP on port 389 — provides directory-based lookups"],
            answer: 1,
            explanation: "TACACS+ (port 49, TCP) is designed for device administration. It separates authentication, authorization, and accounting into distinct exchanges, encrypts the entire payload (not just the password), and enables granular per-command authorization. RADIUS is better suited for network access (Wi-Fi, VPN)."
          },
          {
            q: "What is the functional difference between SNMP port 161 and SNMP port 162?",
            options: ["161 is for SNMPv2; 162 is for SNMPv3", "161 is used when the manager polls a device; 162 is used when a device sends an unsolicited trap to the manager", "161 is for read operations; 162 is for write operations", "161 uses UDP; 162 uses TCP"],
            answer: 1,
            explanation: "Port 161: manager-initiated polling (GET requests to agent). Port 162: agent-initiated traps (device sends unsolicited alert to manager). Both use UDP. Version and read/write are determined by credentials, not port number."
          },
          {
            q: "Company policy requires all remote management of network devices to be encrypted. Telnet is currently in use. What is the correct remediation?",
            options: ["Reconfigure Telnet to use port 22 instead of port 23", "Enable SSH on port 22 and disable Telnet on port 23", "Enable HTTPS on port 443 as the management interface", "Replace Telnet with RDP on port 3389"],
            answer: 1,
            explanation: "SSH (port 22) provides encrypted remote terminal access and is the direct secure replacement for Telnet (port 23). Changing Telnet's port number adds no encryption whatsoever. HTTPS and RDP serve different purposes and are not CLI management protocols."
          }
        ]
      },
      {
        id:"devices", title:"Network Devices & VPN Types", duration:"20 min",
        messerUrl: MESSER.devices, messerTitle:"Networking Devices – N10-009 1.2",
        content:`## Network Devices — Know Every One

### Core Forwarding Devices

| Device | OSI Layer | Function |
|--------|-----------|---------|
| Hub | Layer 1 | Broadcasts all traffic to all ports — creates collisions |
| Switch | Layer 2 | Forwards frames by MAC address — separate collision domain per port |
| Router | Layer 3 | Routes packets by IP address — separates broadcast domains |
| Wireless AP | Layer 2 | Bridges 802.11 wireless ↔ 802.3 wired |
| Layer 3 Switch | L2 + L3 | Switching + inter-VLAN routing in one device |

### Security Appliances

| Device | Function |
|--------|---------|
| Firewall | Filters traffic by rules (stateful or stateless) |
| IDS | Detects and alerts — passive, out of band |
| IPS | Detects and blocks — inline, active |
| NGFW | Firewall + IPS + app awareness + user identity |
| WAF | Protects web applications (HTTP/HTTPS inspection) |
| Proxy | Intermediary for client requests — caches, filters |

### Specialized Devices

| Device | Purpose |
|--------|---------|
| Load balancer | Distributes traffic across multiple servers |
| VPN concentrator | Terminates many simultaneous VPN tunnels |
| NAS | Network-attached storage (file level — NFS/SMB) |
| SAN | Storage area network (block level — Fibre Channel/iSCSI) |
| CDN | Caches content at edge servers close to users |

### VPN Types

| Type | Description |
|------|-------------|
| Site-to-site | Connects two networks permanently — branch offices |
| Remote access | Individual user connects to corporate network |
| Split tunnel | Only corporate traffic goes through VPN |
| Full tunnel | All traffic goes through VPN — highest security |
| SSL/TLS VPN | Browser-based, port 443 — clientless |
| IPsec VPN | IP Security suite — traditional VPN standard |`
      },
    ],
    flashcards:[
      {q:"What OSI layer does a switch operate at?", a:"Layer 2 — Data Link (uses MAC addresses to forward frames)"},
      {q:"What OSI layer does a router operate at?", a:"Layer 3 — Network (uses IP addresses to route packets)"},
      {q:"What are the 3 steps of the TCP handshake?", a:"SYN → SYN-ACK → ACK"},
      {q:"TCP vs UDP: which guarantees delivery?", a:"TCP — connection-oriented with ACKs and retransmission"},
      {q:"What port does SSH use?", a:"Port 22 — encrypted remote shell access"},
      {q:"What port does HTTPS use?", a:"Port 443 — HTTP over TLS encryption"},
      {q:"What port does DNS use?", a:"Port 53 — UDP for queries, TCP for zone transfers"},
      {q:"What port does RDP use?", a:"Port 3389 — Remote Desktop Protocol"},
      {q:"What port does SMTP use?", a:"Port 25 — sending email between servers"},
      {q:"POP3 vs IMAP: which stays on the server?", a:"IMAP (143) stays on server and syncs. POP3 (110) downloads and deletes."},
      {q:"What does ICMP do?", a:"Network diagnostics (ping, traceroute) — not data transfer"},
      {q:"What is the OSI mnemonic bottom to top?", a:"Please Do Not Throw Sausage Pizza Away"},
      {q:"SNMP port 161 vs 162?", a:"161 = manager polls device. 162 = device sends unsolicited trap to manager."},
      {q:"What port does NTP use?", a:"Port 123 UDP — clock synchronization"},
    ],
    quiz:[
      {q:"Which protocol should be used to securely manage a Linux server remotely?", options:["Telnet (23)","SSH (22)","FTP (21)","RDP (3389)"], answer:1, explanation:"SSH (port 22) provides encrypted remote access. Telnet sends credentials in plaintext and is never acceptable."},
      {q:"Which OSI layer is responsible for logical addressing and routing between networks?", options:["Layer 1 — Physical","Layer 2 — Data Link","Layer 3 — Network","Layer 4 — Transport"], answer:2, explanation:"Layer 3 (Network) handles IP addressing and routing. Routers operate at this layer."},
      {q:"A video conference app prioritizes low latency over reliability. Which transport protocol is best?", options:["TCP","UDP","ICMP","SMTP"], answer:1, explanation:"UDP is connectionless and has no retransmission overhead — ideal for real-time applications where a slightly dropped frame is better than a delayed one."},
      {q:"A managed device sends an unsolicited alert to the network management station. What protocol and port?", options:["SNMP polling, port 161","SNMP trap, port 162","Syslog, port 514","NetFlow, port 2055"], answer:1, explanation:"SNMP traps are unsolicited device-initiated messages sent to the NMS on port 162. Port 161 is for manager-initiated polling."},
      {q:"During the TCP handshake, what does the server send after receiving a SYN?", options:["ACK only","SYN only","SYN-ACK","FIN-ACK"], answer:2, explanation:"The server responds with SYN-ACK — acknowledging the client's SYN and sending its own SYN sequence number."},
      {q:"Which email protocol allows messages to stay on the server and sync across multiple devices?", options:["SMTP","POP3","IMAP","SNMP"], answer:2, explanation:"IMAP (port 143) stores messages on the server and synchronizes read/unread status across all devices. POP3 downloads and typically deletes."},
    ],
  },

  {
    week:2, title:"IP Addressing, DNS, DHCP & Cloud", domain:"Domain 1B", color:"#7c3aed", xpReward:650,
    lessons:[
      {
        id:"ipv4", title:"IPv4 Addressing & Subnetting", duration:"35 min",
        messerUrl: MESSER.ipv4, messerTitle:"Calculating IPv4 Subnets and Hosts – N10-009 1.7",
        content:`## IPv4 Addressing — The Complete Guide

An IPv4 address is a **32-bit number** written as 4 decimal octets: 192.168.1.100

### Address Classes

| Class | First Octet | Default Mask | Use |
|-------|-------------|--------------|-----|
| A | 1–126 | /8 (255.0.0.0) | Large enterprises |
| B | 128–191 | /16 (255.255.0.0) | Medium orgs |
| C | 192–223 | /24 (255.255.255.0) | Small networks |
| D | 224–239 | N/A | Multicast |
| E | 240–255 | N/A | Experimental |

### Private IP Ranges (RFC 1918)

| Range | CIDR | Class |
|-------|------|-------|
| 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 | A |
| 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 | B |
| 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 | C |

### Special Addresses

| Address | Meaning |
|---------|---------|
| 127.0.0.1 | Loopback — tests your own NIC (localhost) |
| 169.254.x.x | APIPA — DHCP failed, self-assigned |
| 0.0.0.0 | Unspecified / default route |
| 255.255.255.255 | Limited broadcast (local subnet) |

### Subnetting Quick Reference — Formula: 2^(host bits) − 2

| CIDR | Subnet Mask | Usable Hosts | Block Size |
|------|-------------|-------------|-----------|
| /24 | 255.255.255.0 | 254 | 256 |
| /25 | 255.255.255.128 | 126 | 128 |
| /26 | 255.255.255.192 | 62 | 64 |
| /27 | 255.255.255.224 | 30 | 32 |
| /28 | 255.255.255.240 | 14 | 16 |
| /29 | 255.255.255.248 | 6 | 8 |
| /30 | 255.255.255.252 | 2 | 4 |

### Magic Number Method
Magic number = 256 − subnet mask octet.
Example: 255.255.255.192 → 256 − 192 = **64** (block size)
Subnets for 192.168.1.0/26: .0, .64, .128, .192

### IPv6 Basics
IPv6 = 128-bit addresses in hexadecimal:
**2001:0db8:85a3::8a2e:0370:7334**

**IPv6 Address Types:**
- Global unicast — routable on internet (starts 2000::/3)
- Link-local — self-configured, not routable (starts FE80::/10)
- Loopback — ::1 (equivalent to 127.0.0.1)
- Multicast — starts FF00::/8

No broadcast in IPv6 — replaced by multicast.

### APIPA
169.254.x.x = DHCP server unreachable. Windows self-assigned.
- NON-ROUTABLE — cannot reach internet or other subnets
- Fix: restore DHCP → ipconfig /release → ipconfig /renew`,
        practiceQuestions: [
          {
            q: "A host has the IP address 172.16.45.200/20. What is the network address of this subnet?",
            options: ["172.16.45.0", "172.16.32.0", "172.16.48.0", "172.16.0.0"],
            answer: 1,
            explanation: "/20 means 20 network bits. The third octet boundary: 256-240=16 (block size). 172.16.0, 172.16.16, 172.16.32, 172.16.48... 172.16.45 falls in the 172.16.32 block. Network address = 172.16.32.0."
          },
          {
            q: "A workstation has the IP address 169.254.33.12. What is the MOST likely cause?",
            options: ["Static IP misconfiguration", "DHCP server unreachable — APIPA address self-assigned", "Duplicate IP on network", "VPN connection issue"],
            answer: 1,
            explanation: "169.254.x.x is APIPA (Automatic Private IP Addressing) — Windows self-assigns when no DHCP server responds. This indicates DHCP server is unreachable, not a static IP or duplicate IP issue."
          },
          {
            q: "How many usable host addresses are in the 192.168.10.64/26 subnet?",
            options: ["30", "62", "64", "126"],
            answer: 1,
            explanation: "/26 = 26 network bits, 6 host bits. 2^6 = 64 total - 2 (network .64 and broadcast .127) = 62 usable hosts."
          },
          {
            q: "Which IP address is a private RFC 1918 address?",
            options: ["172.32.0.1", "192.169.1.1", "10.255.255.254", "198.51.100.1"],
            answer: 2,
            explanation: "10.255.255.254 is in 10.0.0.0/8 (private). 172.32.0.1 is public (private range is 172.16.0.0-172.31.255.255). 192.169.1.1 is public. 198.51.100.0/24 is documentation space."
          },
          {
            q: "From 192.168.1.0/24, you need 6 subnets with at least 25 hosts each. Which CIDR?",
            options: ["/25", "/26", "/27", "/28"],
            answer: 2,
            explanation: "/27 provides 32 addresses - 2 = 30 hosts per subnet, and creates 8 subnets. Meets both requirements. /26 has only 4 subnets, /28 has only 14 hosts."
          }
        ]
      },
      {
        id:"dns", title:"DNS, DHCP & NAT", duration:"25 min",
        messerUrl: MESSER.index, messerTitle:"DHCP Overview / DNS Record Types – N10-009 1.6",
        content:`## DNS — Domain Name System (Port 53)

DNS translates hostnames to IP addresses. UDP for queries, TCP for zone transfers.

### DNS Record Types

| Record | Purpose | Example |
|--------|---------|---------|
| **A** | Hostname → IPv4 | google.com → 142.250.80.46 |
| **AAAA** | Hostname → IPv6 | google.com → 2607:f8b0::... |
| **CNAME** | Alias to another hostname | www → google.com |
| **MX** | Mail server for domain | @ → mail.google.com |
| **PTR** | Reverse DNS: IP → hostname | Reverse lookup zones |
| **TXT** | Text records | SPF, DKIM, domain verification |
| **SOA** | Start of Authority | Zone primary nameserver info |
| **NS** | Name Server | Authoritative DNS servers |
| **SRV** | Service location | SIP, LDAP service discovery |

### DNS Resolution (Recursive)
1. Browser checks local cache
2. Asks local DNS resolver (DHCP-assigned)
3. Resolver asks root nameserver (.)
4. Root refers to .com TLD
5. TLD refers to authoritative nameserver
6. Authoritative returns A record
7. Result cached with TTL

**TTL** — How long records are cached. Shorter = faster change propagation but more queries.

---

## DHCP — The DORA Process (Ports 67/68 UDP)

| Step | Packet | Direction | Action |
|------|--------|-----------|--------|
| **D**iscover | DHCPDISCOVER | Client → Broadcast | "Is there a DHCP server?" |
| **O**ffer | DHCPOFFER | Server → Client | "Take 192.168.1.100/24, GW .1" |
| **R**equest | DHCPREQUEST | Client → Broadcast | "Yes, I'll take that IP" |
| **A**cknowledge | DHCPACK | Server → Client | "Yours for 8 hours" |

**DHCP Key Terms:**
- Lease — temporary IP with expiration
- Scope — pool of IPs available
- Reservation — same IP always to same MAC
- Relay agent — forwards DHCP across subnets (routers block broadcasts)

---

## NAT — Network Address Translation

| Type | Description | Use |
|------|-------------|-----|
| Static NAT | One private ↔ one public (1:1) | Public servers |
| Dynamic NAT | Pool of public IPs shared | Less common |
| **PAT / NAT Overload** | Many private → ONE public via ports | Home routers |

PAT = what your home router does. Many devices share one public IP using different port numbers.`
      },
      {
        id:"cloud", title:"Cloud, SDN, SD-WAN & Zero Trust", duration:"20 min",
        messerUrl: MESSER.cloud, messerTitle:"Cloud Models & Connectivity – N10-009 1.3",
        content:`## Cloud Service Models

| Model | You Manage | Provider Manages | Example |
|-------|------------|-----------------|---------|
| **IaaS** | OS, apps, data | Hardware, virtualization | AWS EC2, Azure VMs |
| **PaaS** | Apps and data | OS, runtime, middleware | Heroku, Google App Engine |
| **SaaS** | Nothing | Everything | Gmail, Salesforce, Office 365 |

Moving up the stack (IaaS → SaaS) = you manage LESS.

### Deployment Models

| Model | Description |
|-------|-------------|
| Public | Shared provider infrastructure (AWS, Azure, GCP) |
| Private | Dedicated to one organization |
| Hybrid | Mix of public + private, connected |
| Community | Shared by orgs with common goals |
| Multi-cloud | Multiple cloud providers simultaneously |

### SDN — Software-Defined Networking
Separates the **control plane** (decisions) from the **data plane** (forwarding).
- Control plane: centralized software controller — the brain
- Data plane: switches follow controller instructions
- Benefits: programmable, automated, centrally managed

### SD-WAN (New in N10-009)
SD-WAN extends SDN concepts to WAN between multiple sites.
- Centralized policy management — configure all sites from one dashboard
- Application-aware routing — route video to low-latency path
- Zero-touch provisioning — new branch comes online automatically
- Transport independence — works over MPLS, broadband, 4G/5G

### Zero Trust & SASE
**Zero Trust:** "Never trust, always verify"
- No implicit trust based on network location
- Every access requires authentication regardless of where user is
- Microsegmentation limits lateral movement

**SASE (Secure Access Service Edge):**
- Combines SD-WAN + security (ZTNA, SWG, CASB, FWaaS) as a cloud service
- Users connect to nearest SASE edge — security applied in cloud

### VxLAN & IaC
**VxLAN** — Virtual Extensible LAN:
- Extends Layer 2 over Layer 3 for large data centers
- Overcomes 4094 VLAN limit with 16 million virtual networks

**IaC (Infrastructure as Code):**
- Code/scripts provision and configure infrastructure automatically
- Repeatable, version-controlled, no manual errors
- Examples: Terraform, Ansible, Puppet`,
        practiceQuestions: [
          {
            q: "A startup uses an application hosted on AWS where the cloud provider manages the runtime, middleware, and operating system. The startup only manages their application code and data. Which cloud service model is this?",
            options: ["IaaS — Infrastructure as a Service", "PaaS — Platform as a Service", "SaaS — Software as a Service", "FaaS — Function as a Service"],
            answer: 1,
            explanation: "PaaS provides a managed platform where the provider handles the OS, runtime, and middleware. The customer only manages applications and data. IaaS would require the customer to manage the OS. SaaS means the customer manages nothing — they just use the software."
          },
          {
            q: "An enterprise wants to ensure that employees working from coffee shops, hotels, and home offices must authenticate their identity and device posture before accessing any corporate resource — regardless of whether they are on or off the corporate network. Which security model is described?",
            options: ["Perimeter-based security with a strong firewall", "Zero Trust Architecture", "SD-WAN with centralized policy", "SASE with edge computing"],
            answer: 1,
            explanation: "Zero Trust Architecture operates on 'never trust, always verify' — every access request must be authenticated and authorized regardless of network location. Traditional perimeter security only enforces controls at the network edge and implicitly trusts traffic already inside."
          },
          {
            q: "What differentiates SD-WAN from traditional SDN?",
            options: ["SD-WAN only works with wireless networks", "SDN requires cloud infrastructure; SD-WAN can run on-premises", "SD-WAN extends software-defined control across geographically distributed WAN connections, while SDN typically applies within a single location", "SD-WAN encrypts all traffic; SDN does not"],
            answer: 2,
            explanation: "SDN applies software-defined control within a data center or campus. SD-WAN extends this concept across WAN connections between multiple geographically distributed sites, adding features like application-aware routing, zero-touch provisioning, and centralized management of branch office connectivity."
          },
          {
            q: "A large enterprise data center needs to support 50,000 isolated tenant networks. Traditional VLANs support only 4,094. Which technology addresses this limitation?",
            options: ["VLAN stacking (QinQ)", "VxLAN", "Private VLANs", "MPLS"],
            answer: 1,
            explanation: "VxLAN (Virtual Extensible LAN) uses a 24-bit VNI (VLAN Network Identifier) to support up to 16 million virtual networks, compared to the 12-bit VLAN ID that limits traditional VLANs to 4,094. VxLAN encapsulates Layer 2 frames inside UDP packets for transport over Layer 3 networks."
          },
          {
            q: "Which cloud deployment model is used when an organization maintains some infrastructure on-premises for sensitive data while using public cloud resources for less sensitive workloads?",
            options: ["Private cloud", "Public cloud", "Community cloud", "Hybrid cloud"],
            answer: 3,
            explanation: "A hybrid cloud combines private (on-premises) and public cloud resources, typically connected securely. Organizations use it to keep sensitive/regulated data on-premises while leveraging public cloud scalability and cost efficiency for other workloads."
          }
        ]
      },
    ],
    flashcards:[
      {q:"APIPA 169.254.x.x — what does it mean?", a:"DHCP server is unreachable. Windows self-assigned a non-routable address."},
      {q:"What are the 4 steps of DHCP DORA?", a:"Discover → Offer → Request → Acknowledge"},
      {q:"What DNS record maps hostname to IPv4?", a:"A record"},
      {q:"What DNS record maps hostname to IPv6?", a:"AAAA (quad-A) record"},
      {q:"What DNS record handles reverse lookups (IP → hostname)?", a:"PTR record"},
      {q:"What DNS record specifies mail servers for a domain?", a:"MX (Mail Exchange) record"},
      {q:"What is PAT / NAT Overload?", a:"Many private IPs share one public IP using unique port numbers — what home routers do"},
      {q:"How many usable hosts in a /27?", a:"30 (2^5 = 32 − 2)"},
      {q:"How many usable hosts in a /26?", a:"62 (2^6 = 64 − 2)"},
      {q:"What is Zero Trust?", a:"Never trust, always verify — every user/device must authenticate regardless of network location"},
      {q:"What is SD-WAN?", a:"Software-Defined WAN — centralized policy, app-aware routing across distributed WAN locations"},
      {q:"What is VxLAN used for?", a:"Layer 2 over Layer 3 for large data centers — supports 16M virtual networks vs 4094 VLAN limit"},
      {q:"SaaS vs IaaS: who manages the OS?", a:"IaaS = you manage OS. SaaS = provider manages everything."},
      {q:"What is DNS TTL?", a:"How long a record is cached before re-querying. Shorter = faster propagation of changes."},
    ],
    quiz:[
      {q:"A workstation shows IP 169.254.18.45. What is the most likely cause?", options:["Static IP conflict","DHCP server unreachable","Router is down","DNS failure"], answer:1, explanation:"169.254.x.x is APIPA — automatically self-assigned when no DHCP server responds to the DHCPDISCOVER broadcast."},
      {q:"Which DNS record resolves an IP address back to a hostname?", options:["A","MX","PTR","CNAME"], answer:2, explanation:"PTR (Pointer) records are used for reverse DNS lookups — mapping an IP address to a hostname."},
      {q:"How many usable hosts are in a /26 subnet?", options:["30","62","64","126"], answer:1, explanation:"/26 = 6 host bits. 2^6 = 64 − 2 = 62 usable hosts."},
      {q:"Which cloud model gives the customer full control over the OS?", options:["SaaS","PaaS","IaaS","FaaS"], answer:2, explanation:"IaaS gives you control over OS, applications, and data. The provider manages physical hardware and virtualization only."},
      {q:"Which DHCP step does the client use to formally accept an offered IP?", options:["Discover","Offer","Request","Acknowledge"], answer:2, explanation:"After receiving an Offer, the client sends a DHCPREQUEST broadcast to formally select that IP and notify other DHCP servers."},
      {q:"A company needs application-aware routing and centralized control across 30 branch offices. Best solution?", options:["OSPF with static routes","SD-WAN","Traditional MPLS only","RIP v2"], answer:1, explanation:"SD-WAN provides centralized policy management, application-aware routing, and zero-touch provisioning for distributed WAN environments."},
    ],
  },

  {
    week:3, title:"Switching, Routing & Network Implementation", domain:"Domain 2A", color:"#059669", xpReward:650,
    lessons:[
      {
        id:"vlans", title:"VLANs, Trunking & STP", duration:"30 min",
        messerUrl: MESSER.vlans, messerTitle:"VLANs and Trunking – N10-009 2.2",
        content:`## VLANs — Virtual Local Area Networks

A VLAN logically segments a physical network into separate broadcast domains. Devices on different VLANs **cannot communicate without a Layer 3 device**.

### Why VLANs?
- Security — isolate sensitive departments (Finance, HR, Guest)
- Performance — reduce broadcast domain size
- Flexibility — group by role, not physical location

### VLAN Port Types

| Port Type | Description | Used Between |
|-----------|-------------|-------------|
| **Access port** | ONE VLAN, untagged frames | Switch ↔ end device |
| **Trunk port** | MULTIPLE VLANs with 802.1Q tags | Switch ↔ Switch, Switch ↔ Router |

**Native VLAN** — untagged traffic on a trunk. Default is VLAN 1. Best practice: change it.

### Inter-VLAN Routing
VLANs are isolated — routing between them requires:
- **Router-on-a-stick** — one physical port with subinterfaces (g0/0.10, g0/0.20)
- **Layer 3 switch** — SVI (Switched Virtual Interface) per VLAN

### STP — Spanning Tree Protocol
**Problem:** Redundant links between switches create Layer 2 loops → broadcast storms crash network.
**Solution:** STP blocks redundant paths, keeps one active path. Unblocks alternates if link fails.

**STP Key Terms:**

| Term | Meaning |
|------|---------|
| Root bridge | Switch elected as topology center (lowest Bridge ID) |
| Root port | Port on non-root switch closest to root bridge |
| Designated port | Best forwarding port on each segment |
| Blocked port | Port not forwarding — prevents loops |

**STP Port States (802.1D):** Blocking → Listening → Learning → Forwarding (30–50 sec total)
**RSTP (802.1w):** Rapid STP — converges in seconds. Used in all modern switches.

### Port Security

| Feature | Description |
|---------|-------------|
| Maximum MACs | Limit devices on a port |
| Sticky MAC | Dynamically learn and lock first MAC |
| Shutdown | Port goes err-disabled on violation (default) |
| Restrict | Drops frames, logs, sends trap |
| Protect | Drops frames silently — no log |

### Link Aggregation (LACP / 802.3ad)
Bundles multiple physical links into one logical link.
- Increases bandwidth, provides redundancy
- LACP (Link Aggregation Control Protocol) is the standard`,
        practiceQuestions: [
          {
            q: "A switch port is configured as an access port in VLAN 20. A user connects a device that sends 802.1Q-tagged frames for VLAN 30. What happens?",
            options: ["The switch accepts the frames and places them in VLAN 30", "The switch drops the tagged frames — access ports do not process 802.1Q tags", "The switch forwards the frames to the trunk port", "The switch sends the frames to the native VLAN"],
            answer: 1,
            explanation: "Access ports are configured for a single untagged VLAN. They do not process 802.1Q-tagged frames from end devices — tagged frames arriving on an access port are typically dropped. Only trunk ports process 802.1Q tags."
          },
          {
            q: "A network has two switches connected with a redundant second link for failover. Users report intermittent network outages caused by broadcast storms. Which protocol should be configured?",
            options: ["OSPF to create loop-free routing paths", "STP or RSTP to block redundant Layer 2 paths", "LACP to bundle the links into a single logical connection", "VRRP to provide gateway redundancy"],
            answer: 1,
            explanation: "Broadcast storms in a switched network with redundant links are caused by Layer 2 loops — the same frame circulates endlessly. STP/RSTP solves this by blocking redundant ports. LACP would bundle the links but doesn't prevent loops in the same way. OSPF and VRRP are Layer 3 protocols."
          },
          {
            q: "What is the purpose of the Native VLAN on a trunk port, and what is the security best practice?",
            options: ["The Native VLAN carries tagged frames; best practice is to keep it as VLAN 1", "The Native VLAN carries untagged frames; best practice is to change it from VLAN 1 to an unused VLAN", "The Native VLAN is the management VLAN; best practice is to assign it to the same VLAN as users", "The Native VLAN carries STP BPDUs; it cannot be changed"],
            answer: 1,
            explanation: "The Native VLAN is the VLAN that trunk ports use for untagged frames. It defaults to VLAN 1. Best practice is to change it to an unused VLAN because VLAN hopping attacks (double tagging) can exploit the Native VLAN to cross VLAN boundaries if Native VLANs are mismatched."
          },
          {
            q: "A switch port is configured with port security, sticky MAC, and violation mode 'shutdown.' A laptop is connected and the MAC is learned. A user then connects a different laptop to the same port. What happens?",
            options: ["The second laptop is placed in a quarantine VLAN", "The port enters err-disabled state and shuts down", "The port generates a log message but continues operating", "The second laptop's MAC replaces the first in the port security table"],
            answer: 1,
            explanation: "With shutdown violation mode, when an unauthorized MAC (the second laptop) is detected, the port immediately transitions to err-disabled state — effectively shutting down. An administrator must manually re-enable it. 'Restrict' logs/alerts but keeps the port up. 'Protect' silently drops."
          },
          {
            q: "What is the function of RSTP compared to classic STP 802.1D?",
            options: ["RSTP uses fewer VLANs to reduce overhead", "RSTP provides faster convergence — seconds instead of 30–50 seconds", "RSTP is only used in wireless networks", "RSTP replaces 802.1Q tagging on trunk ports"],
            answer: 1,
            explanation: "RSTP (Rapid Spanning Tree Protocol, 802.1w) dramatically reduces convergence time to seconds versus the 30–50 seconds of classic STP. It achieves this through new port roles (alternate, backup) and a negotiation mechanism that allows immediate transitions to forwarding without the Listening/Learning delay."
          }
        ]
      },
      {
        id:"routing", title:"Routing Protocols & Tables", duration:"25 min",
        messerUrl: MESSER.routing, messerTitle:"Routing Technologies – N10-009 2.1",
        content:`## Routing — How Packets Find Their Destination

A router uses a **routing table** to forward packets to the best-matching destination.

### Administrative Distance — Lower = More Trusted

| Route Source | AD |
|-------------|-----|
| Directly connected | 0 |
| Static route | 1 |
| eBGP | 20 |
| EIGRP | 90 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |

If OSPF (110) and RIP (120) both know a route → router picks **OSPF**.

### Routing Protocol Comparison

| Protocol | Type | Metric | Max Hops | Use Case | AD |
|----------|------|--------|----------|---------|-----|
| **RIP v2** | Distance vector | Hop count | 15 | Small / legacy | 120 |
| **OSPF** | Link state | Cost (bandwidth) | Unlimited | Enterprise | 110 |
| **EIGRP** | Hybrid | BW + delay | Unlimited | Cisco only | 90 |
| **BGP** | Path vector | AS path | Unlimited | Internet (ISPs) | 20 |

### OSPF Key Concepts
- Routers flood **LSAs** (Link State Advertisements) describing their links
- Each router builds identical **LSDB** (Link State Database)
- Runs **Dijkstra SPF algorithm** to find shortest path
- Uses **Areas** (Area 0 = backbone) to limit LSA flooding
- **Hello packets** to discover neighbors (224.0.0.5)

### BGP — Border Gateway Protocol
Internet's routing protocol. Connects **Autonomous Systems (AS)**.
- **iBGP** = within same AS
- **eBGP** = between different ASes (what ISPs use)
- Path selection: AS path, local preference, MED

### Default Route
**0.0.0.0/0** — route of last resort. Every edge router has one pointing to its ISP.

### FHRP — First Hop Redundancy Protocols
Provides virtual gateway IP if router fails.

| Protocol | Type | Notes |
|----------|------|-------|
| **HSRP** | Cisco proprietary | Hot Standby Router Protocol |
| **VRRP** | Open standard | Virtual Router Redundancy Protocol |
| **GLBP** | Cisco proprietary | Adds load balancing across routers |`,
        practiceQuestions: [
          {
            q: "A router has two routes to the 10.0.0.0/8 network: one learned via OSPF and one via RIP. Which route will be installed and why?",
            options: ["RIP — it uses fewer resources", "OSPF — it has a lower Administrative Distance (110) than RIP (120)", "RIP — it has a lower Administrative Distance (120) than OSPF (110)", "Both routes are installed and traffic is load-balanced"],
            answer: 1,
            explanation: "Administrative Distance (AD) measures route trustworthiness — lower AD wins. OSPF has AD 110; RIP has AD 120. The router installs the OSPF route. If OSPF fails, the RIP route becomes a backup."
          },
          {
            q: "A branch office router is configured with a single default route pointing to the ISP. What does this mean for packets destined for unknown networks?",
            options: ["Packets are dropped with an ICMP host unreachable message", "Packets are forwarded to the ISP via the default route 0.0.0.0/0", "Packets are held until a specific route is learned", "Packets are flooded out all interfaces"],
            answer: 1,
            explanation: "The default route (0.0.0.0/0) is the 'route of last resort' — it matches any destination not found in the routing table. All unknown destinations are forwarded to the ISP."
          },
          {
            q: "A company uses HSRP between two routers sharing a virtual IP as the default gateway. Router A is active with priority 110. Router B is standby with priority 100. Router A fails. What happens?",
            options: ["All clients lose connectivity until Router A is restored", "Router B becomes active and takes over the virtual IP as the gateway", "Router B sends gratuitous ARPs to claim Router A's real IP", "A new election occurs and a third router must be configured"],
            answer: 1,
            explanation: "HSRP provides gateway redundancy. When the active router (A) fails, the standby router (B) detects the failure, transitions to active, and takes ownership of the virtual IP address. Client devices continue using the same default gateway IP."
          },
          {
            q: "Which routing protocol is specifically designed for routing between different organizations' networks on the internet (between Autonomous Systems)?",
            options: ["OSPF", "EIGRP", "RIP v2", "BGP"],
            answer: 3,
            explanation: "BGP (Border Gateway Protocol) is the internet's routing protocol. It operates between Autonomous Systems (ASes) — large networks like ISPs and enterprises. OSPF, EIGRP, and RIP are interior gateway protocols (IGPs) used within a single AS."
          },
          {
            q: "What does a router do when it receives a packet and no specific route matches the destination IP address, and there is no default route configured?",
            options: ["Forwards it to the nearest router using flood routing", "Drops the packet and sends an ICMP Destination Unreachable back to the source", "Holds it in a buffer waiting for a route to be learned", "Forwards it back out the interface it arrived on"],
            answer: 1,
            explanation: "Every routing table has an implicit 'deny' at the end. If no route matches and there's no default route, the router drops the packet and sends ICMP Type 3 (Destination Unreachable) back to the source."
          }
        ]
      },
    ],
    flashcards:[
      {q:"What is the purpose of an 802.1Q trunk port?", a:"Carries tagged traffic for multiple VLANs between switches or between switch and router"},
      {q:"What does STP prevent?", a:"Layer 2 loops and broadcast storms in redundant switched networks"},
      {q:"What is a duplex mismatch?", a:"One port full duplex, other half duplex — causes late collisions and degraded performance"},
      {q:"Which routing protocol uses hop count with a max of 15?", a:"RIP v2"},
      {q:"Which routing protocol is used for internet routing between ISPs?", a:"BGP (Border Gateway Protocol) — path vector, connects Autonomous Systems"},
      {q:"What is Administrative Distance?", a:"Trustworthiness of a routing source — lower AD = more preferred (OSPF=110, RIP=120)"},
      {q:"What does OSPF use as its cost metric?", a:"Bandwidth (cost = reference bandwidth / interface bandwidth)"},
      {q:"What is the default route?", a:"0.0.0.0/0 — route of last resort, matches any destination not in the routing table"},
      {q:"VRRP vs HSRP: which is open standard?", a:"VRRP (Virtual Router Redundancy Protocol) — open standard. HSRP is Cisco proprietary."},
      {q:"What is the Native VLAN?", a:"The VLAN that carries untagged traffic on a trunk port — default VLAN 1, should be changed"},
      {q:"What does LACP provide?", a:"Link aggregation — bundles multiple physical links into one logical link for bandwidth and redundancy"},
      {q:"STP port states in order?", a:"Blocking → Listening → Learning → Forwarding"},
    ],
    quiz:[
      {q:"Which switch port type carries tagged traffic for multiple VLANs?", options:["Access port","Trunk port","Mirror port","Native port"], answer:1, explanation:"Trunk ports use 802.1Q tags to carry multiple VLANs. Access ports belong to one VLAN and don't tag traffic."},
      {q:"Which protocol prevents Layer 2 loops in redundant switched networks?", options:["OSPF","STP/RSTP","RIP","BGP"], answer:1, explanation:"Spanning Tree Protocol blocks redundant paths to prevent loops and broadcast storms."},
      {q:"Which routing protocol is standard for large enterprise interior routing?", options:["RIP v2","BGP","OSPF","Static routes"], answer:2, explanation:"OSPF is the enterprise standard — link-state, no hop count limit, fast convergence."},
      {q:"Which FHRP protocol is an open standard?", options:["HSRP","GLBP","VRRP","EIGRP"], answer:2, explanation:"VRRP is the IEEE open standard. HSRP and GLBP are Cisco proprietary."},
      {q:"A switch port violation mode drops unauthorized frames silently with no log. Which mode?", options:["Shutdown","Restrict","Protect","Block"], answer:2, explanation:"Protect silently drops frames. Restrict drops and logs. Shutdown disables the port (err-disabled)."},
      {q:"What is the Administrative Distance of OSPF?", options:["20","90","110","120"], answer:2, explanation:"OSPF AD = 110. EIGRP = 90, RIP = 120, eBGP = 20. Lower AD = more trusted."},
    ],
  },

  {
    week:4, title:"Wireless, Cabling & Physical Layer", domain:"Domain 2B", color:"#d97706", xpReward:600,
    lessons:[
      {
        id:"wireless", title:"Wireless Standards & Security", duration:"30 min",
        messerUrl: MESSER.index, messerTitle:"Wireless Standards – N10-009 1.5",
        content:`## 802.11 Wireless Standards

| Standard | Nickname | Frequency | Max Speed | Key Feature |
|----------|----------|-----------|-----------|------------|
| 802.11a | — | 5 GHz | 54 Mbps | First 5 GHz, legacy |
| 802.11b | — | 2.4 GHz | 11 Mbps | First popular Wi-Fi |
| 802.11g | — | 2.4 GHz | 54 Mbps | Compatible with b |
| 802.11n | **Wi-Fi 4** | 2.4 / 5 GHz | 600 Mbps | MIMO, dual-band |
| 802.11ac | **Wi-Fi 5** | 5 GHz | 3.5 Gbps | MU-MIMO, beamforming |
| 802.11ax | **Wi-Fi 6** | 2.4 / 5 / 6 GHz | 9.6 Gbps | OFDMA, BSS coloring |

### 2.4 GHz vs 5 GHz

| | 2.4 GHz | 5 GHz |
|--|---------|-------|
| Speed | Lower | Higher |
| Range | Longer | Shorter |
| Wall penetration | Better | Worse |
| Congestion | More (Bluetooth, microwaves) | Less |
| Non-overlapping channels | 3 (1, 6, 11) | Many |

### Wireless Security Protocols

| Protocol | Encryption | Security | Notes |
|----------|-----------|---------|-------|
| WEP | RC4 | ❌ Broken | Crackable in minutes — never use |
| WPA | TKIP | ⚠️ Weak | Deprecated |
| **WPA2** | AES/CCMP | ✅ Good | Current minimum standard |
| **WPA3** | AES/GCMP + SAE | ✅ Best | SAE prevents offline dictionary attacks |

**WPA3 improvements:**
- SAE (Simultaneous Authentication of Equals) — replaces PSK handshake
- Forward secrecy — past sessions can't be decrypted later
- OWE — encrypts open networks

### Wireless Terms

| Term | Definition |
|------|-----------|
| SSID | Network name (up to 32 chars) |
| BSSID | MAC address of the access point |
| BSS | Single AP network |
| ESS | Multiple APs, same SSID — enables roaming |
| RSSI | Received Signal Strength Indicator |

### WPA2 Personal vs Enterprise

| | Personal (PSK) | Enterprise (802.1X) |
|--|--------------|---------------------|
| Auth | Pre-shared key | RADIUS server |
| Use | Home, small office | Corporate |`,
        practiceQuestions: [
          {
            q: "A wireless network administrator is deploying three access points in adjacent areas of an office. All APs use the 2.4 GHz band. To avoid co-channel interference, which channels should be assigned?",
            options: ["Channels 1, 2, and 3", "Channels 1, 6, and 11", "Channels 1, 5, and 10", "Any three channels above channel 6"],
            answer: 1,
            explanation: "In the 2.4 GHz band, only channels 1, 6, and 11 are non-overlapping. Adjacent channels (e.g., 1, 2, 3) overlap in frequency and cause co-channel interference. Using 1, 6, and 11 provides the maximum separation between APs while covering the full 2.4 GHz spectrum."
          },
          {
            q: "A user's laptop connects to the corporate Wi-Fi network but receives an 'authentication failed' error after entering the correct password. The laptop was recently updated. Security logs show the AP is using WPA3-Enterprise. What is the MOST likely cause?",
            options: ["The SSID has changed", "The AP's WPA3 channel is congested", "The laptop's network driver or 802.1X supplicant configuration may be incompatible after the update", "The DHCP server ran out of addresses"],
            answer: 2,
            explanation: "WPA3-Enterprise uses 802.1X and EAP for authentication. After a system update, the supplicant configuration or certificate trust may have changed. 'Authentication failed' with correct credentials points to an authentication stack issue, not an SSID, channel, or DHCP problem."
          },
          {
            q: "Which wireless security protocol is vulnerable to offline dictionary attacks against captured 4-way handshakes?",
            options: ["WEP", "WPA2-Personal (PSK)", "WPA3-Personal (SAE)", "WPA2-Enterprise (802.1X)"],
            answer: 1,
            explanation: "WPA2-Personal's 4-way PSK handshake can be captured and subjected to offline dictionary attacks. WPA3-Personal uses SAE which prevents offline attacks. WEP is completely broken. WPA2-Enterprise uses individual credentials, making dictionary attacks impractical."
          },
          {
            q: "An attacker sets up a rogue access point with the same SSID as the corporate Wi-Fi network and a stronger signal. Users unknowingly connect to the attacker's AP. What is this attack called?",
            options: ["Deauthentication attack", "WPS pin attack", "Evil twin attack", "Karma attack"],
            answer: 2,
            explanation: "An evil twin attack involves a rogue AP broadcasting the same SSID as a legitimate network with a stronger signal, tricking users into connecting. The attacker can then perform MITM attacks, capture credentials, and intercept traffic."
          },
          {
            q: "802.11ax (Wi-Fi 6) introduces OFDMA. What does this improve compared to 802.11ac (Wi-Fi 5)?",
            options: ["Maximum single-device throughput on uncongested networks", "Efficiency in dense environments with many simultaneous users", "Maximum transmission distance", "Compatibility with 2.4 GHz legacy devices"],
            answer: 1,
            explanation: "OFDMA allows an AP to serve multiple clients simultaneously on different sub-channels within a single transmission, dramatically improving efficiency in dense environments (stadiums, offices) where many devices are active concurrently."
          }
        ]
      },
      {
        id:"cabling", title:"Cabling, Fiber & Physical Tools", duration:"25 min",
        messerUrl: MESSER.index, messerTitle:"Copper Cabling / Optical Fiber – N10-009 1.5",
        content:`## Copper Cabling — Twisted Pair

| Standard | Max Speed | Max Distance | Notes |
|----------|-----------|-------------|-------|
| Cat5e | 1 Gbps | 100m | Legacy standard |
| **Cat6** | 10 Gbps at 55m / 1G at 100m | 100m | Current common standard |
| **Cat6a** | 10 Gbps | 100m | Data centers — full 10G at 100m |
| Cat7 | 10+ Gbps | 100m | Shielded |
| Cat8 | 25/40 Gbps | 30m | Data center switch-to-switch |

**The 100m rule:** Copper Ethernet max segment = 100 meters.

### Connectors

| Connector | Pins | Use |
|-----------|------|-----|
| RJ-45 | 8P8C | Ethernet — standard network |
| RJ-11 | 6P2C | Telephone / DSL |
| BNC | — | Coaxial — legacy |

### Wiring Standards (TIA-568)

| Cable | Each End | Use |
|-------|----------|-----|
| Straight-through | Both 568B | PC → Switch |
| Crossover | 568A one end, 568B other | Switch → Switch |
| Rollover / Console | Pins reversed | PC → Router console |

**Auto-MDIX:** Modern switches detect cable type — crossover rarely needed.

### Fiber Optic

| | Single-Mode (SMF) | Multi-Mode (MMF) |
|--|------------------|-----------------|
| Core | 9 microns | 50 / 62.5 microns |
| Light | Laser | LED |
| Distance | Kilometers | ~500m |
| Cost | Higher | Lower |
| Use | WAN, inter-building | Data center, campus |
| Color | Yellow | Orange / Aqua |

### Fiber Connectors

| Connector | Style | Use |
|-----------|-------|-----|
| **LC** | Small push-pull | Data centers, SFP modules |
| **SC** | Square push-pull | Older installs |
| **ST** | Bayonet twist-lock | Older installs |
| **MPO/MTP** | Multi-fiber (12/24) | High-density data centers |

### Plenum vs Riser
- **Plenum** — fire-resistant, low-smoke — required in air-handling spaces (above drop ceilings)
- **Riser** — vertical between floors — less strict
- **PVC** — standard — only where code allows

### Testing Tools

| Tool | Tests |
|------|-------|
| Cable tester | Continuity, pinout, wiremap |
| Tone generator + probe | Trace cable path through walls |
| TDR | Finds break location in copper |
| OTDR | Finds break location in fiber |
| Loopback plug | Tests NIC / port |`,
        practiceQuestions: [
          {
            q: "A network installer needs to run cable between two buildings 300 meters apart. What type of cable is appropriate?",
            options: ["Cat6a — it supports long distances", "Cat7 — it has shielding for outdoor use", "Single-mode fiber — it supports kilometer-scale distances", "Multi-mode fiber — it is cheaper and still sufficient at 300m"],
            answer: 2,
            explanation: "Copper Ethernet (all Cat categories) has a maximum segment length of 100 meters. At 300 meters, fiber is required. Single-mode fiber (SMF) supports kilometers and is the standard choice for inter-building runs."
          },
          {
            q: "A technician is running new Cat6a cables through the air handling space above the drop ceiling (a plenum space). Which cable jacket type is required?",
            options: ["PVC — it is the most common and flexible", "Riser — it is rated for vertical runs", "Plenum — it is fire-resistant and low-smoke rated for air-handling spaces", "Direct burial — it is weatherproof"],
            answer: 2,
            explanation: "Building codes require plenum-rated cable in air-handling spaces because standard PVC jackets emit toxic smoke when burning. Plenum cable uses FEP or low-smoke PVC that self-extinguishes."
          },
          {
            q: "A technician connects two switches with a straight-through Ethernet cable but gets no link. A crossover cable produces a working link. What should the technician do long-term?",
            options: ["Always use crossover cables between switches", "Verify that Auto-MDIX is enabled on both switches — modern switches should handle either cable type", "Replace the switches as they are defective", "Use a fiber cable instead"],
            answer: 1,
            explanation: "Modern switches support Auto-MDIX, which automatically detects whether a straight-through or crossover cable is connected and adjusts accordingly. The best practice is to enable Auto-MDIX so cable type doesn't matter."
          },
          {
            q: "A network technician needs to determine which port on a patch panel corresponds to a specific wall jack in an office. Which tool should be used?",
            options: ["OTDR — to measure cable distance", "Cable tester — to verify continuity", "Tone generator and probe — to trace the cable path", "Loopback plug — to test the port"],
            answer: 2,
            explanation: "A tone generator is connected to one end of the cable (wall jack), and a probe is used to trace the cable through walls/ceilings and identify it at the patch panel."
          },
          {
            q: "What is the maximum throughput of Cat6 cable at a full 100-meter run?",
            options: ["10 Gbps", "1 Gbps", "100 Mbps", "10 Gbps only up to 55 meters"],
            answer: 1,
            explanation: "Cat6 supports 1 Gbps at the full 100-meter segment length. It can support 10 Gbps, but only up to 55 meters. For guaranteed 10G at 100m, Cat6a is required."
          }
        ]
      },
    ],
    flashcards:[
      {q:"What wireless standard is Wi-Fi 6?", a:"802.11ax"},
      {q:"What wireless standard is Wi-Fi 5?", a:"802.11ac"},
      {q:"Most secure wireless security protocol?", a:"WPA3 — uses SAE (Simultaneous Authentication of Equals)"},
      {q:"Non-overlapping 2.4 GHz channels?", a:"Channels 1, 6, and 11"},
      {q:"Cat6a: max speed and distance?", a:"10 Gbps at 100 meters"},
      {q:"Max segment distance for copper Ethernet?", a:"100 meters"},
      {q:"SMF vs MMF: which goes farther?", a:"Single-mode fiber (SMF) — laser, kilometers of distance"},
      {q:"Most common fiber connector in data centers?", a:"LC connector — small form factor, used with SFP modules"},
      {q:"What is BSSID?", a:"The MAC address of the specific access point"},
      {q:"What is an ESS?", a:"Extended Service Set — multiple APs sharing same SSID for seamless roaming"},
      {q:"Plenum vs Riser: which is required in air-handling spaces?", a:"Plenum cable — fire-resistant, low-smoke, required by building codes"},
      {q:"What tool traces a cable path through walls?", a:"Tone generator and probe (Fox and Hound)"},
    ],
    quiz:[
      {q:"5 GHz band has poor signal far from the AP. Best recommendation?", options:["Switch to WPA3","Move to 2.4 GHz band","Change to channel 6","Upgrade to Cat6a"], answer:1, explanation:"5 GHz has shorter range and worse wall penetration. 2.4 GHz provides better coverage at distance."},
      {q:"Which cable supports 10 Gbps at the full 100-meter segment?", options:["Cat5e","Cat6","Cat6a","Cat7"], answer:2, explanation:"Cat6a supports 10 Gbps at 100m. Cat6 drops to 1 Gbps beyond 55m."},
      {q:"Which fiber type is used for long-distance WAN connections?", options:["Multi-mode fiber","Single-mode fiber","Cat6a","Coaxial"], answer:1, explanation:"Single-mode fiber uses a laser and supports kilometers of distance — used for WAN and inter-building runs."},
      {q:"A corporate WLAN still uses WEP. Correct action?", options:["Upgrade to WPA2 or WPA3 immediately","Enable TKIP","Change channels","Switch to 5 GHz"], answer:0, explanation:"WEP is completely broken and crackable in minutes. Upgrade to WPA2 minimum, WPA3 preferred."},
      {q:"Which cable is required when running network cables through an HVAC air plenum?", options:["Riser cable","Plenum cable","PVC cable","Any Cat6"], answer:1, explanation:"Plenum cable is fire-resistant and low-smoke — required by building codes in air-handling spaces."},
      {q:"Key advantage of WPA3 over WPA2 for personal networks?", options:["Faster speeds","SAE prevents offline dictionary attacks","Uses 5 GHz only","No password needed"], answer:1, explanation:"WPA3 uses SAE which prevents the offline dictionary attacks possible against WPA2-PSK captured 4-way handshakes."},
    ],
  },

  {
    week:5, title:"Network Operations — Monitoring & HA", domain:"Domain 3", color:"#0891b2", xpReward:650,
    lessons:[
      {
        id:"monitoring", title:"SNMP, NetFlow, Syslog & Monitoring", duration:"25 min",
        messerUrl: MESSER.index, messerTitle:"Network Monitoring – N10-009 3.2",
        content:`## SNMP — Simple Network Management Protocol

Monitors and manages network devices. **Port 161** (polling) / **Port 162** (traps).

### SNMP Components

| Component | Role |
|-----------|------|
| NMS (Manager) | Polls agents, receives traps, displays on dashboard |
| Agent | Software on managed device, collects data |
| MIB | Database of manageable objects on a device |
| OID | Unique identifier for each metric |
| Community string | Password in SNMPv1/v2c (plaintext — insecure) |
| Trap | Unsolicited agent → manager alert (port 162) |

### SNMP Versions

| Version | Security | Recommendation |
|---------|---------|----------------|
| v1 | Community strings (plaintext) | Legacy — don't use |
| v2c | Community strings (plaintext) | Still used, still insecure |
| **v3** | Username + auth + encryption | **Use this** |

### NetFlow / sFlow / IPFIX
Collect **flow metadata** — who talked to whom, ports, bytes, duration.
- **NetFlow** — Cisco — most common
- **sFlow** — open standard, sampling-based
- **IPFIX** — open standard based on NetFlow v9

### Syslog — Centralized Logs (Port 514 UDP)

| Level | Name | Meaning |
|-------|------|---------|
| **0** | Emergency | System unusable |
| **1** | Alert | Immediate action needed |
| **2** | Critical | Critical condition |
| **3** | Error | Error condition |
| **4** | Warning | Warning condition |
| **5** | Notice | Normal but significant |
| **6** | Informational | Informational |
| **7** | Debug | Debug messages |

Memory: **"Every Awful Condition Eventually Wrecks Networks In Distress"**

### SIEM
Collects, normalizes, correlates log data from multiple sources.
- Aggregates Syslog, Windows events, firewall logs, IDS alerts
- Detects attack patterns by correlation
- Compliance reporting (PCI-DSS, HIPAA, SOX)
- Examples: Splunk, IBM QRadar, Microsoft Sentinel`,
        practiceQuestions: [
          {
            q: "A network management system (NMS) has not received any status updates from a router in 30 minutes, but the router is still forwarding traffic normally. The NMS is configured with SNMPv2c. What is the MOST likely explanation?",
            options: ["The router has crashed and is operating on cached configurations", "The SNMP community string on the router was changed and no longer matches the NMS", "The router is too busy to respond to SNMP queries", "SNMPv2c does not support router monitoring"],
            answer: 1,
            explanation: "SNMPv2c uses community strings as passwords. If the community string was changed on the router but not updated in the NMS, the NMS's polls will be rejected — appearing as if the router is not responding. Since the router is forwarding traffic normally, it hasn't crashed."
          },
          {
            q: "A security analyst needs to investigate which internal host initiated a large outbound data transfer three days ago. The firewall does not retain full packet captures. Which monitoring data would be MOST helpful?",
            options: ["Syslog messages at severity level 7 (Debug)", "SNMP MIB polling data for interface counters", "NetFlow records showing IP flow metadata", "ICMP ping responses from the host"],
            answer: 2,
            explanation: "NetFlow records capture flow metadata: source IP, destination IP, source port, destination port, bytes transferred, and timestamps — exactly what's needed to identify which host made a large transfer and where the data went."
          },
          {
            q: "A syslog server receives a message with severity level 0. How should the administrator respond?",
            options: ["This is a routine informational message — no action needed", "This is an emergency — the system is unusable and requires immediate attention", "This is a debug message for diagnostic purposes only", "This is a warning — monitor for recurrence"],
            answer: 1,
            explanation: "Syslog severity 0 = Emergency, meaning the system is unusable. This is the most critical level and requires immediate response. The scale runs 0 (Emergency/worst) through 7 (Debug/least severe)."
          },
          {
            q: "A company wants to monitor network device health using SNMP but is concerned about credentials being transmitted in cleartext on the network. Which SNMP version should be deployed?",
            options: ["SNMPv1 — it uses encrypted community strings", "SNMPv2c — it provides better performance than v1", "SNMPv3 — it provides authentication and encryption", "SNMP is inherently insecure; use a VPN instead"],
            answer: 2,
            explanation: "SNMPv3 adds authentication (MD5 or SHA) and encryption (AES or DES) for secure SNMP communication. SNMPv1 and SNMPv2c use community strings transmitted in plaintext — easily captured by any packet sniffer."
          },
          {
            q: "A baseline shows that average WAN utilization is 40% during business hours. The network team receives alerts that utilization has been at 95% for the past two hours. What is the primary value of having the baseline in this scenario?",
            options: ["It proves the current utilization is caused by a DDoS attack", "It provides a reference point for normal behavior, allowing the team to confirm this is anomalous and quantify the deviation", "It automatically throttles the WAN link back to 40%", "It identifies which application is consuming the bandwidth"],
            answer: 1,
            explanation: "A baseline documents normal network behavior. When current metrics deviate significantly (40% → 95%), the baseline confirms this is abnormal — not just high but historically abnormal. Without a baseline, you can't know if 95% is unusual."
          }
        ]
      },
      {
        id:"hadr", title:"High Availability & Disaster Recovery", duration:"20 min",
        messerUrl: MESSER.index, messerTitle:"High Availability / Disaster Recovery – N10-009 3.3",
        content:`## High Availability Concepts

### Load Balancing Algorithms

| Algorithm | How It Works |
|-----------|-------------|
| Round-robin | Each request to next server in sequence |
| Least connections | Send to server with fewest active sessions |
| IP hash | Same client always goes to same server |
| Weighted | More powerful servers get more requests |

### Disaster Recovery Metrics

| Metric | Full Name | Meaning |
|--------|-----------|---------|
| **RTO** | Recovery Time Objective | Max acceptable downtime to restore |
| **RPO** | Recovery Point Objective | Max acceptable data loss (in time) |
| **MTTR** | Mean Time To Repair | Average repair time |
| **MTBF** | Mean Time Between Failures | Average time between failures |

RTO = downtime limit. RPO = data loss limit. Both lower = better but more expensive.

### Backup Types

| Type | What's Backed Up | Backup Speed | Restore Speed |
|------|-----------------|-------------|--------------|
| **Full** | Everything | Slowest | Fastest |
| **Incremental** | Changes since last backup (any type) | Fastest | Slowest |
| **Differential** | Changes since last FULL backup | Medium | Medium |

**Key distinction:**
- Incremental: only what changed since yesterday's incremental (small)
- Differential: everything since last full (grows daily)

### Site Recovery Options

| Site | Description | RTO | Cost |
|------|-------------|-----|------|
| **Hot site** | Fully operational, live data | Minutes | Very high |
| **Warm site** | Infrastructure ready, partial sync | Hours | High |
| **Cold site** | Physical space only | Days/weeks | Low |

### RAID Levels

| Level | Description | Min Drives | Fault Tolerance |
|-------|-------------|-----------|----------------|
| RAID 0 | Striping — no redundancy | 2 | None |
| RAID 1 | Mirroring | 2 | 1 drive |
| RAID 5 | Stripe + distributed parity | 3 | 1 drive |
| RAID 6 | Stripe + double parity | 4 | 2 drives |
| RAID 10 | Stripe of mirrors | 4 | 1 per mirror pair |`,
        practiceQuestions: [
          {
            q: "A hospital's EHR system has an RTO of 1 hour and an RPO of 15 minutes. A ransomware attack encrypts all data at 2:00 PM, and the most recent backup completed at 1:45 PM. The system is restored and online by 2:50 PM. Were both objectives met?",
            options: ["Yes — both RTO and RPO were met", "No — RTO was met (50 min < 1 hour) but RPO was exceeded (15 min of data potentially lost)", "No — RPO was met but RTO was exceeded", "No — neither objective was met"],
            answer: 0,
            explanation: "RTO = max acceptable downtime. System restored in 50 minutes < 1 hour RTO. RPO = max acceptable data loss in time. Backup at 1:45, attack at 2:00 = 15 minutes of potential data loss = exactly at the 15-minute RPO limit."
          },
          {
            q: "A company runs daily full backups on Sunday nights and incremental backups every other night. A failure occurs Thursday morning. Which backup sets are required to restore to Wednesday night's state?",
            options: ["Wednesday's incremental only", "Sunday's full backup + Monday's incremental + Tuesday's incremental + Wednesday's incremental", "Sunday's full backup + Wednesday's incremental only", "Wednesday's full backup"],
            answer: 1,
            explanation: "Incremental backups require the last full backup PLUS every incremental since then. To restore to Wednesday night: Sunday full + Monday incremental + Tuesday incremental + Wednesday incremental."
          },
          {
            q: "A company needs a disaster recovery site that can take over operations within minutes of a failure. The site must have real-time data synchronization. Cost is not the primary concern. Which DR site type is appropriate?",
            options: ["Cold site — lowest cost and sufficient for most scenarios", "Warm site — provides acceptable RTO at moderate cost", "Hot site — fully operational with real-time data replication", "Cloud backup — spins up VMs on demand"],
            answer: 2,
            explanation: "A hot site is a fully operational duplicate of the production environment with real-time or near-real-time data synchronization. Failover can occur in minutes. It is the most expensive DR option but provides the lowest RTO."
          },
          {
            q: "Which RAID level provides the best read/write performance with NO fault tolerance?",
            options: ["RAID 0 — striping without parity", "RAID 1 — mirroring", "RAID 5 — striping with parity", "RAID 10 — stripe of mirrors"],
            answer: 0,
            explanation: "RAID 0 stripes data across multiple disks for maximum performance but provides zero redundancy — if any single disk fails, all data is lost."
          },
          {
            q: "An organization's primary data center fails. The DR team activates the warm site. After 6 hours, services are restored. The DR site had yesterday's backup. What metric describes the 6-hour restoration time?",
            options: ["RPO — Recovery Point Objective", "RTO — Recovery Time Objective", "MTBF — Mean Time Between Failures", "MTTR — Mean Time To Repair"],
            answer: 1,
            explanation: "RTO (Recovery Time Objective) measures how long it takes to restore services after a failure. The 6-hour restoration is the actual recovery time, which should be compared against the organization's defined RTO."
          }
        ]
      },
    ],
    flashcards:[
      {q:"What port does Syslog use?", a:"Port 514 UDP"},
      {q:"What is SNMP used for?", a:"Monitoring and managing network devices — polling (161) and traps (162)"},
      {q:"RTO vs RPO: what's the difference?", a:"RTO = max acceptable downtime. RPO = max acceptable data loss (measured in time)."},
      {q:"Which SNMP version provides encryption?", a:"SNMPv3 — supports MD5/SHA auth and AES/DES encryption"},
      {q:"Which backup type is fastest to restore?", a:"Full backup — everything in one set"},
      {q:"Which backup type uses least storage per day?", a:"Incremental — only backs up changes since last backup of any type"},
      {q:"What is a baseline?", a:"A measurement of normal network performance used to identify anomalies"},
      {q:"What does SIEM do?", a:"Collects and correlates log data from multiple sources to detect threats and support compliance"},
      {q:"What is a hot site?", a:"Fully operational DR site with live data — failover in minutes. Most expensive."},
      {q:"RAID 5 vs RAID 6: fault tolerance?", a:"RAID 5 = tolerate 1 disk failure. RAID 6 = tolerate 2 disk failures."},
      {q:"Syslog severity 0 vs 7?", a:"0 = Emergency (most critical). 7 = Debug (least severe)."},
      {q:"What does MTBF measure?", a:"Mean Time Between Failures — average operating time before a failure. Higher = better."},
    ],
    quiz:[
      {q:"RPO is 30 minutes. What does this mean?", options:["Systems restore in 30 min","Max 30 min of data loss acceptable","Backups run every 2 hours","MTTR is 30 min"], answer:1, explanation:"RPO (Recovery Point Objective) = max acceptable data loss in time. RPO=30 min means backups must run at least every 30 minutes."},
      {q:"Which backup type captures changes since the last FULL backup?", options:["Incremental","Differential","Full","Mirror"], answer:1, explanation:"Differential captures all changes since the last full backup. It grows larger each day but restore only needs full + latest differential."},
      {q:"Which SNMP component sends an unsolicited alert to the NMS?", options:["MIB","OID","Trap (port 162)","Community string"], answer:2, explanation:"SNMP traps are unsolicited device-initiated messages to the NMS on port 162. Port 161 is for manager polling."},
      {q:"Which syslog level indicates the system is unusable?", options:["7 — Debug","4 — Warning","1 — Alert","0 — Emergency"], answer:3, explanation:"Syslog 0 (Emergency) = system unusable. Scale is 0 (worst) to 7 (debug/least severe)."},
      {q:"Which DR site type enables failover in minutes?", options:["Cold site","Warm site","Hot site","Cloud backup"], answer:2, explanation:"Hot site = fully operational duplicate with real-time data replication. Failover in minutes, highest cost."},
      {q:"Admin wants bandwidth utilization and flow data on a Cisco router. Which protocol?", options:["SNMP polling","NetFlow","Syslog","NTP"], answer:1, explanation:"NetFlow captures IP flow metadata (source/dest, ports, bytes, duration) for bandwidth analysis."},
    ],
  },

  {
    week:6, title:"Network Security", domain:"Domain 4", color:"#dc2626", xpReward:650,
    lessons:[
      {
        id:"attacks", title:"Attack Types & Social Engineering", duration:"30 min",
        messerUrl: MESSER.index, messerTitle:"Network Attacks – N10-009 4.2",
        content:`## Network Attack Types — Complete Reference

### DoS / DDoS Attacks

| Attack | Description |
|--------|-------------|
| DoS | Single source overwhelms target |
| DDoS | Botnet of thousands overwhelms target |
| SYN flood | Many SYNs, never complete handshake — exhausts connection table |
| Smurf attack | Spoofs victim IP in ICMP broadcast — all hosts reply to victim |
| Amplification | Small request → huge reply sent to victim (DNS, NTP) |
| Ping flood | Overwhelming ICMP echo requests |

### Man-in-the-Middle (MITM) / On-Path Attacks

| Attack | Mechanism | Mitigation |
|--------|-----------|------------|
| ARP poisoning | Fake ARP replies map attacker MAC to victim IP | Dynamic ARP Inspection, static ARP |
| SSL stripping | Downgrades HTTPS to HTTP | HSTS headers, certificate pinning |
| Evil twin AP | Rogue AP with same SSID | Wireless IDS, certificate-based auth |
| DNS spoofing | Injects false records into DNS cache | DNSSEC, trusted resolvers |

### Switch-Level Attacks

| Attack | Mechanism | Mitigation |
|--------|-----------|------------|
| VLAN hopping (switch spoofing) | Attacker pretends to be a switch → trunk → all VLANs | Disable DTP, manually configure ports |
| VLAN hopping (double tagging) | Two 802.1Q tags — inner tag reaches target VLAN | Change native VLAN from VLAN 1 |
| MAC flooding | Flood CAM table → switch acts like hub | Port security |

### DHCP Attacks

| Attack | Description | Mitigation |
|--------|-------------|------------|
| DHCP starvation | Exhaust IP pool with fake requests | DHCP snooping, rate limiting |
| Rogue DHCP server | Attacker DHCP assigns malicious gateway/DNS | DHCP snooping — trust ports only |

### Social Engineering

| Attack | Description |
|--------|-------------|
| Phishing | Fake emails tricking users into credentials |
| Spear phishing | Targeted phishing at specific person |
| Whaling | Phishing targeting executives |
| Vishing | Voice phishing (phone) |
| Tailgating | Following someone through a secure door |
| Shoulder surfing | Watching someone type credentials |
| Baiting | Infected USB drive left for someone to find |
| Pretexting | False scenario to gain trust |

### Password Attacks

| Attack | Description |
|--------|-------------|
| Brute force | Try every combination |
| Dictionary attack | Try common words |
| Rainbow table | Pre-computed hash lookup |
| Credential stuffing | Use leaked credentials |
| Password spraying | One common password against many accounts |`,
        practiceQuestions: [
          {
            q: "A network administrator runs 'arp -a' and notices that both the default gateway (192.168.1.1) and a file server (192.168.1.50) have the same MAC address. What attack is MOST likely occurring?",
            options: ["MAC flooding", "ARP poisoning", "DHCP starvation", "DNS spoofing"],
            answer: 1,
            explanation: "When multiple IP addresses share the same MAC address in the ARP cache, it indicates ARP poisoning. The attacker has sent fake ARP replies to associate their MAC with the gateway and/or server IP, positioning themselves as a MITM."
          },
          {
            q: "A company receives calls from someone claiming to be IT support asking for login credentials to 'fix an account problem.' What type of attack is this?",
            options: ["Phishing", "Vishing", "Smishing", "Tailgating"],
            answer: 1,
            explanation: "Vishing (voice phishing) uses phone calls to manipulate victims into revealing credentials. Phishing uses email, smishing uses SMS, tailgating involves physical access."
          },
          {
            q: "An attacker performs a DHCP starvation attack followed by setting up a rogue DHCP server. What is the intended outcome?",
            options: ["Prevent all devices from obtaining IP addresses", "Exhaust the legitimate DHCP pool so new clients receive config from the attacker's server, pointing to malicious gateway/DNS", "Capture existing DHCP leases", "Overflow the switch MAC table"],
            answer: 1,
            explanation: "DHCP starvation exhausts the legitimate server's IP pool. When new clients broadcast DHCPDISCOVER, the only server able to respond is the attacker's rogue server, enabling MITM attacks."
          },
          {
            q: "A company's web server is being hit with a massive volume of traffic from thousands of different IP addresses around the world. What type of attack is this?",
            options: ["DoS from a single source", "DDoS using a botnet", "SYN flood", "VLAN hopping"],
            answer: 1,
            explanation: "A DDoS (Distributed Denial of Service) attack originates from many different sources (a botnet). Traffic from 'thousands of different IP addresses' is the distinguishing characteristic."
          },
          {
            q: "Which attack exploits the default Native VLAN configuration on switches to send frames to a VLAN the attacker should not have access to?",
            options: ["MAC flooding", "DHCP starvation", "Double-tagging VLAN hopping", "Switch spoofing VLAN hopping"],
            answer: 2,
            explanation: "Double-tagging VLAN hopping inserts two 802.1Q tags. The outer tag matches the Native VLAN (untagged), gets stripped by the first switch, and the inner tag sends the frame to the target VLAN."
          }
        ]
      },
      {
        id:"hardening", title:"Firewalls, IDS/IPS, AAA & Hardening", duration:"25 min",
        messerUrl: MESSER.index, messerTitle:"Network Security Features – N10-009 4.3",
        content:`## Firewall Types

| Type | OSI Layer | Inspection | Notes |
|------|-----------|-----------|-------|
| Packet filter | 3–4 | Source/dest IP, ports | Stateless, fast |
| Stateful | 3–4 | Connection state (TCP sessions) | Knows established sessions |
| Application/proxy | 7 | Full payload | Deep inspection, slower |
| NGFW | 3–7 | IPS + app ID + user identity | Modern standard |
| WAF | 7 | HTTP/HTTPS content | Protects web apps |

## IDS vs IPS

| | IDS | IPS |
|--|-----|-----|
| Placement | Out of band / SPAN port | Inline — traffic flows through |
| Action | Detect and alert | Detect and block |
| Risk | None | False positives can block legit traffic |

## ACLs — Access Control Lists
- **Standard ACL** — filter by source IP only
- **Extended ACL** — filter by source, destination, protocol, port
- Processed **top-down** — first match wins
- **Implicit deny all** at end of every ACL

## AAA — Authentication, Authorization, Accounting

| Component | Question | Examples |
|-----------|----------|---------|
| Authentication | Who are you? | Username/password, MFA, certificate |
| Authorization | What can you do? | RBAC, permissions |
| Accounting | What did you do? | Logs, audit trail |

## AAA Protocols

| Protocol | Port | Transport | Encrypts | Best For |
|----------|------|-----------|---------|---------|
| **RADIUS** | 1812/1813 | UDP | Password only | Network access (Wi-Fi, VPN) |
| **TACACS+** | 49 | TCP | Entire payload | Device administration |
| Kerberos | 88 | TCP/UDP | Tickets | Active Directory |

## 802.1X — Port-Based Network Access Control
Prevents unauthorized devices from accessing the network.
- **Supplicant** — client device requesting access
- **Authenticator** — switch or AP (forwards auth to RADIUS)
- **Authentication server** — RADIUS validates credentials

## DMZ — Demilitarized Zone
Network segment isolating public-facing servers from internal LAN.
Servers in DMZ reachable from internet, but cannot reach internal LAN directly.

Internet → [Firewall1] → DMZ (web servers) → [Firewall2] → Internal LAN`,
        practiceQuestions: [
          {
            q: "A firewall is configured to allow established TCP sessions to pass without re-checking every packet against the ACL. Which type of firewall is this?",
            options: ["Packet filter firewall — inspects each packet independently", "Stateful inspection firewall — tracks TCP connection state", "Application-layer proxy firewall — intercepts at Layer 7", "Next-generation firewall — uses deep packet inspection"],
            answer: 1,
            explanation: "A stateful inspection firewall maintains a state table of active TCP connections. Once a connection is established, subsequent packets for that connection are allowed through without re-checking every packet against rules."
          },
          {
            q: "A network access control policy requires devices to have antivirus software installed and up-to-date before connecting to the corporate network. Which components implement this?",
            options: ["802.1Q trunking and VLAN segmentation", "802.1X with a RADIUS server performing posture assessment", "TACACS+ device administration", "SNMPv3 with encryption"],
            answer: 1,
            explanation: "802.1X provides port-based NAC using a RADIUS server. Modern implementations include posture assessment — the RADIUS server can verify endpoint compliance (AV status, patch level) before granting access."
          },
          {
            q: "An administrator creates an ACL with: (1) Permit TCP from 10.1.0.0/24 to any on port 443, (2) Permit TCP from 10.1.0.0/24 to any on port 80, (3) Deny all. A host at 10.1.0.50 tries to reach 8.8.8.8 on port 53 (DNS). What happens?",
            options: ["The traffic is permitted by rule 1 (HTTPS)", "The traffic is permitted by rule 2 (HTTP)", "The traffic matches rule 3 and is denied", "The traffic is sent to the next ACL for evaluation"],
            answer: 2,
            explanation: "ACLs are processed top-down, first match wins. The DNS traffic (port 53) does not match rule 1 (port 443) or rule 2 (port 80). It falls through to rule 3 (Deny all) and is dropped."
          },
          {
            q: "What is the key architectural difference between RADIUS and TACACS+ that makes TACACS+ preferred for network device administration?",
            options: ["RADIUS uses TCP while TACACS+ uses UDP", "TACACS+ uses TCP and encrypts the entire payload, and separates authentication, authorization, and accounting into distinct exchanges", "RADIUS supports more authentication methods than TACACS+", "TACACS+ is an open standard while RADIUS is Cisco proprietary"],
            answer: 1,
            explanation: "TACACS+ uses TCP (reliable) and encrypts the ENTIRE payload — not just the password. It also separates AAA into distinct messages, allowing granular per-command authorization. RADIUS uses UDP and only encrypts the password field."
          },
          {
            q: "Which network security principle is applied when a DMZ is created between two firewalls, with internet-facing servers in the DMZ and internal servers behind the second firewall?",
            options: ["Defense in depth — multiple layers of security controls", "Least privilege — minimum access required", "Zero Trust — never trust, always verify", "Air gapping — physical network separation"],
            answer: 0,
            explanation: "A dual-firewall DMZ implements defense in depth — multiple independent security layers. An attacker who compromises the DMZ still faces the inner firewall to reach internal resources."
          }
        ]
      },
    ],
    flashcards:[
      {q:"What is ARP poisoning?", a:"Sending fake ARP replies to associate attacker's MAC with victim's IP — enables MITM attacks"},
      {q:"IDS vs IPS: which blocks traffic?", a:"IPS — inline deployment, actively blocks. IDS is passive/out-of-band, alerts only."},
      {q:"RADIUS ports?", a:"1812 UDP (authentication) and 1813 UDP (accounting)"},
      {q:"TACACS+ port?", a:"Port 49 TCP — encrypts entire payload"},
      {q:"What is a SYN flood?", a:"Sends many TCP SYN packets without completing handshake — exhausts server connection table (DoS)"},
      {q:"RADIUS vs TACACS+: which encrypts everything?", a:"TACACS+ encrypts entire payload. RADIUS only encrypts password."},
      {q:"What is VLAN hopping via double tagging?", a:"Attacker adds two 802.1Q tags — outer stripped by first switch, inner tag reaches target VLAN"},
      {q:"Implicit rule at end of every ACL?", a:"Deny all — any traffic not matching a permit rule is dropped"},
      {q:"What is the supplicant in 802.1X?", a:"The client device requesting network access — sends credentials to the authenticator"},
      {q:"The 3 AAA components?", a:"Authentication (who are you?), Authorization (what can you do?), Accounting (what did you do?)"},
      {q:"What is a DMZ?", a:"Network segment isolating public-facing servers from the internal LAN, typically between two firewalls"},
      {q:"What is DHCP snooping?", a:"Switch security that trusts only specific ports for DHCP replies — prevents rogue DHCP servers"},
    ],
    quiz:[
      {q:"Attacker sends thousands of TCP SYNs to a server without completing handshake. Attack type?", options:["Smurf attack","SYN flood","ARP poisoning","VLAN hopping"], answer:1, explanation:"SYN flood exhausts the server's TCP connection table by never completing the 3-way handshake."},
      {q:"Which firewall inspects Layer 7 application content?", options:["Packet filter","Stateful firewall","NGFW / Application proxy","Standard ACL"], answer:2, explanation:"NGFWs/Application proxies operate at Layer 7 with deep packet inspection, application identification, and user identity."},
      {q:"Admin wants to authenticate wireless users with individual credentials via RADIUS. Which standard?", options:["WPA2-Personal (PSK)","802.1X","802.1Q","WEP"], answer:1, explanation:"802.1X provides port-based NAC using a RADIUS authentication server — this is WPA2/WPA3-Enterprise mode."},
      {q:"Which AAA protocol is preferred for router/switch admin access in Cisco environments?", options:["RADIUS","TACACS+","LDAP","Kerberos"], answer:1, explanation:"TACACS+ uses TCP, encrypts the entire payload, and separates auth/authz/accounting — preferred for device administration."},
      {q:"An attacker leaves an infected USB labeled 'Payroll Q4' in the parking lot. Attack type?", options:["Phishing","Tailgating","Baiting","Pretexting"], answer:2, explanation:"Baiting uses physical media or enticing content to lure victims into executing malware."},
      {q:"Key difference between IDS and IPS placement?", options:["IDS inline, IPS passive","IPS inline, IDS out-of-band/passive","Both always inline","IDS blocks, IPS alerts"], answer:1, explanation:"IPS is inline — traffic flows through it and it can block. IDS is passive via SPAN port — sees traffic but cannot block."},
    ],
  },

  {
    week:7, title:"Network Troubleshooting — Tools & Methodology", domain:"Domain 5", color:"#7c3aed", xpReward:750,
    lessons:[
      {
        id:"method", title:"7-Step Troubleshooting Methodology", duration:"20 min",
        messerUrl: MESSER.method, messerTitle:"Network Troubleshooting Methodology – N10-009 5.1",
        content:`## The CompTIA 7-Step Troubleshooting Methodology

Memorize every step. Expect 2–3 direct questions on this.

### The 7 Steps

| Step | Title | Key Actions |
|------|-------|-------------|
| 1 | **Identify the problem** | Question the user, duplicate the issue, check error messages |
| 2 | **Establish theory of probable cause** | Start simple — OSI bottom-up approach |
| 3 | **Test the theory** | Confirm or eliminate. New theory if wrong. |
| 4 | **Establish a plan of action** | How to fix it. Consider impact and change window. |
| 5 | **Implement the solution or escalate** | Execute fix, or escalate if beyond scope |
| 6 | **Verify full system functionality** | Test fix worked AND nothing else broke |
| 7 | **Document findings** | Record problem, cause, solution, lessons learned |

### Step 1 — Identify the Problem
- Question the user: "What were you doing? When did it start?"
- Can you duplicate the problem?
- What EXACTLY is not working? One user or many?
- What changed in the last 24 hours?

### Step 2 — OSI Bottom-Up Troubleshooting
1. Layer 1: Cable plugged in? Link light on?
2. Layer 2: Correct VLAN? MAC visible?
3. Layer 3: Valid IP? Can ping gateway?
4. Layer 4: Correct port open?
5. Layers 5–7: Application responding?

### Step 3 — Test the Theory
- Change ONE variable at a time
- If confirmed → move to Step 4
- If NOT confirmed → form new theory or escalate

### Step 7 — Document (Most Often Skipped)
The exam loves this step. Always document:
- Problem description
- Root cause
- Solution applied
- Date / time / technician
- Lessons learned

### Common Scenario Map

| Symptom | Cause | First Check |
|---------|-------|------------|
| 169.254.x.x | DHCP failure | ipconfig /release /renew |
| Ping IP works, hostname fails | DNS | nslookup |
| Local works, no internet | Gateway / routing | Check default gateway |
| Slow network | Duplex mismatch | Check interface errors |
| Intermittent drops | Bad cable | Cable test |`,
        practiceQuestions: [
          {
            q: "A technician receives a ticket: 'Users on the 3rd floor cannot print.' During Step 1 (Identify the Problem), the technician discovers only users connected to switch SW-3F-01 are affected, and the issue started after a configuration change this morning. Which information is MOST valuable for Step 2?",
            options: ["The printer model number and ink level", "The configuration change made to SW-3F-01 this morning", "Whether the affected users have the latest Windows updates", "The number of users affected"],
            answer: 1,
            explanation: "When a problem correlates with a recent change, that change is the most likely cause. Step 2 (Establish Theory) should focus on: 'What configuration change was made to SW-3F-01 that could affect printing?'"
          },
          {
            q: "A technician successfully resolves a user's network connectivity issue by renewing their DHCP lease. The ticket is about to be closed. Which step is being skipped if the technician closes the ticket without any additional action?",
            options: ["Step 4 — Establish a plan of action", "Step 5 — Implement the solution", "Step 6 — Verify full system functionality", "Step 7 — Document findings, actions, and outcomes"],
            answer: 3,
            explanation: "Step 7 requires documenting the problem, cause, solution, and lessons learned. Documentation is the most commonly skipped step but is critical for identifying patterns and building a knowledge base."
          },
          {
            q: "A user reports they cannot access internal web applications. The technician confirms the user has an IP address and can ping the default gateway. The user can also reach external websites. What is the NEXT step using OSI bottom-up troubleshooting?",
            options: ["Replace the network cable", "Investigate Layer 7 — check if the internal web server is running or if there's a DNS issue for internal names", "Check the default gateway configuration", "Release and renew the DHCP lease"],
            answer: 1,
            explanation: "The user has an IP (L3 verified), can ping the gateway (L3 verified), and can reach external sites (L3/L4 working). The specific failure is internal web applications — suggesting a DNS issue for internal hostnames or the web application service itself (L7)."
          },
          {
            q: "A technician changes two settings simultaneously to fix a network problem. The problem is resolved. What is the PRIMARY drawback of this approach?",
            options: ["It violates change management procedures", "It is impossible to determine which change fixed the problem, making rollback and future troubleshooting more difficult", "It takes more time than changing one thing at a time", "Both changes are likely to conflict with each other"],
            answer: 1,
            explanation: "Changing one variable at a time is a fundamental troubleshooting principle. If two changes are made simultaneously and the problem is fixed, it's unknown which change actually worked. Rollback also becomes complicated."
          },
          {
            q: "After resolving a major outage, the IT manager asks the technician to perform Step 6. A user reports the network is working. Is Step 6 complete?",
            options: ["Yes — user confirmation is sufficient for Step 6", "No — Step 6 requires verifying the original issue is fixed AND that no new issues were introduced by the fix", "No — Step 6 requires a formal sign-off from management", "Yes — if the original problem is resolved, Step 6 is complete"],
            answer: 1,
            explanation: "Step 6 (Verify full system functionality) requires TWO confirmations: (1) the original problem is resolved, AND (2) no new problems were introduced by the fix. It's possible that fixing one issue broke something else."
          }
        ]
      },
      {
        id:"tools", title:"CLI Tools, Hardware Tools & IOS Commands", duration:"30 min",
        messerUrl: MESSER.index, messerTitle:"Command Line Tools / Hardware Tools – N10-009 5.5",
        content:`## CLI Troubleshooting Commands

### ping
Tests ICMP reachability.
\`\`\`
ping 8.8.8.8          # Test internet
ping 192.168.1.1      # Test gateway
ping 127.0.0.1        # Test loopback
ping -t 8.8.8.8       # Continuous (Windows)
\`\`\`

Request timeout = host down or ICMP blocked
Destination unreachable = no route
TTL expired = routing loop

### tracert / traceroute
Shows hop-by-hop path. Uses ICMP TTL.
\`\`\`
tracert google.com    # Windows
traceroute google.com # Linux/Mac
\`\`\`

Each hop = one router. * * * = router not responding to ICMP (may be fine).

### ipconfig / ip
\`\`\`
ipconfig /all         # Show all IP info (Windows)
ipconfig /release     # Release DHCP lease
ipconfig /renew       # Get new DHCP lease
ipconfig /flushdns    # Clear DNS cache
ip addr show          # Linux
ip route show         # Linux routing table
\`\`\`

### nslookup / dig
Test DNS resolution.
\`\`\`
nslookup google.com           # Basic lookup
nslookup google.com 8.8.8.8   # Use specific DNS
nslookup -type=MX google.com  # MX records
\`\`\`
"Ping IP works, can't ping name" → **nslookup**

### netstat / arp
\`\`\`
netstat -an    # All connections with ports
netstat -r     # Routing table
arp -a         # Show ARP cache (IP → MAC)
\`\`\`

---

## Hardware Tools

| Tool | Tests / Use |
|------|-------------|
| Cable tester | Continuity, pinout, wiremap |
| Tone generator + probe | Trace cable path through walls |
| TDR | Finds exact break location in copper |
| OTDR | Finds break location and loss in fiber |
| Loopback plug | Tests NIC / port functionality |
| Wi-Fi analyzer | Channel usage, signal strength, SSID survey |
| Protocol analyzer (Wireshark) | Full packet capture and analysis |

---

## Basic Cisco IOS Commands (New in N10-009)

| Command | Purpose |
|---------|---------|
| show mac-address-table | View CAM table (learned MACs per port) |
| show arp | View router ARP table |
| show vlan | VLAN assignments on switch |
| show interfaces | Interface status, errors, duplex, speed |
| show ip route | Routing table |
| show running-config | Current device configuration |
| show version | IOS version, uptime, hardware |
| show power | PoE power allocation |
| show cdp neighbors | Discover directly connected Cisco devices |
| show lldp neighbors | Discover directly connected devices (any vendor) |

### CDP vs LLDP

| | CDP | LLDP |
|--|-----|------|
| Standard | Cisco proprietary | IEEE 802.1AB open standard |
| Discovers | Cisco devices only | Any vendor |`
      },
    ],
    flashcards:[
      {q:"First step of CompTIA troubleshooting methodology?", a:"Step 1: Identify the problem"},
      {q:"Last step of the troubleshooting methodology?", a:"Step 7: Document findings, actions, and outcomes"},
      {q:"Can ping IP but not hostname — what's wrong?", a:"DNS resolution failure — use nslookup to diagnose"},
      {q:"Command to release and renew DHCP lease on Windows?", a:"ipconfig /release then ipconfig /renew"},
      {q:"Command to clear local DNS cache on Windows?", a:"ipconfig /flushdns"},
      {q:"What tool shows hop-by-hop packet path?", a:"tracert (Windows) / traceroute (Linux)"},
      {q:"What does 'arp -a' show?", a:"The ARP cache — current mappings of IP addresses to MAC addresses"},
      {q:"What is an OTDR used for?", a:"Testing fiber optic cable — finds breaks, measures distance and loss"},
      {q:"Cisco command to see learned MACs per switch port?", a:"show mac-address-table"},
      {q:"CDP vs LLDP: which is open standard?", a:"LLDP (IEEE 802.1AB) is open standard. CDP is Cisco proprietary."},
      {q:"show interfaces shows what?", a:"Interface status (up/down), errors, CRC counts, duplex, speed, input/output stats"},
      {q:"When troubleshooting, how many variables to change at once?", a:"ONE — changing multiple makes it impossible to know what fixed the issue"},
    ],
    quiz:[
      {q:"User can access local shares but not the internet. First thing to check?", options:["DNS server","Default gateway and routing","DHCP lease","Wi-Fi channel"], answer:1, explanation:"Local access working = L1-L3 to local resources is fine. Default gateway is the path out — check it when internet fails but local works."},
      {q:"Which step ensures the fix didn't cause other problems?", options:["Step 4: Plan","Step 5: Implement","Step 6: Verify full functionality","Step 7: Document"], answer:2, explanation:"Step 6 requires testing the original problem is fixed AND no new problems were introduced."},
      {q:"tracert shows * * * at hop 7 but destination reached at hop 9. What does hop 7 mean?", options:["Problem is at hop 7","Hop 7 not responding to ICMP but forwarding traffic","Routing loop","DNS failure"], answer:1, explanation:"* * * means that router doesn't send ICMP responses — common policy. Since destination was reached, hop 7 is forwarding fine."},
      {q:"Purpose of 'ipconfig /flushdns'?", options:["Releases DHCP IP","Clears local DNS resolver cache","Resets all adapters","Shows routing table"], answer:1, explanation:"Clears the local DNS cache, forcing fresh lookups. Useful when DNS records have recently changed."},
      {q:"Which command shows which MAC addresses are learned on each switch port?", options:["show arp","show ip route","show mac-address-table","show vlan"], answer:2, explanation:"show mac-address-table displays the CAM table — which MAC addresses are learned on each port and VLAN."},
      {q:"Best tool to trace a specific cable run through a wall to find which patch panel port it connects to?", options:["Cable tester","Tone generator and probe","OTDR","Loopback plug"], answer:1, explanation:"A tone generator (on one end) and probe (traced along the path) — fox and hound — traces cable runs through walls."},
    ],
  },

  {
    week:8, title:"Final Review — Cram Sheet & Exam Strategy", domain:"All Domains", color:"#f59e0b", xpReward:1000,
    lessons:[
      {
        id:"cram", title:"Complete N10-009 Cram Sheet", duration:"45 min",
        messerUrl: MESSER.index, messerTitle:"Professor Messer N10-009 Full Course Index",
        content:`## Network+ N10-009 — Complete Cram Sheet

### Exam Facts
- Max questions: 90 (MCQ + PBQ)
- Time: 90 minutes (~1 min per question)
- Passing score: **720 / 900**
- Domain weights: Troubleshooting 24% | Concepts 23% | Implementation 20% | Operations 19% | Security 14%

---

### Critical Port List

| Port | Protocol | Transport |
|------|----------|-----------|
| 20/21 | FTP | TCP |
| 22 | SSH/SCP/SFTP | TCP |
| 23 | Telnet | TCP |
| 25 | SMTP | TCP |
| 49 | TACACS+ | TCP |
| 53 | DNS | UDP (TCP zone transfers) |
| 67/68 | DHCP | UDP |
| 69 | TFTP | UDP |
| 80 | HTTP | TCP |
| 88 | Kerberos | TCP/UDP |
| 110 | POP3 | TCP |
| 123 | NTP | UDP |
| 143 | IMAP | TCP |
| 161 | SNMP | UDP |
| 162 | SNMP Trap | UDP |
| 389 | LDAP | TCP |
| 443 | HTTPS | TCP |
| 445 | SMB | TCP |
| 514 | Syslog | UDP |
| 636 | LDAPS | TCP |
| 993 | IMAPS | TCP |
| 1812/1813 | RADIUS | UDP |
| 3389 | RDP | TCP |
| 5060 | SIP | TCP/UDP |

---

### Subnetting Quick Reference

| CIDR | Subnet Mask | Hosts | Block |
|------|-------------|-------|-------|
| /24 | 255.255.255.0 | 254 | 256 |
| /25 | 255.255.255.128 | 126 | 128 |
| /26 | 255.255.255.192 | 62 | 64 |
| /27 | 255.255.255.224 | 30 | 32 |
| /28 | 255.255.255.240 | 14 | 16 |
| /29 | 255.255.255.248 | 6 | 8 |
| /30 | 255.255.255.252 | 2 | 4 |

Formula: **2^(32 − CIDR) − 2**

---

### Key Comparisons — Exam Loves These

| Comparison | Answer |
|------------|--------|
| Telnet vs SSH | SSH = encrypted (port 22) |
| HTTP vs HTTPS | HTTPS = TLS encrypted (port 443) |
| RADIUS vs TACACS+ | TACACS+ = TCP, encrypts all, device admin |
| IDS vs IPS | IPS = inline, blocks; IDS = passive, alerts |
| HSRP vs VRRP | VRRP = open standard; HSRP = Cisco |
| POP3 vs IMAP | IMAP stays on server, syncs across devices |
| SMF vs MMF fiber | SMF = long distance; MMF = data center |
| STP vs RSTP | RSTP = much faster convergence |
| WPA2 vs WPA3 | WPA3 = SAE, no offline dictionary attacks |

---

### Troubleshooting Quick Map

| See This | Means | Do This |
|----------|-------|---------|
| 169.254.x.x | DHCP server down | ipconfig /release /renew |
| Ping IP ✓, hostname ✗ | DNS failure | nslookup, ipconfig /flushdns |
| Ping gateway ✓, no internet | Routing / NAT | Check ISP, route table |
| Slow network | Duplex mismatch | Check interface errors |
| Wireless drops | Interference / channel overlap | Wi-Fi analyzer, change channel |
| "Destination unreachable" | No route | Check routing table |
| "TTL exceeded" | Routing loop | tracert to find loop |

---

### New N10-009 Topics — Don't Skip

- **SD-WAN** — centralized WAN control, app-aware routing, zero-touch provisioning
- **SASE** — cloud-delivered networking + security (SD-WAN + SSE)
- **Zero Trust** — never trust, always verify — identity-based access
- **VxLAN** — Layer 2 over Layer 3, 16M virtual networks for data centers
- **IaC** — Infrastructure as Code — automate provisioning
- **Wi-Fi 6 (802.11ax)** — OFDMA, BSS coloring, 9.6 Gbps
- **5G/mmWave** — ultra-high speed, short range, line-of-sight
- **LLDP/CDP commands** — show lldp neighbors, show cdp neighbors
- **Basic IOS commands** — show mac-address-table, show arp, show vlan, show power

---

### Exam Day Strategy
1. Read EVERY answer choice before selecting — eliminate clearly wrong ones first
2. Flag hard questions — come back later, never spend 5 min on one
3. On PBQs — attempt every part — partial credit counts, never leave blank
4. Budget ~60 seconds per question — PBQs may take 3–5 min
5. "Best practice / most secure" questions — multiple can seem correct, pick the BEST
6. 720/900 to pass — you need ~80%, not perfection
7. Trust your preparation — second-guessing yourself is the top reason people fail`,
        practiceQuestions: [
          {
            q: "A user reports that after a network change last night, they can access resources by IP address but not by hostname, and their email client shows 'connection refused' on port 993. Which TWO issues are present?",
            options: ["DNS resolution failure and IMAPS (port 993) is blocked", "Default gateway failure and SMTP (port 25) is blocked", "DHCP failure and HTTP (port 80) is blocked", "ARP failure and SSH (port 22) is blocked"],
            answer: 0,
            explanation: "IP works but hostname resolution fails = DNS issue. Email on port 993 refused = IMAPS (encrypted IMAP) is blocked. Two separate issues."
          },
          {
            q: "A company's SD-WAN deployment uses three WAN transports: MPLS, broadband, and LTE. Video conferencing traffic is automatically routed over MPLS due to its low latency, while bulk backups use broadband. What SD-WAN feature enables this?",
            options: ["Zero-touch provisioning", "Application-aware routing", "Centralized policy management", "Dynamic path selection"],
            answer: 1,
            explanation: "Application-aware routing identifies applications and routes them over the most appropriate WAN link based on predefined policies. This is a core SD-WAN differentiator."
          },
          {
            q: "During an incident response, a security analyst discovers that an attacker moved laterally from a compromised workstation to a file server, then to a domain controller — all within the same flat network. Which architectural change would MOST effectively prevent this in the future?",
            options: ["Deploy WPA3 on all wireless access points", "Implement network segmentation with VLANs and firewall rules between segments", "Enable SNMP traps on all switches", "Upgrade all switches to support RSTP"],
            answer: 1,
            explanation: "A flat network allows unrestricted lateral movement. Segmentation with VLANs and firewall/ACL rules between segments limits what a compromised device can reach."
          },
          {
            q: "An administrator configures SNMPv3 with AuthPriv mode. What does this provide?",
            options: ["Authentication only — messages are verified but not encrypted", "Authentication AND encryption — messages are verified and the payload is encrypted", "No security — same as SNMPv1", "Encryption only — messages are encrypted but the sender is not verified"],
            answer: 1,
            explanation: "SNMPv3 AuthPriv (Authentication + Privacy) provides both MD5/SHA authentication and AES/DES encryption for the highest security level."
          },
          {
            q: "A network engineer is asked to provide exactly 30 subnets from the 10.10.0.0/16 network, with each subnet supporting at least 500 hosts. Which CIDR prefix satisfies both requirements?",
            options: ["/21 — 2046 hosts, 32 possible subnets", "/22 — 1022 hosts, 64 possible subnets", "/23 — 510 hosts, 128 possible subnets", "/24 — 254 hosts — insufficient hosts per subnet"],
            answer: 0,
            explanation: "/21 from a /16 borrows 5 bits (2^5=32 subnets ≥ 30 required), leaving 11 host bits (2^11-2=2046 hosts ≥ 500 required)."
          }
        ]
      },
    ],
    flashcards:[
      {q:"Passing score for N10-009?", a:"720 on a scale of 100–900"},
      {q:"Max questions on N10-009?", a:"90 questions in 90 minutes"},
      {q:"Highest-weighted domain on N10-009?", a:"Domain 5: Network Troubleshooting at 24%"},
      {q:"What is SD-WAN?", a:"Software-Defined WAN — centralized policy, app-aware routing across distributed WAN connections"},
      {q:"What is VxLAN?", a:"Virtual Extensible LAN — extends L2 over L3, 16M virtual networks, solves 4094 VLAN limit"},
      {q:"What is SASE?", a:"Secure Access Service Edge — cloud-delivered SD-WAN + security functions (ZTNA, SWG, CASB)"},
      {q:"What is IaC?", a:"Infrastructure as Code — use code/scripts to provision and configure infrastructure automatically"},
      {q:"Five exam domains and weights?", a:"Troubleshooting 24% | Concepts 23% | Implementation 20% | Operations 19% | Security 14%"},
      {q:"Subnet host formula?", a:"2^(host bits) − 2 = usable hosts"},
      {q:"TACACS+ port and protocol?", a:"Port 49 TCP — encrypts entire session"},
      {q:"What does DNSSEC provide?", a:"Digital signatures on DNS records to prevent tampering and DNS poisoning"},
      {q:"WPA2 vs WPA3 key authentication difference?", a:"WPA3 uses SAE instead of PSK — prevents offline dictionary attacks against captured handshakes"},
    ],
    quiz:[
      {q:"Company needs cloud-delivered security with zero-trust access, SWG, and SD-WAN. What architecture?", options:["DMZ with NGFW","SASE","Traditional MPLS VPN","802.1X with RADIUS"], answer:1, explanation:"SASE combines networking (SD-WAN) and security (ZTNA, SWG, CASB, FWaaS) delivered as a cloud service."},
      {q:"How many usable hosts in a /29 subnet?", options:["6","8","14","30"], answer:0, explanation:"/29 = 3 host bits. 2^3 = 8 − 2 = 6 usable hosts."},
      {q:"Which model requires continuous auth for every user/device regardless of network location?", options:["DMZ","Zero Trust","NAC with 802.1X","Perimeter security"], answer:1, explanation:"Zero Trust follows 'never trust, always verify' — no implicit trust based on being inside the corporate network."},
      {q:"Max questions and time on N10-009?", options:["75 questions, 75 min","90 questions, 90 min","100 questions, 120 min","85 questions, 90 min"], answer:1, explanation:"N10-009 = maximum 90 questions in 90 minutes — approximately 1 minute per question budget."},
      {q:"What SD-WAN feature lets new branch offices configure automatically without manual setup?", options:["App-aware routing","Zero-touch provisioning","Centralized policy management","Dynamic path selection"], answer:1, explanation:"Zero-touch provisioning (ZTP) allows new SD-WAN branch devices to automatically download configuration from the controller."},
      {q:"After replacing a fiber cable, signals are intermittent. Which tool finds the precise fault location?", options:["Cable tester","Tone generator","OTDR","Light meter"], answer:2, explanation:"An OTDR (Optical Time Domain Reflectometer) sends a light pulse and measures reflections to pinpoint breaks in fiber cable."},
    ],
  },
];

const LESSON_EXAMPLES = {
  osi: `### More Examples
- **Layer 1 example:** A user has no link light. Swap the patch cable, try a known-good switch port, and check the NIC status.
- **Layer 2 example:** The device has link, but cannot reach anything in its VLAN. Check VLAN assignment, trunk tagging, MAC table entries, and STP blocking state.
- **Layer 3 example:** The host can reach local devices but not another subnet. Check IP address, subnet mask, default gateway, and route table.
- **Layer 4 example:** Ping works, but the web app does not load. Test TCP 443 with a port test and check firewall rules.
- **Layer 7 example:** The web server answers on port 443, but users see an application error. Check the app logs, DNS name, TLS certificate, and backend service.

### Walkthrough Scenario
A laptop says "connected" to Wi-Fi but cannot open websites.
1. Layer 1: Confirm wireless radio is enabled and signal is strong.
2. Layer 2: Confirm it joined the correct SSID and VLAN.
3. Layer 3: Confirm it has a valid IP, mask, gateway, and DNS server.
4. Layer 4: Confirm outbound TCP 443 is allowed.
5. Layer 7: Try a different browser and verify DNS names resolve.`,

  tcp: `### More Examples
- **TCP example:** Loading an HTTPS page uses TCP because the browser needs ordered, reliable delivery.
- **UDP example:** A voice call uses UDP because late packets are not useful; it is better to drop a packet than pause the conversation.
- **ICMP example:** Ping proves Layer 3 reachability, but it does not prove a TCP application port is open.

### Packet Flow Example
Client 10.1.1.50 opens HTTPS to 203.0.113.10.
1. Client picks an ephemeral source port, such as 51544.
2. Destination is TCP 443.
3. TCP handshake completes with SYN, SYN-ACK, ACK.
4. TLS negotiation starts after TCP is established.

### Exam Pattern
If the question says "reliable", "ordered", "acknowledgment", or "three-way handshake", choose TCP.
If it says "low latency", "streaming", "VoIP", "DHCP", or "broadcast", UDP is usually involved.`,

  ports: `### More Examples
- **DNS failure:** User can ping 8.8.8.8 but cannot browse to example.com. That points to DNS, usually UDP/TCP 53.
- **Remote access choice:** Use SSH on TCP 22 for Linux/network devices. Use RDP on TCP 3389 for Windows desktops.
- **AAA choice:** RADIUS uses UDP 1812/1813 for network access. TACACS+ uses TCP 49 and is common for device administration.
- **File sharing:** SMB on TCP 445 is common for Windows shares and domain file access.

### Firewall Rule Examples
| Need | Allow |
|------|-------|
| Secure web browsing | TCP 443 outbound |
| DNS lookups | UDP 53 outbound, TCP 53 when needed |
| NTP time sync | UDP 123 outbound |
| Syslog forwarding | UDP 514 to log collector |
| RDP admin access | TCP 3389 from admin subnet only |

### Quick Memory Hooks
- 22 is SSH because "two secure shells".
- 53 is DNS because DNS names are "for me".
- 443 is secure web.
- 3389 is Windows Remote Desktop.`,

  devices: `### More Examples
- **Switch:** A 48-port access switch connects user PCs and learns MAC addresses per port.
- **Router:** A branch router forwards traffic between the LAN, WAN, and internet provider.
- **Firewall:** A perimeter firewall allows outbound web traffic and blocks unsolicited inbound sessions.
- **Load balancer:** A VIP sends HTTPS traffic to several backend web servers.
- **Proxy:** A forward proxy filters user web requests and logs destination URLs.
- **IDS/IPS:** IDS watches and alerts. IPS sits inline and can block.

### Design Example
A small office needs wired users, Wi-Fi, internet, and guest isolation.
1. Access switch for desks and AP uplinks.
2. Wireless APs mapped to employee and guest SSIDs.
3. Router/firewall as the default gateway.
4. Separate guest VLAN with internet-only firewall rules.

### Exam Trap
"Which device separates broadcast domains?" Router or Layer 3 switch.
"Which device separates collision domains?" Switch.`,

  ipv4: `### More Examples
- **/24:** 256 addresses, 254 usable hosts, common small LAN.
- **/25:** Splits a /24 into two subnets of 126 usable hosts each.
- **/26:** Splits a /24 into four subnets of 62 usable hosts each.
- **/30:** Two usable addresses, historically common for point-to-point links.

### Worked Example
Network: 192.168.10.0/26
- Block size: 64
- Subnets: 192.168.10.0, .64, .128, .192
- First subnet usable range: 192.168.10.1 - 192.168.10.62
- Broadcast: 192.168.10.63

### Troubleshooting Example
Host: 192.168.10.70/26, Gateway: 192.168.10.1
This is wrong because .70 is in the 192.168.10.64/26 subnet, but .1 is in the 192.168.10.0/26 subnet. The gateway must be in the same subnet as the host.`,

  dns: `### More Examples
- **A record:** app.example.com -> 192.0.2.25
- **AAAA record:** app.example.com -> 2001:db8::25
- **CNAME:** www.example.com -> app.example.com
- **MX:** Mail for example.com goes to mail.example.com.
- **PTR:** 192.0.2.25 resolves back to app.example.com.
- **TXT:** SPF, DKIM, DMARC, and verification records.

### DHCP Example
A client joining the network uses DORA:
1. Discover: client broadcasts looking for DHCP.
2. Offer: server offers an address.
3. Request: client requests that address.
4. Acknowledge: server confirms the lease.

### Troubleshooting Example
If a client has 169.254.x.x, it did not receive DHCP. Check switch VLAN, DHCP relay, DHCP scope exhaustion, and server reachability.`,

  cloud: `### More Examples
- **SaaS:** Microsoft 365, Gmail, Salesforce. You manage users and data, not the servers.
- **PaaS:** App platform where developers deploy code without managing the OS.
- **IaaS:** Cloud VMs, virtual networks, firewalls, and disks that your team configures.
- **Private cloud:** Internal virtualization cluster for company workloads.
- **Hybrid cloud:** On-prem data center connected to public cloud through VPN or direct connect.

### Responsibility Example
If a cloud VM is compromised because the guest OS was not patched, that is usually the customer's responsibility in IaaS.
If the SaaS provider's mail platform is down globally, that is the provider's responsibility.

### SD-WAN Example
A branch sends voice traffic over the low-latency fiber circuit and bulk backup traffic over broadband using app-aware policies.`,

  vlans: `### More Examples
- **Access port:** Carries one VLAN to an endpoint, such as VLAN 20 for a user PC.
- **Trunk port:** Carries multiple tagged VLANs between switches or from switch to firewall.
- **Native VLAN:** Untagged traffic on an 802.1Q trunk. Best practice is to set it to an unused VLAN.
- **Voice VLAN:** Phone and PC share one wall jack, but voice and data are separated logically.

### VLAN Design Example
| VLAN | Purpose | Example Subnet |
|------|---------|----------------|
| 10 | Management | 10.10.10.0/24 |
| 20 | Users | 10.10.20.0/24 |
| 30 | Voice | 10.10.30.0/24 |
| 40 | Guests | 10.10.40.0/24 |

### Troubleshooting Example
Two users on the same switch cannot communicate. Confirm they are in the same VLAN, the ports are not err-disabled, and no port security rule is blocking one MAC address.`,

  routing: `### More Examples
- **Connected route:** Automatically appears when an interface has an IP and is up.
- **Static route:** Manually configured, predictable, but does not adapt unless tracked.
- **Default route:** 0.0.0.0/0, used when no more-specific route exists.
- **Dynamic route:** Learned through protocols such as OSPF or BGP.

### Route Selection Example
If a router has these routes:
| Route | Meaning |
|-------|---------|
| 10.10.0.0/16 | Broad route |
| 10.10.20.0/24 | More specific |
| 0.0.0.0/0 | Default |

Traffic to 10.10.20.50 uses 10.10.20.0/24 because longest prefix match wins.

### Troubleshooting Example
If traffic reaches the destination but replies never return, check the return route. Routing must work both directions.`,

  wireless: `### More Examples
- **2.4 GHz:** Better range, more interference, only three non-overlapping channels in many regions.
- **5 GHz:** Shorter range, more channels, usually better performance.
- **6 GHz:** Newer Wi-Fi 6E/7 spectrum, less crowded, shorter range.
- **Roaming issue:** Client sticks to a weak AP instead of moving to a stronger AP.
- **Interference issue:** Microwave, Bluetooth, neighboring APs, or channel overlap.

### Channel Example
In 2.4 GHz, use channels 1, 6, and 11 to avoid overlap. Do not place adjacent APs on the same channel if you can avoid it.

### Security Example
Use WPA3-Personal at home when supported. In enterprise, use WPA2/WPA3-Enterprise with 802.1X and RADIUS.`,

  cabling: `### More Examples
- **Cat 5e:** Common for 1 Gbps copper.
- **Cat 6:** Better performance and less crosstalk than Cat 5e.
- **Cat 6A:** Common for 10 Gbps up to 100 meters.
- **Multimode fiber:** Shorter distance, common inside data centers.
- **Single-mode fiber:** Long distance, common between buildings or provider links.

### Connector Examples
| Connector | Use |
|-----------|-----|
| RJ45 | Twisted-pair Ethernet |
| LC | Common fiber connector in modern switches |
| SC | Older/larger fiber connector |
| F-type | Coax cable |

### Troubleshooting Example
A copper link negotiates at 100 Mbps instead of 1 Gbps. Check cable category, damaged pairs, bad termination, and switch port negotiation.`,

  monitoring: `### More Examples
- **SNMP polling:** NMS asks a switch for interface counters every 5 minutes.
- **SNMP trap:** Switch immediately tells the NMS that a power supply failed.
- **Syslog:** Devices send logs to a central server for search and retention.
- **NetFlow:** Summarizes who talked to whom, on what ports, and how much traffic moved.
- **Packet capture:** Deepest detail, but more storage and analysis effort.

### Alert Example
Interface errors increase on a switch port.
1. Check CRC errors, drops, and speed/duplex.
2. Replace patch cable.
3. Move to another switch port.
4. Check endpoint NIC drivers or hardware.

### Baseline Example
If WAN utilization is normally 35 percent and suddenly stays at 92 percent, that is meaningful because you have a known baseline.`,

  hadr: `### More Examples
- **UPS:** Keeps equipment online during short power loss.
- **Generator:** Longer-term power continuity.
- **NIC teaming:** Multiple NICs act as one logical connection.
- **VRRP/HSRP:** Default gateway redundancy for hosts.
- **Load balancing:** Spreads traffic across multiple servers.
- **Backup:** Copy of data.
- **Replication:** Data copied continuously or on a schedule to another system.

### RTO/RPO Example
RTO is how long you can be down. RPO is how much data you can lose.
If RTO is 1 hour and RPO is 15 minutes, systems must recover within 1 hour and backups/replication must lose no more than 15 minutes of data.

### Design Example
Two internet circuits from different providers reduce the chance that one provider outage takes the site offline.`,

  attacks: `### More Examples
- **DoS:** One attacker overwhelms a service.
- **DDoS:** Many systems overwhelm a service at once.
- **VLAN hopping:** Attacker abuses trunking or double tagging to reach another VLAN.
- **ARP poisoning:** Attacker tricks hosts into sending traffic through them.
- **DNS poisoning:** Victims resolve a name to the attacker's IP.
- **Evil twin:** Fake Wi-Fi AP impersonates a legitimate SSID.
- **Phishing:** Social engineering through email or messages.

### Scenario Example
Users connect to "Company-WiFi" in a lobby and get a certificate warning. That could be an evil twin. Verify BSSID, disable auto-join, and use enterprise authentication with certificate validation.

### Exam Tip
If the attack manipulates people, think social engineering. If it manipulates name resolution, think DNS. If it manipulates local MAC/IP mapping, think ARP.`,

  hardening: `### More Examples
- Disable unused switch ports and place them in an unused VLAN.
- Change default credentials on every appliance.
- Use MFA for remote access and admin portals.
- Use least privilege for firewall, cloud, and directory roles.
- Keep firmware and OS patches current.
- Restrict management access to a management subnet or VPN.
- Use secure protocols: SSH, HTTPS, SNMPv3, LDAPS.

### Firewall Example
Allow internet users to TCP 443 on the public web server. Do not allow direct inbound access to database servers. Permit the web server to talk to the database only on the required database port.

### AAA Example
Authentication proves who you are. Authorization defines what you can do. Accounting records what you did.`,

  method: `### More Examples
Use the troubleshooting method when the answer choices all seem plausible. The exam often asks for the NEXT step, not the final fix.

### Scenario Walkthrough
Problem: Users in one office report intermittent internet drops.
1. Identify: Interview users, determine affected area, check when it started.
2. Theory: Possible bad WAN circuit, switch uplink errors, DHCP issue, or DNS issue.
3. Test: Check interface counters, ping gateway, test DNS, review ISP circuit status.
4. Plan: Replace suspect patch cable or fail over WAN during maintenance window.
5. Implement: Make the approved change.
6. Verify: Confirm users can browse and monitoring is clean.
7. Document: Record root cause, fix, date, and prevention.

### Exam Trap
If you have not gathered symptoms yet, do not jump straight to replacing hardware.`,

  tools: `### More Examples
- **ping:** Basic Layer 3 reachability.
- **traceroute/tracert:** Path and hop where traffic stops.
- **nslookup/dig:** DNS query testing.
- **ipconfig/ifconfig/ip:** Local IP settings.
- **netstat/ss:** Listening ports and active sessions.
- **arp:** Local IP-to-MAC cache.
- **tcpdump/Wireshark:** Packet-level proof.
- **toner/probe:** Find cable path in a bundle.
- **cable tester:** Verify pinout, opens, shorts, and split pairs.

### Command Example Flow
1. ipconfig /all - confirm IP, gateway, DNS.
2. ping gateway - confirm local subnet.
3. ping 8.8.8.8 - confirm internet routing.
4. nslookup example.com - confirm DNS.
5. tracert example.com - locate the failing hop.

### Tool Choice Tip
Use a cable tester for copper wiring faults. Use an OTDR for fiber faults.`,

  cram: `### More Examples
### Final Practice Prompts
- A user has 169.254.10.20. What failed? DHCP.
- DNS works for internal names but not internet names. What should you check? Forwarders or recursive DNS path.
- HTTPS site loads by IP but not by name. What should you check? DNS record or resolver.
- Same VLAN devices cannot communicate. What should you check first? Switch port status, VLAN assignment, and local firewall.
- Different VLAN devices cannot communicate. What should you check first? Default gateway, routing, and ACLs.
- Video calls are choppy but web browsing works. What should you check? QoS, latency, jitter, packet loss, and bandwidth.

### Last-Mile Exam Examples
| Symptom | Likely Area |
|---------|-------------|
| Link light off | Layer 1 |
| Wrong VLAN | Layer 2 |
| Wrong default gateway | Layer 3 |
| Blocked TCP 443 | Layer 4 |
| Bad TLS certificate | Layer 6/7 |
| Login denied by policy | AAA/IAM |`
};

// ─────────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────────
const KEY = "netplus_v3";
const emptyProgress = () => ({ xp:0, streak:0, completedLessons:[], quizScores:{}, flashcardCount:0, subnetSolved:0, badges:[] });
function load() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch { return emptyProgress(); }
  return emptyProgress();
}
function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); return true; } catch { return false; } }

// ─────────────────────────────────────────────
// SUBNET CALC
// ─────────────────────────────────────────────
function calcSubnet(ip, cidr) {
  const bits = parseInt(cidr);
  if (isNaN(bits) || bits < 1 || bits > 32) return null;
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some(x => isNaN(x) || x < 0 || x > 255)) return null;
  const mask = bits === 32 ? 0xFFFFFFFF : (~0 << (32 - bits)) >>> 0;
  const ipInt = ((parts[0]<<24)|(parts[1]<<16)|(parts[2]<<8)|parts[3]) >>> 0;
  const net = (ipInt & mask) >>> 0;
  const bc  = (net | (~mask >>> 0)) >>> 0;
  const hosts = Math.max(0, bc - net - 1);
  const oct = n => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".");
  return { network:oct(net), broadcast:oct(bc), mask:oct(mask),
           first:hosts>0?oct(net+1):"N/A", last:hosts>0?oct(bc-1):"N/A", hosts, cidr:bits };
}

// ─────────────────────────────────────────────
// MARKDOWN RENDERER
// ─────────────────────────────────────────────
function MD({ text }) {
  const lines = text.trim().split("\n");
  const out = [];
  let tRows=[], inTable=false, inCode=false, cLines=[], k=0;

  const flushTable = () => {
    if (!tRows.length) return;
    out.push(
      <div style={{overflowX:"auto",margin:"14px 0"}} key={k++}>
        <table style={{borderCollapse:"collapse",width:"100%"}}>
          <tbody>
            {tRows.map((row,ri) => (
              <tr key={ri} style={ri===0?{background:"#1a2035"}:{}}>
                {row.map((c,ci) => ri===0
                  ? <th key={ci} style={{border:"1px solid #1e2535",padding:"8px 14px",color:"#00d4ff",textAlign:"left",fontSize:13,fontWeight:700}}><Inline text={c}/></th>
                  : <td key={ci} style={{border:"1px solid #1e2535",padding:"8px 14px",color:"#d1d5db",fontSize:13}}><Inline text={c}/></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tRows=[]; inTable=false;
  };

  const flushCode = () => {
    if (!cLines.length) return;
    out.push(<pre key={k++} style={{background:"#0d1117",border:"1px solid #1e2535",borderRadius:8,padding:"16px",overflowX:"auto",fontSize:13,color:"#e2e8f0",margin:"12px 0",lineHeight:1.6,fontFamily:"monospace"}}>{cLines.join("\n")}</pre>);
    cLines=[]; inCode=false;
  };

  lines.forEach(line => {
    if (line.trimStart().startsWith("```")) {
      if (inCode) flushCode(); else { if(inTable)flushTable(); inCode=true; } return;
    }
    if (inCode) { cLines.push(line); return; }
    if (line.startsWith("|")) {
      if (/^\|[-| :]+\|$/.test(line.trim())) return;
      inTable=true;
      tRows.push(line.split("|").slice(1,-1).map(c=>c.trim()));
      return;
    }
    if (inTable) flushTable();

    if (line.startsWith("## ")) out.push(<h2 key={k++} style={{fontSize:20,fontWeight:800,color:"#00d4ff",marginTop:24,marginBottom:12}}>{line.slice(3)}</h2>);
    else if (line.startsWith("### ")) out.push(<h3 key={k++} style={{fontSize:16,fontWeight:700,color:"#e2e8f0",marginTop:18,marginBottom:8}}>{line.slice(4)}</h3>);
    else if (/^\d+\. /.test(line)) {
      const num = line.match(/^(\d+)\. /)[1];
      out.push(<div key={k++} style={{display:"flex",gap:10,margin:"4px 0",color:"#d1d5db",fontSize:15}}>
        <span style={{color:"#00d4ff",fontWeight:700,minWidth:20}}>{num}.</span>
        <span><Inline text={line.replace(/^\d+\. /,"")}/></span>
      </div>);
    }
    else if (line.startsWith("- ")) out.push(<div key={k++} style={{display:"flex",gap:10,margin:"3px 0",color:"#d1d5db",fontSize:15}}><span style={{color:"#00d4ff"}}>•</span><span><Inline text={line.slice(2)}/></span></div>);
    else if (line.trim() === "") out.push(<div key={k++} style={{height:6}}/>);
    else if (line.startsWith("---")) out.push(<hr key={k++} style={{border:"none",borderTop:"1px solid #1e2535",margin:"20px 0"}}/>);
    else out.push(<p key={k++} style={{color:"#d1d5db",margin:"5px 0",fontSize:15,lineHeight:1.7}}><Inline text={line}/></p>);
  });
  if (inTable) flushTable();
  if (inCode) flushCode();
  return <>{out}</>;
}

function Inline({ text }) {
  const parts = (text||"").split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return <>{parts.map((p,i) => {
    if (p.startsWith("**")&&p.endsWith("**")) return <strong key={i} style={{color:"#00d4ff"}}>{p.slice(2,-2)}</strong>;
    if (p.startsWith("`")&&p.endsWith("`")) return <code key={i} style={{background:"#1e2535",borderRadius:4,padding:"1px 6px",fontSize:13,color:"#00d4ff"}}>{p.slice(1,-1)}</code>;
    return p;
  })}</>;
}


export default function App() {
  const [progress, setProgress] = useState(load);
  const [screen, setScreen] = useState("dashboard");   // top-level nav
  const [weekIdx, setWeekIdx]   = useState(null);       // which week selected
  const [subscreen, setSubscreen] = useState(null);     // "lesson"|"quiz"|"flash"
  const [lessonIdx, setLessonIdx] = useState(null);
  const [notif, setNotif] = useState(null);
  const startTimeRef = useRef(null);

  // ── helpers ──────────────────────────────────
  const upd = useCallback(fn => {
    setProgress(p => { const n = fn(p); save(n); return n; });
  }, []);

  const toast = useCallback((msg, type="xp") => {
    setNotif({msg,type});
    setTimeout(()=>setNotif(null),2800);
  },[]);

  const awardXP = useCallback((amt, why) => {
    upd(p => ({...p, xp: p.xp+amt}));
    toast(`+${amt} XP — ${why}`, "xp");
  },[upd,toast]);

  const badge = useCallback(id => {
    upd(p => {
      if (p.badges.includes(id)) return p;
      const b = BADGES.find(x=>x.id===id);
      toast(`🎖️ Medal Unlocked: ${b?.name}`, "badge");
      return {...p, badges:[...p.badges,id]};
    });
  },[upd,toast]);

  // ── navigation ───────────────────────────────
  const goNav = v => { setScreen(v); setWeekIdx(null); setSubscreen(null); setLessonIdx(null); };
  const goWeek = i => { setWeekIdx(i); setSubscreen(null); setLessonIdx(null); };
  const goLesson = i => { setLessonIdx(i); setSubscreen("lesson"); };
  const goQuiz  = () => { startTimeRef.current=Date.now(); setSubscreen("quiz"); };
  const goFlash = () => { setSubscreen("flash"); };
  const goBack  = () => {
    if (subscreen) { setSubscreen(null); setLessonIdx(null); }
    else if (weekIdx !== null) { setWeekIdx(null); }
    else goNav("dashboard");
  };

  // ── lesson complete ───────────────────────────
  const completeLesson = () => {
    const key = `${weekIdx}-${WEEKS[weekIdx].lessons[lessonIdx].id}`;
    upd(p => {
      if (p.completedLessons.includes(key)) return p;
      const done = [...p.completedLessons, key];
      const allWeekDone = WEEKS[weekIdx].lessons.every(l => done.includes(`${weekIdx}-${l.id}`));
      let extra = 0;
      if (allWeekDone) extra = WEEKS[weekIdx].xpReward;
      return {...p, completedLessons:done, xp: p.xp+150+extra};
    });
    toast("+150 XP — Lesson complete", "xp");
    // check badges using current saved progress snapshot
    setProgress(p => {
      const done = p.completedLessons;
      if (done.length === 0) badge("first_lesson");
      const allW0 = WEEKS[0].lessons.every(l=>done.includes(`0-${l.id}`)||l.id===WEEKS[weekIdx]?.lessons[lessonIdx]?.id);
      if (weekIdx===0 && allW0) badge("week1_done");
      const allW3 = WEEKS.slice(0,4).every((w,wi)=>w.lessons.every(l=>done.includes(`${wi}-${l.id}`)));
      if (allW3) badge("halfway");
      const allAll = WEEKS.every((w,wi)=>w.lessons.every(l=>done.includes(`${wi}-${l.id}`)));
      if (allAll) badge("all_done");
      return p;
    });
    setSubscreen(null); setLessonIdx(null);
  };

  // ── quiz complete ─────────────────────────────
  const completeQuiz = (score, total) => {
    upd(p => ({...p, quizScores:{...p.quizScores,[weekIdx]:score}}));
    awardXP(score*75, "Quiz complete");
    if (score===total) badge("quiz_perfect");
    if (startTimeRef.current && (Date.now()-startTimeRef.current)<180000) badge("speed_demon");
    setSubscreen(null);
  };

  // ── flashcard XP ──────────────────────────────
  const flashXP = useCallback(() => {
    upd(p => {
      const n = (p.flashcardCount||0)+1;
      if (n===50) badge("flashcard_50");
      if (n===100) badge("flashcard_100");
      return {...p, flashcardCount:n, xp:p.xp+10};
    });
  },[upd,badge]);

  // ── subnet XP ────────────────────────────────
  const subnetXP = useCallback(() => {
    upd(p => {
      const n = (p.subnetSolved||0)+1;
      if (n>=10) badge("subnet_master");
      return {...p, subnetSolved:n, xp:p.xp+75};
    });
    toast("+75 XP — Subnet solved", "xp");
  },[upd,badge,toast]);

  // ── derived ───────────────────────────────────
  const totalLessons = WEEKS.reduce((s,w)=>s+w.lessons.length,0);
  const doneLessons  = progress.completedLessons.length;
  const pct = Math.round((doneLessons/totalLessons)*100);

  // ── what to render ────────────────────────────
  const inWeeks = screen==="weeks";
  const showWeekList   = inWeeks && weekIdx===null;
  const showWeekDetail = inWeeks && weekIdx!==null && subscreen===null;
  const showLesson     = inWeeks && subscreen==="lesson" && lessonIdx!==null;
  const showQuiz       = inWeeks && subscreen==="quiz";
  const showFlash      = inWeeks && subscreen==="flash";

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0f1117",color:"#e2e8f0",fontFamily:"'DM Mono','Courier New',monospace"}}>
      <style>{`
        *{box-sizing:border-box;} body{margin:0;}
        @keyframes slideIn{from{transform:translateX(60px);opacity:0}to{transform:translateX(0);opacity:1}}
        button:hover{opacity:.87;cursor:pointer;}
        a:hover{opacity:.8;}
        ::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:#0f1117;}
        ::-webkit-scrollbar-thumb{background:#374151;border-radius:3px;}
      `}</style>

      {notif && (
        <div style={{position:"fixed",top:20,right:20,borderRadius:10,padding:"12px 24px",
          background:notif.type==="badge"?"#7c3aed":"#059669",color:"#fff",fontWeight:700,
          zIndex:9999,fontSize:15,boxShadow:"0 4px 20px rgba(0,0,0,.4)",animation:"slideIn .3s ease"}}>
          {notif.msg}
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{width:220,background:"#131720",borderRight:"1px solid #1e2535",
        display:"flex",flexDirection:"column",padding:"24px 0",position:"sticky",top:0,
        height:"100vh",overflowY:"auto",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 20px 24px",borderBottom:"1px solid #1e2535"}}>
          <span style={{color:"#00d4ff",fontSize:22}}>⚡</span>
          <span style={{fontSize:22,fontWeight:900,letterSpacing:2}}>NET<span style={{color:"#00d4ff"}}>+</span></span>
        </div>
        <div style={{margin:"20px 16px 8px",background:"#1a2035",borderRadius:10,padding:"12px 16px",border:"1px solid #00d4ff33"}}>
          <div style={{fontSize:10,color:"#6b7280",letterSpacing:2}}>TOTAL XP</div>
          <div style={{fontSize:26,fontWeight:900,color:"#00d4ff",lineHeight:1.2}}>{progress.xp.toLocaleString()}</div>
        </div>
        <nav style={{display:"flex",flexDirection:"column",gap:4,padding:"16px 12px",flex:1}}>
          {[["dashboard","🏠","Dashboard"],["weeks","📚","Course"],["flashcards","🃏","Flashcards"],
            ["subnet","🧮","Subnet Lab"],["badges","🎖️","Medals"]
          ].map(([id,icon,lbl])=>(
            <button key={id} onClick={()=>goNav(id)}
              style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,
                border:"none",background:screen===id?"#1a2035":"transparent",
                color:screen===id?"#00d4ff":"#6b7280",fontSize:14,textAlign:"left",
                borderLeft:screen===id?"2px solid #00d4ff":"2px solid transparent"}}>
              <span>{icon}</span><span>{lbl}</span>
            </button>
          ))}
        </nav>
        <div style={{padding:"16px",borderTop:"1px solid #1e2535",fontSize:13,color:"#f59e0b",fontWeight:700}}>
          🔥 {progress.streak} day streak
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{flex:1,overflowY:"auto"}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"40px 24px"}}>

          {screen==="dashboard" && <DashView progress={progress} pct={pct} doneLessons={doneLessons} totalLessons={totalLessons} nav={goNav}/>}

          {showWeekList   && <WeekListView weeks={WEEKS} progress={progress} onSelect={goWeek}/>}
          {showWeekDetail && <WeekDetailView weekIdx={weekIdx} week={WEEKS[weekIdx]} progress={progress} onLesson={goLesson} onQuiz={goQuiz} onFlash={goFlash} onBack={goBack}/>}
          {showLesson     && <LessonView weekIdx={weekIdx} lesson={WEEKS[weekIdx].lessons[lessonIdx]} progress={progress} onDone={completeLesson} onBack={goBack}/>}
          {showQuiz       && <QuizView weekIdx={weekIdx} week={WEEKS[weekIdx]} progress={progress} onDone={completeQuiz} onBack={goBack}/>}
          {showFlash      && <FlashView cards={WEEKS[weekIdx].flashcards} title={WEEKS[weekIdx].title} onXP={flashXP} onBack={goBack}/>}

          {screen==="flashcards" && <AllFlashView weeks={WEEKS} onXP={flashXP}/>}
          {screen==="subnet"     && <SubnetView progress={progress} onSolve={subnetXP}/>}
          {screen==="badges"     && <BadgeView earned={progress.badges}/>}
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
// VIEW COMPONENTS
// ─────────────────────────────────────────────

function DashView({progress,pct,doneLessons,totalLessons,nav}) {
  return <>
    <h1 style={{fontSize:28,fontWeight:900,margin:"0 0 4px"}}>Dashboard</h1>
    <p style={{color:"#6b7280",fontSize:14,margin:"0 0 28px"}}>CompTIA Network+ N10-009 · 8-Week Complete Course</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:14,marginBottom:24}}>
      {[["⚡","Total XP",progress.xp.toLocaleString(),"#00d4ff"],["🔥","Streak",progress.streak,"#f59e0b"],
        ["📚","Lessons",`${doneLessons}/${totalLessons}`,"#059669"],["🎖️","Medals",`${progress.badges?.length||0}/${BADGES.length}`,"#7c3aed"]
      ].map(([icon,lbl,val,color])=>(
        <div key={lbl} style={{background:"#131720",borderRadius:12,border:`1px solid ${color}`,padding:"18px 14px",textAlign:"center"}}>
          <div style={{color,fontSize:26,marginBottom:6}}>{icon}</div>
          <div style={{fontSize:24,fontWeight:900,color:"#e2e8f0"}}>{val}</div>
          <div style={{fontSize:11,color:"#6b7280",letterSpacing:1,marginTop:3}}>{lbl}</div>
        </div>
      ))}
    </div>
    <div style={{background:"#131720",borderRadius:12,padding:"18px 22px",marginBottom:6}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{color:"#9ca3af",fontSize:14}}>Overall Course Progress</span>
        <span style={{color:"#00d4ff",fontWeight:700}}>{pct}%</span>
      </div>
      <div style={{height:8,background:"#1e2535",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#00d4ff,#7c3aed)",borderRadius:4,width:`${pct}%`,transition:"width .5s"}}/>
      </div>
    </div>
    <SectionHdr>Quick Access</SectionHdr>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:12,marginBottom:4}}>
      {[["📖","Course","weeks","#00d4ff"],["🃏","Flashcards","flashcards","#7c3aed"],
        ["🧮","Subnet Lab","subnet","#059669"],["🎖️","Medals","badges","#f59e0b"]
      ].map(([icon,lbl,id,color])=>(
        <button key={id} onClick={()=>nav(id)}
          style={{background:"#131720",border:`1px solid ${color}`,borderRadius:12,padding:"18px 10px",
            display:"flex",flexDirection:"column",alignItems:"center",gap:7}}>
          <span style={{fontSize:26}}>{icon}</span>
          <span style={{color,fontWeight:700,fontSize:12}}>{lbl}</span>
        </button>
      ))}
    </div>
    <SectionHdr>Domain Weights</SectionHdr>
    {[["Troubleshooting",24,"#7c3aed"],["Networking Concepts",23,"#00d4ff"],
      ["Implementation",20,"#059669"],["Operations",19,"#0891b2"],["Security",14,"#dc2626"]
    ].map(([name,p,color])=>(
      <div key={name} style={{display:"flex",alignItems:"center",gap:12,marginBottom:9}}>
        <span style={{color:"#9ca3af",fontSize:13,width:190,flexShrink:0}}>{name}</span>
        <div style={{flex:1,height:6,background:"#1e2535",borderRadius:3,overflow:"hidden"}}>
          <div style={{height:"100%",background:color,borderRadius:3,width:`${p*4}%`}}/>
        </div>
        <span style={{color,fontWeight:700,fontSize:13,width:32,textAlign:"right"}}>{p}%</span>
      </div>
    ))}
  </>;
}

function WeekListView({weeks,progress,onSelect}) {
  return <>
    <h1 style={T.title}>8-Week Course</h1>
    <p style={T.sub}>Full N10-009 coverage · Professor Messer videos embedded per lesson</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
      {weeks.map((w,i)=>{
        const done = w.lessons.every(l=>progress.completedLessons.includes(`${i}-${l.id}`));
        const started = w.lessons.some(l=>progress.completedLessons.includes(`${i}-${l.id}`));
        return (
          <button key={i} onClick={()=>onSelect(i)}
            style={{background:"#131720",border:`1px solid ${w.color}`,borderRadius:12,
              padding:20,textAlign:"left",position:"relative",overflow:"hidden"}}>
            <div style={{color:w.color,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:7}}>WEEK {w.week}</div>
            <div style={{color:"#e2e8f0",fontWeight:700,fontSize:14,lineHeight:1.4,marginBottom:5}}>{w.title}</div>
            <div style={{color:w.color,fontSize:12,marginBottom:12}}>{w.domain}</div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#6b7280"}}>
              <span>{w.lessons.length} lessons · {w.flashcards.length} cards</span>
              <span style={{color:w.color}}>+{w.xpReward} XP</span>
            </div>
            {done   && <div style={{position:"absolute",top:12,right:12,fontSize:11,borderRadius:6,padding:"3px 8px",background:w.color,color:"#fff",fontWeight:700}}>✓ Done</div>}
            {started&&!done&&<div style={{position:"absolute",top:12,right:12,fontSize:11,borderRadius:6,padding:"3px 8px",background:"#374151",color:"#fff",fontWeight:700}}>In Progress</div>}
          </button>
        );
      })}
    </div>
  </>;
}

function WeekDetailView({weekIdx,week,progress,onLesson,onQuiz,onFlash,onBack}) {
  const score = progress.quizScores?.[weekIdx];
  return <>
    <BackBtn onClick={onBack}/>
    <div style={{borderLeft:`4px solid ${week.color}`,paddingLeft:18,marginBottom:26}}>
      <div style={{color:week.color,fontSize:11,fontWeight:700,letterSpacing:2}}>WEEK {week.week} · {week.domain}</div>
      <h1 style={{...T.title,margin:"4px 0 6px"}}>{week.title}</h1>
      <div style={{color:week.color,fontWeight:700}}>+{week.xpReward} XP available</div>
    </div>
    <SectionHdr>Lessons (+150 XP each)</SectionHdr>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:26}}>
      {week.lessons.map((l,i)=>{
        const done = progress.completedLessons.includes(`${weekIdx}-${l.id}`);
        return (
          <button key={i} onClick={()=>onLesson(i)}
            style={{display:"flex",alignItems:"center",gap:14,background:"#131720",
              border:`1px solid ${done?week.color:"#374151"}`,borderRadius:10,
              padding:"14px 18px",textAlign:"left"}}>
            <div style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${week.color}`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,
              fontWeight:700,color:"#fff",flexShrink:0,background:done?week.color:"transparent"}}>
              {done?"✓":i+1}
            </div>
            <div style={{flex:1}}>
              <div style={{color:"#e2e8f0",fontWeight:600,marginBottom:2}}>{l.title}</div>
              <div style={{color:"#6b7280",fontSize:12}}>⏱ {l.duration} · 📺 Messer video included</div>
            </div>
            <span style={{color:week.color}}>→</span>
          </button>
        );
      })}
    </div>
    <SectionHdr>Practice</SectionHdr>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <button onClick={onFlash}
        style={{background:"#131720",border:"1px solid #f59e0b",borderRadius:12,
          padding:22,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span style={{fontSize:30}}>🃏</span>
        <span style={{color:"#f59e0b",fontWeight:700}}>Flashcards</span>
        <span style={{color:"#6b7280",fontSize:12}}>{week.flashcards.length} cards · +10 XP each</span>
      </button>
      <button onClick={onQuiz}
        style={{background:"#131720",border:`1px solid ${week.color}`,borderRadius:12,
          padding:22,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span style={{fontSize:30}}>📝</span>
        <span style={{color:week.color,fontWeight:700}}>Quiz</span>
        <span style={{color:"#6b7280",fontSize:12}}>
          {score!==undefined?`Last: ${score}/${week.quiz.length}`:`${week.quiz.length} questions`}
        </span>
      </button>
    </div>
  </>;
}

function LessonView({weekIdx,lesson,progress,onDone,onBack}) {
  const done = progress.completedLessons.includes(`${weekIdx}-${lesson.id}`);
  const messerEmbed = getMesserEmbed(lesson.id);
  return <>
    <BackBtn onClick={onBack}/>
    <h1 style={T.title}>{lesson.title}</h1>
    <span style={{background:"#1e2535",borderRadius:6,padding:"4px 12px",fontSize:13,color:"#9ca3af",display:"inline-block",marginBottom:16}}>⏱ {lesson.duration}</span>
    <section style={{background:"#0d1f35",border:"1px solid #1e4a8a",borderRadius:8,
      padding:14,marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",marginBottom:10}}>
        <div>
          <div style={{color:"#e2e8f0",fontWeight:700,fontSize:13,marginBottom:2}}>Professor Messer Video</div>
          <div style={{color:"#9ca3af",fontSize:12}}>{lesson.messerTitle}</div>
        </div>
        <a href={lesson.messerUrl} target="_blank" rel="noopener noreferrer"
          style={{color:"#00d4ff",fontSize:11,textDecoration:"none",whiteSpace:"nowrap"}}>
          Source page
        </a>
      </div>
      <iframe
        title={lesson.messerTitle}
        src={messerEmbed}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{width:"100%",aspectRatio:"16 / 9",border:0,borderRadius:8,display:"block",background:"#05070b"}}
      />
    </section>
    <div style={{background:"#131720",borderRadius:12,padding:"26px",marginBottom:22,lineHeight:1.8}}>
      <MD text={`${lesson.content}\n\n${LESSON_EXAMPLES[lesson.id] || ""}`}/>
    </div>
    <LessonPractice questions={lesson.practiceQuestions} />
    {!done
      ? <button onClick={onDone}
          style={{background:"linear-gradient(135deg,#00d4ff,#7c3aed)",border:"none",
            borderRadius:10,padding:"13px 30px",color:"#fff",fontSize:15,fontWeight:700}}>
          ✓ Mark Complete — +150 XP
        </button>
      : <div style={{background:"#064e3b",color:"#34d399",borderRadius:10,padding:"11px 22px",
          fontWeight:700,display:"inline-block"}}>✓ Lesson Complete</div>
    }
  </>;
}

function LessonPractice({ questions }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(null);

  if (!questions || questions.length === 0) return null;

  const pick = (qi, ai) => {
    if (revealed[qi]) return;
    setAnswers(prev => ({ ...prev, [qi]: ai }));
  };

  const reveal = (qi) => {
    if (answers[qi] === undefined) return;
    setRevealed(prev => ({ ...prev, [qi]: true }));
  };

  const checkAll = () => {
    let correct = 0;
    questions.forEach((q, qi) => {
      if (answers[qi] === q.answer) correct++;
    });
    setRevealed(questions.reduce((acc, _, i) => ({ ...acc, [i]: true }), {}));
    setScore(correct);
  };

  const reset = () => {
    setAnswers({});
    setRevealed({});
    setScore(null);
  };

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  return (
    <div style={{ marginTop: 28, marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{ height: 1, flex: 1, background: "#1e2535" }} />
        <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
          ✏️ KNOWLEDGE CHECK
        </span>
        <div style={{ height: 1, flex: 1, background: "#1e2535" }} />
      </div>

      {score !== null && (
        <div style={{
          background: score === questions.length ? "rgba(5,150,105,.15)" : "rgba(245,158,11,.1)",
          border: `1px solid ${score === questions.length ? "#059669" : "#f59e0b"}`,
          borderRadius: 10, padding: "12px 18px", marginBottom: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
            {score === questions.length
              ? "🎉 Perfect — you're ready to move on!"
              : `${score}/${questions.length} correct — review the highlighted answers`}
          </span>
          <button onClick={reset} style={{
            background: "transparent", border: "1px solid #374151", borderRadius: 7,
            padding: "5px 14px", color: "#9ca3af", fontSize: 13, cursor: "pointer"
          }}>Retry</button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {questions.map((q, qi) => (
          <div key={qi} style={{
            background: "#0f1117", border: "1px solid #1e2535",
            borderRadius: 12, padding: "18px 20px"
          }}>
            <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 15, marginBottom: 14, lineHeight: 1.5 }}>
              <span style={{ color: "#6b7280", fontSize: 12, marginRight: 8 }}>Q{qi + 1}.</span>
              {q.q}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt, ai) => {
                const isSelected = answers[qi] === ai;
                const isCorrect = ai === q.answer;
                const isRevealed = revealed[qi];
                let border = "#374151", bg = "transparent", textColor = "#d1d5db";
                if (isRevealed) {
                  if (isCorrect) { border = "#059669"; bg = "rgba(5,150,105,.12)"; textColor = "#34d399"; }
                  else if (isSelected && !isCorrect) { border = "#dc2626"; bg = "rgba(220,38,38,.1)"; textColor = "#f87171"; }
                } else if (isSelected) {
                  border = "#00d4ff"; textColor = "#e2e8f0";
                }
                return (
                  <button key={ai} onClick={() => pick(qi, ai)} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    background: bg, border: `1px solid ${border}`, borderRadius: 8,
                    padding: "10px 14px", color: textColor, fontSize: 14,
                    textAlign: "left", lineHeight: 1.5, cursor: isRevealed ? "default" : "pointer"
                  }}>
                    <span style={{
                      background: "#1e2535", borderRadius: 5, padding: "1px 7px",
                      fontSize: 11, fontWeight: 700, color: "#9ca3af", flexShrink: 0, marginTop: 1
                    }}>{String.fromCharCode(65 + ai)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {!revealed[qi] && answers[qi] !== undefined && (
              <button onClick={() => reveal(qi)} style={{
                marginTop: 10, background: "transparent",
                border: "1px solid #374151", borderRadius: 7, padding: "6px 16px",
                color: "#9ca3af", fontSize: 13, cursor: "pointer"
              }}>Check Answer</button>
            )}
            {revealed[qi] && (
              <div style={{
                marginTop: 12, background: "#131720", borderRadius: 8,
                padding: "10px 14px", borderLeft: `3px solid ${answers[qi] === q.answer ? "#059669" : "#dc2626"}`
              }}>
                <p style={{ color: "#9ca3af", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                  <strong style={{ color: answers[qi] === q.answer ? "#059669" : "#dc2626" }}>
                    {answers[qi] === q.answer ? "✓ Correct — " : "✗ Incorrect — "}
                  </strong>
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!score && allAnswered && (
        <button onClick={checkAll} style={{
          marginTop: 18, background: "linear-gradient(135deg,#f59e0b,#d97706)",
          border: "none", borderRadius: 10, padding: "11px 28px",
          color: "#0f1117", fontSize: 14, fontWeight: 700, cursor: "pointer"
        }}>
          Submit All Answers
        </button>
      )}
    </div>
  );
}

function QuizView({week,onDone,onBack}) {
  const [cur,setCur]     = useState(0);
  const [sel,setSel]     = useState(null);
  const [shown,setShown] = useState(false);
  const [correct,setCorrect] = useState(0);
  const [finished,setFinished] = useState(false);

  const q = week.quiz[cur];

  const pick = i => {
    if (shown) return;
    setSel(i);
    setShown(true);
    if (i===q.answer) setCorrect(c=>c+1);
  };

  const next = () => {
    if (cur+1 >= week.quiz.length) {
      // correct already tallied in pick()
      setFinished(true);
      onDone(correct + (shown && sel===q.answer ? 0:0), week.quiz.length);
      // note: we pass `correct` not recalculated since state updates are async
    } else {
      setCur(c=>c+1); setSel(null); setShown(false);
    }
  };

  // recalc final on finish render
  const displayScore = correct;

  if (finished) {
    const pct = Math.round((displayScore/week.quiz.length)*100);
    return <>
      <div style={{background:"#131720",borderRadius:16,padding:"44px",textAlign:"center",maxWidth:460,margin:"0 auto"}}>
        <div style={{fontSize:60,marginBottom:14}}>{pct>=80?"🎉":pct>=60?"📚":"💪"}</div>
        <h2 style={T.title}>Quiz Complete!</h2>
        <div style={{fontSize:52,fontWeight:900,color:"#e2e8f0",marginBottom:6}}>{displayScore}/{week.quiz.length}</div>
        <div style={{color:pct>=80?"#059669":"#f59e0b",fontSize:22,fontWeight:700}}>{pct}%</div>
        <p style={{color:"#9ca3af",marginTop:14}}>
          {pct>=80?"Exam-ready on this topic!":pct>=60?"Good. Review wrong answers and retry.":"Keep studying — review lessons and retry."}
        </p>
        <button onClick={onBack}
          style={{marginTop:20,background:"#1e2535",border:"none",borderRadius:10,padding:"12px 26px",
            color:"#00d4ff",fontWeight:700,fontSize:15}}>← Back to Week</button>
      </div>
    </>;
  }

  return <>
    <BackBtn onClick={onBack}/>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
      <span style={{color:"#9ca3af"}}>Question {cur+1} / {week.quiz.length}</span>
      <span style={{color:"#00d4ff",fontWeight:700}}>Score: {correct}</span>
    </div>
    <div style={{height:4,background:"#1e2535",borderRadius:2,marginBottom:22,overflow:"hidden"}}>
      <div style={{height:"100%",background:"#00d4ff",width:`${(cur/week.quiz.length)*100}%`,transition:"width .3s"}}/>
    </div>
    <div style={{background:"#131720",borderRadius:12,padding:"26px"}}>
      <p style={{fontSize:16,color:"#e2e8f0",lineHeight:1.6,marginBottom:22,fontWeight:600}}>{q.q}</p>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {q.options.map((opt,i)=>{
          let bc="#374151",bg="transparent";
          if (shown) {
            if (i===q.answer) { bc="#059669"; bg="rgba(5,150,105,.12)"; }
            else if (i===sel) { bc="#dc2626"; bg="rgba(220,38,38,.12)"; }
          } else if (i===sel) bc="#00d4ff";
          return (
            <button key={i} onClick={()=>pick(i)}
              style={{display:"flex",alignItems:"center",gap:12,background:bg,
                border:`1px solid ${bc}`,borderRadius:10,padding:"13px 16px",
                color:"#d1d5db",fontSize:14,textAlign:"left"}}>
              <span style={{background:"#1e2535",borderRadius:5,padding:"2px 7px",
                fontSize:11,fontWeight:700,color:"#9ca3af",flexShrink:0}}>
                {String.fromCharCode(65+i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {shown && (
        <div style={{marginTop:18,background:"#0f1117",borderRadius:10,
          border:`1px solid ${sel===q.answer?"#059669":"#dc2626"}`,padding:"14px 18px"}}>
          <strong style={{color:sel===q.answer?"#059669":"#dc2626"}}>
            {sel===q.answer?"✓ Correct!":"✗ Incorrect"}
          </strong>
          <p style={{margin:"7px 0 0",color:"#d1d5db",fontSize:14}}>{q.explanation}</p>
        </div>
      )}
      {shown && (
        <button onClick={next}
          style={{marginTop:18,background:"#1e2535",border:"none",borderRadius:10,
            padding:"11px 26px",color:"#00d4ff",fontWeight:700,fontSize:14}}>
          {cur+1>=week.quiz.length?"View Results →":"Next Question →"}
        </button>
      )}
    </div>
  </>;
}

function FlashView({cards,title,onXP,onBack}) {
  const [idx,setIdx]     = useState(0);
  const [flipped,setFlip] = useState(false);

  const goNext = () => {
    onXP();
    if (idx+1<cards.length) { setIdx(i=>i+1); setFlip(false); }
  };
  const goPrev = () => { if(idx>0){setIdx(i=>i-1);setFlip(false);} };
  const shuffle = () => { setIdx(Math.floor(Math.random()*cards.length)); setFlip(false); };

  const card = cards[idx];
  return <>
    <BackBtn onClick={onBack}/>
    <h1 style={T.title}>🃏 Flashcards</h1>
    <p style={T.sub}>{title} · Card {idx+1}/{cards.length} · +10 XP per card</p>
    <div onClick={()=>setFlip(f=>!f)}
      style={{borderRadius:16,padding:"44px 36px",minHeight:220,display:"flex",
        flexDirection:"column",justifyContent:"center",alignItems:"center",
        cursor:"pointer",userSelect:"none",margin:"16px 0",textAlign:"center",
        background:flipped?"#1a1040":"#131720",
        border:`2px solid ${flipped?"#7c3aed":"#1e2535"}`}}>
      <div style={{fontSize:11,letterSpacing:2,color:"#6b7280",marginBottom:18,textTransform:"uppercase"}}>
        {flipped?"💡 Answer":"❓ Question"}
      </div>
      <div style={{fontSize:18,color:"#e2e8f0",fontWeight:600,lineHeight:1.5}}>{flipped?card.a:card.q}</div>
      {!flipped && <div style={{marginTop:22,fontSize:13,color:"#6b7280"}}>Tap to reveal →</div>}
    </div>
    <div style={{display:"flex",gap:10,justifyContent:"center"}}>
      <button onClick={goPrev} disabled={idx===0}
        style={{background:"#131720",border:"1px solid #374151",borderRadius:9,
          padding:"9px 20px",color:"#e2e8f0",fontWeight:700,fontSize:14}}>← Prev</button>
      <button onClick={shuffle}
        style={{background:"#374151",border:"none",borderRadius:9,
          padding:"9px 20px",color:"#e2e8f0",fontWeight:700,fontSize:14}}>🔀 Shuffle</button>
      <button onClick={goNext} disabled={idx>=cards.length-1}
        style={{background:"#059669",border:"none",borderRadius:9,
          padding:"9px 20px",color:"#fff",fontWeight:700,fontSize:14}}>Next →</button>
    </div>
  </>;
}

function AllFlashView({weeks,onXP}) {
  const [sel,setSel] = useState(null);
  if (sel!==null) return <FlashView cards={weeks[sel].flashcards} title={weeks[sel].title} onXP={onXP} onBack={()=>setSel(null)}/>;
  const total = weeks.reduce((s,w)=>s+w.flashcards.length,0);
  return <>
    <h1 style={T.title}>🃏 Flashcard Drills</h1>
    <p style={T.sub}>{total} total cards · +10 XP per card reviewed</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:14}}>
      {weeks.map((w,i)=>(
        <button key={i} onClick={()=>setSel(i)}
          style={{background:"#131720",border:`1px solid ${w.color}`,borderRadius:12,
            padding:18,textAlign:"left"}}>
          <div style={{color:w.color,fontSize:11,fontWeight:700,letterSpacing:2}}>WEEK {w.week}</div>
          <div style={{color:"#e2e8f0",fontWeight:700,fontSize:13,margin:"5px 0 8px",lineHeight:1.4}}>{w.title}</div>
          <div style={{color:w.color,fontSize:12}}>{w.flashcards.length} cards</div>
        </button>
      ))}
    </div>
  </>;
}

function SubnetView({progress,onSolve}) {
  const [ip,setIp]       = useState("192.168.10.50");
  const [cidr,setCidr]   = useState("26");
  const [result,setResult] = useState(null);
  const [err,setErr]     = useState("");
  const [mode,setMode]   = useState("calc");
  const [pq,setPq]       = useState(null);
  const [ans,setAns]     = useState("");
  const [res,setRes]     = useState(null);

  const calc = () => {
    const r = calcSubnet(ip,cidr);
    if (!r) { setErr("Invalid IP or CIDR — check your input."); setResult(null); }
    else { setErr(""); setResult(r); }
  };

  const genQ = () => {
    const c=[24,25,26,27,28,29,30][Math.floor(Math.random()*7)];
    const oct=()=>Math.floor(Math.random()*254)+1;
    const i=`${oct()}.${oct()}.${oct()}.${oct()}`;
    const a=calcSubnet(i,String(c));
    setPq({ip:i,cidr:c,answer:a}); setAns(""); setRes(null);
  };

  const check = () => {
    if (!pq) return;
    const ok = ans.trim()===String(pq.answer.hosts);
    setRes(ok);
    if (ok) onSolve();
  };

  return <>
    <h1 style={T.title}>🧮 Subnet Lab</h1>
    <p style={T.sub}>Master subnetting — {progress.subnetSolved||0}/10 for Subnet Master badge</p>
    <div style={{display:"flex",gap:8,marginBottom:22}}>
      {["calc","practice"].map(m=>(
        <button key={m} onClick={()=>{setMode(m);if(m==="practice")genQ();}}
          style={{background:mode===m?"#1a2035":"#131720",
            border:`1px solid ${mode===m?"#00d4ff":"#374151"}`,
            borderRadius:8,padding:"8px 18px",
            color:mode===m?"#00d4ff":"#6b7280",fontWeight:700,fontSize:14}}>
          {m==="calc"?"Calculator":"Practice Mode"}
        </button>
      ))}
    </div>
    <div style={{background:"#131720",borderRadius:12,padding:"26px"}}>
      {mode==="calc" ? <>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16,alignItems:"flex-end"}}>
          <div>
            <label style={{display:"block",fontSize:11,color:"#6b7280",letterSpacing:1,marginBottom:5}}>IP Address</label>
            <input value={ip} onChange={e=>setIp(e.target.value)}
              style={{background:"#0f1117",border:"1px solid #374151",borderRadius:8,
                padding:"9px 12px",color:"#e2e8f0",fontSize:15,outline:"none",
                fontFamily:"inherit",width:170}}/>
          </div>
          <div>
            <label style={{display:"block",fontSize:11,color:"#6b7280",letterSpacing:1,marginBottom:5}}>CIDR</label>
            <input value={cidr} onChange={e=>setCidr(e.target.value)} placeholder="24"
              style={{background:"#0f1117",border:"1px solid #374151",borderRadius:8,
                padding:"9px 12px",color:"#e2e8f0",fontSize:15,outline:"none",
                fontFamily:"inherit",width:80}}/>
          </div>
          <button onClick={calc}
            style={{background:"#00d4ff",border:"none",borderRadius:8,padding:"9px 22px",
              color:"#0f1117",fontWeight:700,fontSize:15,height:40}}>Calculate</button>
        </div>
        {err && <div style={{color:"#dc2626",marginBottom:12,fontSize:14}}>{err}</div>}
        {result && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:22}}>
            {[["Network",result.network],["Subnet Mask",result.mask],
              ["Broadcast",result.broadcast],["First Host",result.first],
              ["Last Host",result.last],["Usable Hosts",result.hosts]
            ].map(([l,v])=>(
              <div key={l} style={{background:"#0f1117",borderRadius:8,padding:"11px 14px"}}>
                <div style={{fontSize:11,color:"#6b7280",letterSpacing:1,marginBottom:3}}>{l}</div>
                <div style={{color:"#00d4ff",fontWeight:700,fontSize:15}}>{v}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{borderTop:"1px solid #1e2535",paddingTop:18,marginTop:8}}>
          <h3 style={{color:"#e2e8f0",marginBottom:10,fontSize:15}}>Quick Reference</h3>
          <div style={{overflowX:"auto"}}>
            <table style={{borderCollapse:"collapse",width:"100%"}}>
              <tbody>
                <tr style={{background:"#1a2035"}}>{["CIDR","Subnet Mask","Hosts","Block"].map(h=><th key={h} style={{border:"1px solid #1e2535",padding:"7px 12px",color:"#00d4ff",textAlign:"left",fontSize:13}}>{h}</th>)}</tr>
                {[["/24","255.255.255.0","254","256"],["/25","255.255.255.128","126","128"],
                  ["/26","255.255.255.192","62","64"],["/27","255.255.255.224","30","32"],
                  ["/28","255.255.255.240","14","16"],["/29","255.255.255.248","6","8"],
                  ["/30","255.255.255.252","2","4"]
                ].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} style={{border:"1px solid #1e2535",padding:"7px 12px",color:"#d1d5db",fontSize:13}}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </> : (
        pq && <>
          <p style={{fontSize:17,color:"#e2e8f0",lineHeight:1.6,marginBottom:18}}>
            Given <strong style={{color:"#00d4ff"}}>{pq.ip}/{pq.cidr}</strong>, how many <strong style={{color:"#00d4ff"}}>usable hosts</strong>?
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
            <input value={ans} onChange={e=>setAns(e.target.value)} placeholder="Enter number"
              onKeyDown={e=>e.key==="Enter"&&check()}
              style={{background:"#0f1117",border:"1px solid #374151",borderRadius:8,
                padding:"9px 12px",color:"#e2e8f0",fontSize:15,outline:"none",
                fontFamily:"inherit",width:160}}/>
            <button onClick={check}
              style={{background:"#00d4ff",border:"none",borderRadius:8,padding:"9px 22px",
                color:"#0f1117",fontWeight:700,fontSize:15,height:40}}>Check</button>
          </div>
          {res!==null && (
            <div style={{marginTop:14}}>
              <div style={{color:res?"#059669":"#dc2626",fontWeight:700,fontSize:17}}>
                {res?"✓ Correct! +75 XP":`✗ Incorrect — Answer: ${pq.answer.hosts}`}
              </div>
              {!res && <p style={{color:"#9ca3af",marginTop:7,fontSize:14}}>Formula: 2^({32-pq.cidr}) − 2 = {pq.answer.hosts}</p>}
              <button onClick={genQ}
                style={{marginTop:14,background:"#00d4ff",border:"none",borderRadius:8,
                  padding:"9px 22px",color:"#0f1117",fontWeight:700,fontSize:14}}>
                Next Problem →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </>;
}

function BadgeView({earned}) {
  const categories = [...new Set(MEDALS.map(m => m.category))];
  const tierColor = { bronze:"#cd7f32", silver:"#94a3b8", gold:"#f59e0b" };
  const tierGlow = { bronze:"rgba(205,127,50,.25)", silver:"rgba(148,163,184,.2)", gold:"rgba(245,158,11,.3)" };
  const tierLabel = { bronze:"Bronze", silver:"Silver", gold:"Gold" };
  const earnedCount = earned.length;
  const totalCount = MEDALS.length;
  const pct = Math.round((earnedCount / totalCount) * 100);

  return <>
    <h1 style={T.title}>🎖️ Medals</h1>
    <p style={T.sub}>{earnedCount} of {totalCount} earned</p>

    <div style={{background:"#131720",borderRadius:12,padding:"16px 20px",marginBottom:28}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{color:"#9ca3af",fontSize:13}}>Overall Medal Progress</span>
        <span style={{color:"#f59e0b",fontWeight:700}}>{pct}%</span>
      </div>
      <div style={{height:6,background:"#1e2535",borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#cd7f32,#94a3b8,#f59e0b)",borderRadius:3,width:`${pct}%`,transition:"width .5s"}}/>
      </div>
      <div style={{display:"flex",gap:20,marginTop:12}}>
        {["bronze","silver","gold"].map(tier => {
          const count = MEDALS.filter(m => m.tier === tier && earned.includes(m.id)).length;
          const total = MEDALS.filter(m => m.tier === tier).length;
          return (
            <div key={tier} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:tierColor[tier]}}/>
              <span style={{color:"#6b7280",fontSize:12,textTransform:"capitalize"}}>{tier}: </span>
              <span style={{color:tierColor[tier],fontWeight:700,fontSize:12}}>{count}/{total}</span>
            </div>
          );
        })}
      </div>
    </div>

    {categories.map(cat => (
      <div key={cat} style={{marginBottom:32}}>
        <h2 style={{fontSize:13,fontWeight:700,color:"#9ca3af",letterSpacing:2,textTransform:"uppercase",margin:"0 0 14px"}}>{cat}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12}}>
          {MEDALS.filter(m => m.category === cat).map(m => {
            const isEarned = earned.includes(m.id);
            const color = tierColor[m.tier];
            const glow = tierGlow[m.tier];
            return (
              <div key={m.id} style={{
                background: isEarned ? "#131720" : "#0c0f16",
                border: `1px solid ${isEarned ? color : "#1e2535"}`,
                borderRadius:14,padding:"18px 14px",textAlign:"center",
                opacity: isEarned ? 1 : 0.45,transition:"all .2s",
                boxShadow: isEarned ? `0 0 16px ${glow}` : "none",position:"relative",overflow:"hidden"
              }}>
                <div style={{position:"absolute",top:8,right:8,fontSize:10,fontWeight:700,letterSpacing:1,color:isEarned ? color : "#374151",textTransform:"uppercase"}}>
                  {tierLabel[m.tier]}
                </div>
                <div style={{fontSize:36,marginBottom:10,filter: isEarned ? "none" : "grayscale(100%)"}}>{m.icon}</div>
                <div style={{fontWeight:700,color:isEarned ? "#e2e8f0" : "#6b7280",fontSize:14,marginBottom:5}}>{m.name}</div>
                <div style={{fontSize:11,color:"#6b7280",lineHeight:1.5}}>{m.desc}</div>
                {isEarned && <div style={{marginTop:10,fontSize:11,color:color,fontWeight:700}}>✓ Earned</div>}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </>;
}

// ─────────────────────────────────────────────
// SMALL SHARED COMPONENTS
// ─────────────────────────────────────────────
const T = {
  title:{fontSize:26,fontWeight:900,margin:"0 0 4px",color:"#e2e8f0"},
  sub:{color:"#6b7280",fontSize:14,margin:"0 0 26px"},
};

function SectionHdr({children}) {
  return <h2 style={{fontSize:12,fontWeight:700,color:"#9ca3af",letterSpacing:2,
    textTransform:"uppercase",margin:"26px 0 12px"}}>{children}</h2>;
}

function BackBtn({onClick}) {
  return <button onClick={onClick}
    style={{background:"transparent",border:"none",color:"#6b7280",fontSize:14,
      marginBottom:22,padding:0,display:"flex",alignItems:"center",gap:6}}>
    ← Back
  </button>;
}
