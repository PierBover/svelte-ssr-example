# Svelte SSR example

Features:
* Svelte 3
* SSR with hydration client-side
* Isomorphic (use the same components server-side and client-side)
* Hashed filenames
* Using Fastify but any Node server can be used

I was looking for an SSR example for Svelte but the only [one I could find](https://github.com/domingues/svelte-ssr-example) seemed unnecessarily complicated. So I decided to create this example which I think is more educational.

I'm a Rollup and Svelte noob. Don't hesitate to open an issue if I did something wrong.

### How to dev?
Run `npm run rollup-watch` and then on another terminal tab `npm run server-watch`. If you add a new file to `client/pages` you will need to restart Rollup's watch. I haven't found a way of having a config array and have it react on new file changes. This is not very elegant but it's better than manually doing `npm run start` whenever you want to refresh a change...

Instead of having two terminal tabs you could also create a new NPM command on `package.json` like this:
```
"dev": "npm run rollup-watch & npm run server-watch"
```
This would run those commands at the same time in parallel (note the single `&`). When you do `npm run dev` you will see lots of garbage messages because Nodemon will restart the server whenever Rollup bundles all pages.

### Why not Sapper?

Sapper apps respond the first request by doing SSR but after that it becomes a single-page-application (SPA) with code splitting. This is fancy but introduces a number of issues:

1. You will need to feed both server and client with data so you have no choice than to create an API. With a purely SSR'd app you really don't need to do that since you can query the DB and simply return HTML.

2. HTTP requests have to work in both Node and the browser. This shouldn't be a problem for public endpoints but it will be challenging if your API uses cookies or JWT for authentication.

3. After the initial request Sapper apps become a SPA. This introduces a number of issues typical of SPAs. Eg: forms are not filled when going back.

(If someone from the Sapper team reads this: It would be great if Sapper had a purely SSR mode *wink wink*)