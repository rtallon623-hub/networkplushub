# Mobile Responsiveness Implementation Plan

> **For agentic workers:** Execute task-by-task in order.

**Goal:** Add mobile-friendly responsive styles to the Network+ Study App without changing aesthetics

**Architecture:** Add TailwindCSS via Vite plugin, configure mobile-first responsive utilities, apply to existing components

**Tech Stack:** React 19 + Vite, TailwindCSS @tailwindcss/vite

---

### Task 1: Install & Configure TailwindCSS

- [ ] **Step 1: Install TailwindCSS**

```bash
cd /root/networkplushub
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Read current vite.config.js**

- [ ] **Step 3: Add Tailwind plugin to vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Create tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        foreground: '#e2e8f0',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds with no errors

---

### Task 2: Add Base Responsive Styles

- [ ] **Step 1: Read current src/index.css**

- [ ] **Step 2: Replace index.css with Tailwind import + custom base**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-size: 16px;
    -webkit-tap-highlight-color: transparent;
  }
  
  body {
    @apply bg-[#0d1117] text-[#e2e8f0] font-sans antialiased;
  }
  
  /* Prevent horizontal overflow on mobile */
  #root {
    @apply min-h-screen max-w-full overflow-x-hidden;
  }
}
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite starts, page loads

---

### Task 3: Test and Audit Mobile Viewport

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Open in browser with iPhone viewport**

```bash
agent-browser open "http://127.0.0.1:5173" --viewport "390x844"
```

- [ ] **Step 3: Take screenshot and verify**

```bash
agent-browser screenshot /tmp/mobile-test.png
```

Expected checks:
- No horizontal overflow (content visible without horizontal scroll)
- Text readable
- Buttons tappable (min ~44px touch target)

- [ ] **Step 4: Close browser**

```bash
agent-browser close
```

---

### Task 4: Commit

- [ ] **Step 1: Check git status**

```bash
git status
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add TailwindCSS for mobile responsiveness
- Install @tailwindcss/vite plugin
- Add responsive base styles
- Test with iPhone viewport"
```

- [ ] **Step 3: Verify**

```bash
git log -1 --oneline
```