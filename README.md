# WebWhiz Chrome Extension

**WebWhiz** is a modern, AI-powered Chrome extension that brings two powerful features to any website:

- 📝 **Invisible Sticky Notes**: Add, edit, drag, and persist sticky notes on any webpage. Notes are saved per URL and auto-appear on revisit.
- 🤖 **AI Sidekick for Web Forms**: (Coming soon) Smart Assist icon for form fields, with GPT-4 powered rewrite, summarize, and autofill using your profile/resume.
- 🎨 **Theme Switching**: Toggle between light, dark, and system themes using Tailwind CSS.

---

## ✨ Features
- **Sticky Notes**: Right-click to add a note anywhere. Edit, drag, delete, and notes persist per page.
- **AI Form Assistant**: Detects forms, offers autofill and AI-powered suggestions (coming soon).
- **Profile Management**: Store your name, email, skills, and bio securely in the extension.
- **Theme Toggle**: Switch between light, dark, and system themes in the popup.
- **Minimal, Modern UI**: Built with React, TypeScript, Vite, and Tailwind CSS.

---

## 🛠️ Tech Stack
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (with dark mode)
- Chrome Extension Manifest V3

---

## 🚀 Getting Started

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Build the extension**
```bash
npm run build
```
_Output will be in the `dist/` folder._

### 3. **Load in Chrome**
1. Go to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `dist/` folder

### 4. **Usage**
- **Sticky Notes**: Right-click any page, select "Add WebWhiz Sticky Note". Edit, drag, or delete notes. Notes are saved per URL.
- **Popup**: Click the extension icon to open the popup. Edit your profile and toggle theme.
- **AI Form Assistant**: (Coming soon) Smart Assist icon will appear in form fields for AI-powered help.

---

## 🧑‍💻 Development
- Source code is in `src/`:
  - `content/`: Content scripts (sticky notes, form helper)
  - `popup/`: React popup UI
  - `background/`: Background worker (context menu, API proxy)
  - `utils/`: Storage and OpenAI helpers
  - `assets/`: Tailwind CSS and icons
- Edit code, then run `npm run build` to update the `dist/` folder.

---

## 🔒 Security & Privacy
- All data (notes, profile) is stored locally using `chrome.storage.local`.
- No data is sent anywhere except (optionally) to OpenAI for AI features (when enabled).

---

## 📦 Folder Structure
```
webwhiz-extension/
├── src/
│   ├── content/             # Content scripts (sticky notes, form helper)
│   ├── popup/               # React popup with ThemeToggle
│   ├── background/          # Background worker for APIs
│   ├── utils/               # Storage and OpenAI helpers
│   ├── assets/              # Tailwind theme CSS
├── manifest.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🧩 Roadmap
- [x] Sticky notes with context menu
- [x] Profile management in popup
- [x] Theme toggle (light/dark/system)
- [ ] AI form assistant (GPT-4 integration, autofill, tone options)
- [ ] Export/share notes, sync, analytics, resume upload

---

## 📝 License
MIT 