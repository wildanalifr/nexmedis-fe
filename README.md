# nexmedis-fe

This project using Vue.js 3 with Composition API, Pinia, Tailwind CSS, Vue Router, vee-validate.

## Explanation

There's two route /login for authentication and /homepage. After Login it will get token and user then save in localstorage, in /homepage is landing page for user also will display list of users from api. If user not login yet, will direct to /login.

For CRUD table, using /dashboard. In /dashboard there's table of users from reqres.in. After create/update/delete not automatically change data by reqres.in response.

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
