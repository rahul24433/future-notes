# Future Notes

A minimalist multi-page website with a futuristic visual style, smooth page transitions, and a guided reading flow.

## Pages

- `index.html` - Home
- `intro.html` - Intro
- `first-page.html` - First Page
- `second-page.html` - Second Page
- `ultima-luce.html` - Final page ("Ultima Luce")

## Features

- Black-and-white modern visual theme
- Sticky navigation with active-page state
- Animated nav indicator
- Subtle cross-page transition effects
- Responsive layout for desktop and mobile

## Project Structure

```text
.
├── index.html
├── intro.html
├── first-page.html
├── second-page.html
├── ultima-luce.html
├── index.css
└── script.js
```

## Run Locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Go to repository `Settings` -> `Pages`.
3. Under `Build and deployment`, set:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
4. Save and wait for deployment.
5. Your site will be available at:
   - `https://<your-username>.github.io/<repo-name>/`

