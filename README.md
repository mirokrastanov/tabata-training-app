# Tabata Training App
🏃⌚Tabata timer app with customizable workouts. Users build profiles with exercise names, durations &amp; see them on screen during intervals.
- (Preview img) NYI...

## App Demo
- NYI...

## App Overview
### Introduction
Looking to push your limits with custom HIIT workouts? This Tabata timer app goes beyond simple intervals. Create a profile, design your workout with specific exercises and durations, then get visual during your training with on-screen exercise names and a countdown timer. Plus, you can even pause the timer for a quick breather and pick up right where you left off.
### Features
- Fully responsive (Web & Mobile)
- Create a user profile
- Design your own workouts with exercise names and durations
- Start the timer and view your current exercise's name and timer on screen
- Pause the timer if you need extra rest

## Sneak Peak Images
- NYI...

## RESTful API
### General Endpoints
- Prefix: `no prefix`

| Method | Endpoint |             Function             |
| :----: | :------: | :------------------------------: |
| `GET`  |   `/`    |     Returns API docs as JSON     |
| `GET`  | `/test`  |            Test route            |
| `GET`  |  `/404`  | All unknown routes redirect here |

### Auth Endpoints
- Prefix: `/api/auth`
- To Build a URL combine: `prefix` + `endpoint`
- Example: `/api/auth/status` - Returns Auth Status

| Method | Endpoint (add prefix) |                Function                |
| :----: | :-------------------: | :------------------------------------: |
| `GET`  |       `/status`       |          Returns Auth status           |
| `GET`  |   `/discord/login`    | Discord login route. Explained below.  |
| `GET`  |  `/discord/redirect`  | Once authorized the user is redirected |
| `GET`  |         TODO          |           TODO from here on            |
| `GET`  |          `/`          |                  home                  |
| `GET`  |          `/`          |                  home                  |
| `GET`  |          `/`          |                  home                  |
| `GET`  |          `/`          |                  home                  |
| `GET`  |          `/`          |                  home                  |
| `GET`  |          `/`          |                  home                  |

### Discord Login (via OAuth2) - How it works
1. Send a `GET` request to `/discord/login`. 
2. It redirects you to Discord for Authorization.
3. Authorize and you are redirected to `/discord/redirect` and a **Query Parameter** is attached. Example: `/discord/redirect?code=AuthorizationStringHere`
4. You are logged in and receive a user JSON object. `{ user: {...}, session: {...} }`
___
- If you deny Authorization you are NOT logged in and you receive a JSON object with information and `{ user: null, errors: {...} }`.




## Project Tools & Technologies used
### IDE
- [VS Code](https://code.visualstudio.com/)
### Extensions 
- [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
### Languages
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
### Libraries
<!-- - [Swiper.js](https://swiperjs.com/)
- [React Feather](https://feathericons.com/)
- [React Router](https://reactrouter.com/en/main) -->
- [Vite](https://vitejs.dev/guide/)
### Fonts, Icons & Visual elements
- [Font Awesome Icons](https://fontawesome.com/)
- [Google Material Icons](https://fonts.google.com/icons?icon.set=Material+Symbols)
- [Font - Montserrat](https://fonts.google.com/specimen/Montserrat)

