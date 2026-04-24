# Network+ Study App

A comprehensive CompTIA Network+ N10-009 study application with lessons, flashcards, practice questions, and subnet exercises.

## Features

- **8-Week Course** - Complete coverage of all Network+ domains
- **Video Lessons** - Embedded Professor Messer videos
- **Practice Questions** - Knowledge check after each lesson (90 questions total)
- **Flashcards** - Review mode for key terms
- **Subnet Calculator** - Interactive lab for subnetting practice
- **Medals System** - Progress tracking with bronze/silver/gold tiers
- **Local Storage** - Progress saves automatically in browser

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **No backend required** - All client-side

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (localhost:7777)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
network-plus-app/
├── src/
│   ├── App.jsx      # Main application (all components)
│   ├── main.jsx    # React entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Dependencies & scripts
└── vite.config.js   # Vite configuration
```

## Server Configuration

The app runs on **port 7777** bound to `127.0.0.1` for security.

- **Development:** `http://127.0.0.1:7777`
- **Production Preview:** `http://127.0.0.1:7777`

## Cloudflare Tunnel Deployment

Designed for Cloudflare Tunnel (zero-trust) deployment.

### 1. Build the App

```bash
npm run build
```

### 2. Start the Server

**Option A: Using Vite preview (development)**
```bash
npm run dev
```

**Option B: Using serve (production)**
```bash
npm install -g serve
npm run serve
```

**Option C: Using PM2 (process manager)**
```bash
npm install -g serve
pm2 serve dist 7777 --name network-plus-app
pm2 save
```

### 3. Cloudflare Tunnel

Point your Cloudflare Tunnel to:
```
http://127.0.0.1:7777
```

**Example cloudflared command:**
```bash
cloudflared tunnel --url http://127.0.0.1:7777
```

## Nginx Deployment (Alternative)

### 1. Upload files

```bash
scp -r dist/* user@your-vps:/var/www/your-domain.com/
```

### 2. Nginx config (`/etc/nginx/sites-available/your-domain`)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/your-domain.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. Enable and reload

```bash
sudo ln -s /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. HTTPS with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Data Storage

Progress is saved to browser's **localStorage**:
- Completed lessons
- XP points
- Streak days
- Earned medals

Each browser has its own save state. No server required.

## Exam Details

| Property | Value |
|----------|-------|
| Exam | CompTIA Network+ N10-009 |
| Questions | 90 (MCQ + PBQs) |
| Time | 90 minutes |
| Passing Score | 720/900 |

## Domain Coverage

| Domain | Weight |
|--------|--------|
| Network Troubleshooting | 24% |
| Network Concepts | 23% |
| Network Implementation | 20% |
| Network Operations | 19% |
| Network Security | 14% |

## Credits

- **Professor Messer** - Video content
- **CompTIA** - Exam objectives