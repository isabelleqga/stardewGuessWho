# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A simple client-side "Guess Who" game skinned with Stardew Valley characters, built with plain HTML/CSS/JS. No build tools, no package manager, no tests — it's meant to be opened directly in a browser. Two people play locally on separate machines/devices, each picking a hidden character and eliminating candidates on their own board by clicking portraits to gray them out.

## Running the game

Open `Application.html` directly in a browser. There is no dev server, build step, or CLI.

## Known structural issue: broken asset paths

`Application.html` and `code/script.js` reference assets by bare filename (`ui.css`, `aideus.js`, `abigail.png`, `blackboard.png`, `yourpick.png`, etc.) as if everything lived in one flat folder next to the HTML file. The actual repo layout is:

- `code/css.css` — stylesheet (referenced as `ui.css` in the HTML — name mismatch)
- `code/script.js` — game logic (referenced as `aideus.js` in the HTML — name mismatch)
- `img/colored/*.png` — full-color character portraits
- `img/bw/*.png` — grayscale "eliminated" portraits, named like `abigail (2).png`
- `img/features/*.png` — UI chrome (`blackboard.png`, `newgame.png`, `yourpick.png`, `background.jpg`)

None of these paths match what `Application.html` currently expects. When fixing or extending the game, either:
1. Update the `<link>`/`<script>`/`<img src>` paths in `Application.html` to point into `code/` and `img/colored/`, and update `code/script.js`'s image-swap logic to reference `img/colored/...` and `img/bw/...` accordingly, or
2. Flatten assets into one directory to match the existing bare-filename references.

Don't assume the game currently runs correctly from `Application.html` as-is — verify in a browser after any asset-path change.

## Architecture

- **`Application.html`** — the whole board UI. Each character is a `<button id="{name}" onclick="activate('{name}')">` wrapping an `<img id="{name}photo">`. Button/image IDs are the lowercase character name; this ID convention is load-bearing for both the CSS positioning and the JS toggle logic.
- **`code/css.css`** — absolutely positions every character button into a fixed 4-row × 9-column grid over the blackboard background image, using per-character `top`/`left` selectors grouped by row (`#fila1`–`#fila4`) and column (`#coluna1`–`#coluna9`).
- **`code/script.js`**:
  - `personagens` — the canonical array of all valid character slugs (used for validating the "pick" input).
  - `activate(personagem)` — toggles a character's image between its colored and grayscale ("eliminated") variant by checking/swapping the `src` filename.
  - `pickandoChar()` / `validarEscolha()` — reads the "your pick" text input, lowercases it, validates it against `personagens`, and if valid sets the "your pick" portrait.
  - `newGame()` — reloads the page (the only reset mechanism; there's no persisted state).
- Four characters (`evelyn`, `kent`, `pam`, `wizard`) are commented out in `Application.html` even though they're listed in `personagens` and have image assets — they exist in the data model but aren't currently playable/visible on the board.
- No state is persisted anywhere (no localStorage, no backend); the entire "game state" is just which images are currently swapped to grayscale in the DOM, so a page reload is a full reset.
