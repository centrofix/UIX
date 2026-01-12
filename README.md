# UIX — Color Generator

UIX is a small UI/UX utility to generate accessible, pleasant color palettes for designs and prototypes.

Repository description: UI UX Generate Color

## Features

- Generate N random colors (configurable count)
- Lock colors to preserve them between generations
- Click a color to copy its HEX code to the clipboard
- Export generated palette as CSS custom properties (variables)
- Small, dependency-free static demo (HTML/CSS/JS)

## Files

- `index.html` — demo UI and controls
- `styles.css` — styling for the demo
- `app.js` — color generation and UI logic

## Usage

Run locally:

1. Clone the repo:

   git clone https://github.com/centrofix/UIX.git
   cd UIX

2. Open `index.html` in your browser, or serve with a simple static server:

   - Using Python 3:
     python -m http.server 8000
     # open http://localhost:8000

   - Using Node (http-server):
     npx http-server

3. Use the controls to pick how many colors to generate, lock any you like, click a swatch to copy its hex, and use "Export CSS" to copy CSS variables.

## Demo

You can preview the demo by opening `index.html` from the repository root in any modern browser. To publish a live demo, enable GitHub Pages for the repository (serve from `main` branch or a `gh-pages` branch) and point Pages to the repo root.

## Contributing

Contributions are welcome. Open an issue or submit a pull request with improvements, bug fixes, or feature ideas (palette saving, different export formats, contrast checks, etc.).

## License

This repository currently has no license file. If you want one, I can add an MIT license or another OSI-approved license — tell me which one you'd like.

## Notes / Next steps I can help with

- Add a README (done)
- Add screenshots or animated GIFs of the demo
- Enable GitHub Pages and add a short deploy workflow
- Add a LICENSE file (e.g., MIT)
- Move demo to an `examples/` or `demo/` folder
