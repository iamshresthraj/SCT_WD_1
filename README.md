# AetherSpace | Spatial Cloud Workspace Landing Page

A premium, interactive, and fully responsive landing page designed for a high-performance spatial cloud workspace called **AetherSpace**. This project showcases modern web design best practices, including custom dark themes, glassmorphism, responsive grids, and highly interactive simulated widgets.

## Features

- **Interactive Sticky Navigation Menu**:
  - Automatically transitions styling (reduced padding, solid dark glassmorphism background, bottom border, and subtle shadow) when the page is scrolled.
  - Smooth underline sliding hover transitions on menu items.
  - Scroll-Spy integration: highlights the current section link as the user scrolls through the page.
  - Fully responsive mobile collapsible hamburger menu.
- **Modern Premium Aesthetics**:
  - HSL-driven custom dark mode palette.
  - Deep backdrop blurs (`backdrop-filter`) and border overlay gradients.
  - Subtle floating and pulsing micro-animations for key visual focal points.
- **Interactive Workspace Demo Tabs**:
  - **Design Grid**: Includes interactive sliders that change simulated element opacity and blur intensity in real time, alongside color dots to change styling accents.
  - **Code Canvas**: Syntax-highlighted code viewer simulating editor behaviors.
  - **3D Render**: Simulated three-dimensional spinning orb rendering environment with real-time framerate telemetry overlays.
- **Feature Cards with Shine Hover**:
  - Cards dynamically track the mouse position to adjust spotlight gradient angles (`--x` and `--y` cursor variables).
- **Smooth Scroll Integration**:
  - Click transitions scroll users directly to target anchor sections with custom scroll offsets.
- **Form Actions & Input Validation**:
  - Custom JavaScript handler simulating server submits for contact and newsletter components, complete with UX loading states and transient success feedback alerts.

## Project Structure

```text
├── index.html   # Main layout and semantic content structure
├── styles.css   # Styling stylesheet, variables, animations, and queries
├── app.js       # Navigation behaviors, sliders, tab toggles, and handlers
└── README.md    # Documentation and usage instructions
```

## Technologies Used

- **HTML5**: Semantic tags, accessibility (ARIA attributes), SEO structures.
- **CSS3**: Custom HSL variables, Flexbox & CSS Grid, Glassmorphic overlays, keyframes animations.
- **Vanilla JavaScript (ES6)**: Intersection Observer API for scroll reveals and active indicators, state controls, DOM mutation, form feedback.

## How to Run the Project Locally

1. Clone or download the files.
2. Open `index.html` directly in your browser, or launch using a local HTTP server such as VS Code Live Server or python:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.

## Customization Guide

- **Colors**: Modify the HSL variables in `:root` inside `styles.css` to change primary theme gradients, background shades, or highlight glows.
- **Fonts**: The project integrates Google Fonts (`Outfit` for headers and `Inter` for body copy). You can load alternatives inside the HTML head.
- **Sections**: All main panels are semantic tags. You can add or reorder sections in `index.html` and update the navigation anchors.
