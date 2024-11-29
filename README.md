# nexmedis-fe

This project using Vue.js 3 with Composition API, Pinia, Tailwind CSS, Vue Router.

## Explanation

There's two route /login for authentication and /homepage. After Login it will get token and user then save in localstorage, in /homepage is landing page for user also will display list of users from api. If user not login yet, will direct to /login.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### For Login

Input Login Using username & password in reqres.in/api/users
