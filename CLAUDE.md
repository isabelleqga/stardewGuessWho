# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A simple client-side "Guess Who" game skinned with Stardew Valley characters, built with plain HTML/CSS/JS. No build tools, no package manager, no tests — it's meant to be opened directly in a browser. Two people play locally on separate machines/devices, each picking a hidden character and eliminating candidates on their own board by clicking portraits to gray them out.

## Running the game

Open `index.html` directly in a browser, or serve the repo root as a static site (e.g. GitHub Pages). There is no dev server, build step, or CLI.

## Architecture

- **`index.html`** (was `Application.html`) — the whole board UI. Each character is a `<button id="{name}" onclick="activate('{name}')">` wrapping an `<img id="{name}photo">`. Button/image IDs are the lowercase character name; this ID convention is load-bearing for both the CSS positioning and the JS toggle logic. Asset paths correctly reference `code/css.css`, `code/script.js`, `img/colored/*.png`, `img/bw/*.png`, and `img/features/*.png`.
- **`code/css.css`** — absolutely positions every character button into a fixed 4-row × 9-column grid over the blackboard background image, using per-character `top`/`left` selectors grouped by row (`#fila1`–`#fila4`) and column (`#coluna1`–`#coluna9`).
- **`code/script.js`**:
  - `personagens` — the canonical array of all valid character slugs (used for validating the "pick" input).
  - `activate(personagem)` — toggles a character's image between its colored and grayscale ("eliminated") variant by checking/swapping the `src` filename.
  - `pickandoChar()` / `validarEscolha()` — reads the "your pick" text input, lowercases it, validates it against `personagens`, and if valid sets the "your pick" portrait.
  - `newGame()` — reloads the page (the only reset mechanism; there's no persisted state).
- No state is persisted anywhere (no localStorage, no backend); the entire "game state" is just which images are currently swapped to grayscale in the DOM, so a page reload is a full reset.
