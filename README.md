# Tabata Training App* (work in progress...)
🏃⌚Tabata timer app with customizable workouts. Users build profiles with exercise names and durations, and see them on screen during intervals.
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
<ul type="none">
   <li>
      $${
         \large 
         \color{cyan}All \space 
         \color{cyan}endpoints \space 
         \color{cyan}return \space 
         \color{cyan}a \space 
         \color{violet}\textbf{JSON} \space 
         \color{cyan}object! \space
      }$$
   </li>
</ul> 

### API MAP
- `hostname`
    - `/`
    - `/public`
    - `/test`
    - `/404`
    - `/api/auth`
        - `/status`
        - `/signup`
        - `/login`
        - `/discord/login`
        - `/discord/redirect`
        - `/get-users`
        - `/get-user/:id`
        - `/logout`
    - `/api/workouts`
        - `/get/one/:id`
        - `/get/mine`
        - `/get/all`
        - `/create`
        - `/edit/:id`
        - `/delete/:id`

<!-- <font color=#0fb503>other color</font> -->
<!-- The above colors the text here. -->

<br />


### General Endpoints
- Prefix: `no prefix`

| Method | Endpoint  |             Function              | Access |
| :----: | :-------: | :-------------------------------: | :----: |
| `GET`  |    `/`    |         Returns API docs          |   🟡🟢   |
| `GET`  | `/public` | Serves all available public files |   🟡🟢   |
| `GET`  |  `/test`  |            Test route             |   🟡🟢   |
| `GET`  |  `/404`   | All unknown routes redirect here  |   🟡🟢   |

|   🔴   |   🟡   |   🟢   |
| :---: | :---: | :---: |
| Admin | User  | Guest |

### Auth Endpoints
- Prefix: `/api/auth`
- To Build a URL combine: `prefix` + `endpoint`
- Example: `/api/auth/status` - Returns Auth Status

| Method | Endpoint (add prefix) |                Function                | Access |
| :----: | :-------------------: | :------------------------------------: | :----: |
| `GET`  |       `/status`       |          Returns Auth status           |   🟡🟢   |
| `GET`  |   `/discord/login`    | Discord login route. Explained below.  |   🟢    |
| `GET`  |  `/discord/redirect`  | Used by the back end. Explained below. |   🟢    |
| `GET`  |     `/get-users`      |    Admin route. Get all users. NYI.    |   🔴    |
| `GET`  |    `/get-user/:id`    |  Admin route. Get a user by ID. NYI.   |   🔴    |
| `POST` |       `/signup`       |     Send a user object to Register     |   🟢    |
| `POST` |       `/login`        |      Send a user object to Login       |   🟢    |
| `POST` |       `/logout`       |      If logged in it logs you out      |   🟡    |

|   🔴   |   🟡   |   🟢   |
| :---: | :---: | :---: |
| Admin | User  | Guest |

### Discord Login (via OAuth2) - How it works
1. Send a `GET` request to `/discord/login`. 
2. It redirects you to Discord for Authorization.
3. You are asked to **Authorize** and then Redirected to `/discord/redirect` and an authorization **Query Parameter** is attached.
   - Example: `/discord/redirect?code=QueryParameter`
4. **Successful Login (Authorized)**
   - You are logged in and receive a user JSON object. 
   - Example: `{ user: {...}, session: {...} }`
5. **Unsuccessful Login (Unauthorized)**
   - You are NOT logged in and you receive a JSON object. 
   - Example: `{ user: null, errors: {...} }`
- Additionally, a session is created for you, and the experience is the same as a local login. 

### Workouts Endpoints
- Prefix: `/api/workouts`
- To Build a URL combine: `prefix` + `endpoint`
- Example: `/api/workouts/get/one/:id` - Returns a single workout by ID

|  Method  | Endpoint (add prefix) |             Function              | Access |
| :------: | :-------------------: | :-------------------------------: | :----: |
|  `GET`   |    `/get/one/:id`     |        Get a workout by ID        |   🟡🟢   |
|  `GET`   |      `/get/mine`      | Get the logged in user's workouts |   🟡🟢   |
|  `GET`   |      `/get/all`       |         Get all workouts          |   🟡🟢   |
|  `POST`  |       `/create`       |         Create a workout          |   🟡🟢   |
|  `PUT`   |      `/edit/:id`      |       Edit a workout by ID        |   🟡🟢   |
| `DELETE` |     `/delete/:id`     |      Delete a workout by ID       |   🟡🟢   |

|   🔴   |   🟡   |   🟢   |
| :---: | :---: | :---: |
| Admin | User  | Guest |

<br />



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

