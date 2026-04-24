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

# Start development server
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

## Local Development

```bash
# Development server (opens browser)
npm run dev
# or
npm start

# Access at http://localhost:5173
```

## Production Deployment (VPS)

### Build the App

```bash
npm run build
```

Output is in `dist/` folder.

### Deploy to VPS with Nginx

1. **Upload files:**
   ```bash
   scp -r dist/* user@your-vps:/var/www/your-domain.com/
   ```

2. **Nginx config** (`/etc/nginx/sites-available/your-domain`):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/your-domain.com;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(js|css|png|jpg|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **Enable and reload:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### HTTPS with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### PM2 (Optional Process Manager)

```bash
# Install serve globally
npm install -g serve

# Run production build
serve -s dist -l 3000

# Or with PM2 for auto-restart
pm2 serve dist 3000 --name network-plus-app
pm2 save
```

### Docker Deployment

```dockerfile
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

Build and run:
```bash
docker build -t network-plus-app .
docker run -p 80:80 --name network-plus-app network-plus-app
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