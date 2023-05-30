# dps-client
Web server that acts like socket server and serves svelte pages that display changes from dps-tracker-local(https://github.com/WickedyWick/dps-tracker-local) in real time.

Can create room with password on /CreateRoom route
Access room on /Track (optional params are Id and Pwd that automatically auths you and show data)
Can be used as overlay on OBS on /TrackObs (same optional params)

# Dependencies
Redis db
Redis database is used to store dps and room data that can be retrieved at any time

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
