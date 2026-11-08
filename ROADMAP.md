# Roadmap: Build Your Own Libraries, Packages and Utils

You start by writing one small function. You finish with real packages on npm that are tested, documented and used by a real app.

Everything happens in this repo:

- `src/` is the React app. You use it to try every package you build.
- `packages/` holds your packages. You create this folder in Step 3.

## How to use this file

1. **Do the steps in order.** Each step uses what you built before it.
2. **Write the logic yourself.** This file gives you the setup files in full, because they are nearly the same every time. The functions are your job.
3. **Build first, then read the real library.** Each step links to popular libraries that solve the same problem. Their code makes much more sense after you have tried it yourself.
4. **Commit after every small win**, and tick the boxes as you go.
5. **Replace `@yourname`** with your npm username everywhere.
6. **Run commands from the repo root** unless a step says otherwise.
7. **Stuck?** Check [Common errors](#common-errors). When you finish a step, ask for a code review instead of the answer. You learn more from fixing your own code.

## Your progress

Times are rough guesses at about one hour a day. The whole roadmap is about 5 to 6 months. Going slower is fine.

- [ ] [Step 0: Get ready](#step-0-get-ready) (1 day)
- [ ] [Step 1: Write good functions](#step-1-write-good-functions) (1 week)
- [ ] [Step 2: Test your functions](#step-2-test-your-functions) (1 week)
- [ ] [Step 3: Turn your functions into a package](#step-3-turn-your-functions-into-a-package) (2 to 3 days)
- [ ] [Step 4: Publish to npm](#step-4-publish-to-npm) (2 to 3 days)
- [ ] [Step 5: Add a build and types](#step-5-add-a-build-and-types) (1 week)
- [ ] [Step 6: Build libraries that remember things](#step-6-build-libraries-that-remember-things) (2 weeks)
- [ ] [Step 7: Design a bigger API](#step-7-design-a-bigger-api) (2 to 3 weeks)
- [ ] [Step 8: Build React hooks](#step-8-build-react-hooks) (2 weeks)
- [ ] [Step 9: Build a UI component library](#step-9-build-a-ui-component-library) (4 weeks)
- [ ] [Step 10: Build a CLI tool](#step-10-build-a-cli-tool) (1 week)
- [ ] [Step 11: Release like a professional](#step-11-release-like-a-professional) (1 week)
- [ ] [Step 12: Final project](#step-12-final-project) (4 weeks)

## Words you need

| Word | What it means |
|---|---|
| **Util** | A small helper function that does one job, like `clamp`. |
| **Module** | One JavaScript file that exports things. |
| **Library** | Code made for other code to use. |
| **Package** | A folder with a `package.json` that can be installed. Libraries are shipped as packages. |
| **npm** | The tool you run (`npm install`) and the public website that stores packages. |
| **Scope** | The `@yourname/` part of a package name. It stops name clashes. |
| **Dependency** | A package your code needs in order to run. |
| **Dev dependency** | A package you need only while building and testing, like Vitest. |
| **Peer dependency** | A package your library needs but the app must provide, like React. |
| **Workspace** | A package that lives in the same repo as others. npm links them together. |
| **Bundler** | A tool that combines and transforms your files. Vite is your bundler. |
| **Tree shaking** | When a bundler removes code that nobody imports. |
| **ESM / CJS** | ESM is modern `import`/`export`. CJS is the older `require()`. |
| **Semver** | Version numbers in the form `MAJOR.MINOR.PATCH`, like `1.4.2`. |
| **`.d.ts` file** | A file that describes your functions so editors can show autocomplete. |

## Rules of a good library

Come back to this list at every step.

1. **Do one job.** If you can't explain it in one sentence, split it.
2. **Keep the public API small.** Everything you export is a promise. Adding is easy. Removing breaks people.
3. **Use clear names.** People read your function names far more often than your code.
4. **Don't surprise people.** Don't change their inputs, don't print to the console, and don't touch global things on import.
5. **Give helpful errors.** Say what went wrong and how to fix it.
6. **Avoid dependencies.** Each one is more code and more risk for everyone who installs you.
7. **Never break people by accident.** Follow semver.
8. **Show examples.** A README with a working example beats a long explanation.

## What the repo looks like at the end

```text
internals/
├─ src/                    The React app
│  └─ demos/               One demo file for each package
├─ packages/
│  ├─ utils/               Step 3
│  ├─ emitter/             Step 6
│  ├─ store/               Step 6
│  ├─ validate/            Step 7
│  ├─ http/                Step 7
│  ├─ hooks/               Step 8
│  ├─ ui/                  Step 9
│  ├─ create-package/      Step 10
│  └─ form/                Step 12
├─ .changeset/             Step 11
├─ .github/workflows/      Step 11
├─ package.json            The root. Private. Lists the workspaces.
└─ ROADMAP.md              This file
```

---

## Step 0: Get ready

**Goal:** Save your work with Git, create an npm account, and understand `import` and `export`.

**Do this:**

1. Save the project with Git:

   ```bash
   git init
   git add .
   git commit -m "Set up React, Vite and Tailwind"
   git branch -M main
   ```

   If Git asks who you are, run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`, then commit again.

2. Create an empty repo on GitHub and push to it. GitHub shows you the commands after you create it.
3. Create a free account at [npmjs.com](https://www.npmjs.com/). Your username becomes your scope, so `sam` gets `@sam/utils`.
4. Delete the leftover starter files: `src/assets/` and `public/icons.svg`. Keep `public/favicon.svg`.

**Learn:**

- [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- The difference between a named export (`export function clamp`) and a default export. Use named exports in libraries, because people import exactly what they need and the names stay the same everywhere.
- Always write the file extension in imports: `./clamp.js`, not `./clamp`. Vite forgives a missing extension, but Node does not, and your packages must work in both.

**Project: your first module.** Create `src/utils/greet.js`:

```js
export function greet(name) {
  return `Hello, ${name}!`
}
```

Import it in `src/App.jsx` and show the result on the page.

**Done when:**

- [ ] `git log` shows your commit, and the code is on GitHub
- [ ] You have an npm account
- [ ] The page shows a message from `greet()`
- [ ] You can explain named and default exports to a friend

---

## Step 1: Write good functions

**Goal:** Learn what makes a function easy for other people to use.

**Learn:**

- Pure functions: the same input always gives the same output, and nothing else changes.
- Edge cases: empty lists, empty strings, zero, negative numbers, `null`.
- [JSDoc comments](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html): comments that give people autocomplete and docs in their editor.

**Project: a toolbox of functions in `src/utils/`.** Delete `greet.js`. Here is one finished example to copy the style from:

```js
// src/utils/clamp.js

/**
 * Keep a number between a minimum and a maximum.
 * @param {number} value The number to limit.
 * @param {number} min The lowest allowed result.
 * @param {number} max The highest allowed result.
 * @returns {number} The limited number.
 * @example
 * clamp(15, 0, 10) // 10
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
```

Now write these yourself:

| Function | Example | What it teaches |
|---|---|---|
| `unique(list)` | `unique([1, 1, 2])` gives `[1, 2]` | Not changing the input |
| `chunk(list, size)` | `chunk([1, 2, 3], 2)` gives `[[1, 2], [3]]` | Bad input. What if `size` is 0? |
| `groupBy(list, getKey)` | `groupBy(['ant', 'bee'], (w) => w[0])` gives `{ a: ['ant'], b: ['bee'] }` | Taking a function as an argument |
| `pick(obj, keys)` | `pick({ a: 1, b: 2 }, ['a'])` gives `{ a: 1 }` | Working with objects |
| `omit(obj, keys)` | `omit({ a: 1, b: 2 }, ['a'])` gives `{ b: 2 }` | Copying rather than changing |
| `capitalize(text)` | `capitalize('hello')` gives `'Hello'` | Empty strings |
| `slugify(text)` | `slugify('Hello, World!')` gives `'hello-world'` | Regular expressions |
| `truncate(text, length)` | `truncate('hello world', 5)` gives `'hello…'` | Choosing a rule and documenting it |
| `formatBytes(bytes)` | `formatBytes(1536)` gives `'1.5 KB'` | Rounding and units |
| `isEmpty(value)` | `isEmpty([])` and `isEmpty('')` give `true` | Checking types |
| `cn(...parts)` | `cn('p-2', false, 'text-lg')` gives `'p-2 text-lg'` | Any number of arguments. You use it in Step 9. |

**Rules for each function:**

- One function per file. The file name matches the function name.
- Named exports only.
- Never change the input.
- JSDoc with at least one `@example`.
- Decide what bad input does (return something or throw an error) and write it in the JSDoc.

Then create `src/utils/index.js`, which re-exports everything:

```js
export { clamp } from './clamp.js'
export { unique } from './unique.js'
// ...and the rest
```

**Show it in the app:** Create `src/demos/UtilsDemo.jsx`, show a few functions working, and render it from `App.jsx`. You add one demo file per package from now on.

**Done when:**

- [ ] All 12 functions are written
- [ ] Each one has JSDoc, and your editor shows it when you hover over the name
- [ ] The app imports them all from `./utils/index.js`
- [ ] `npm run lint` passes

**Read after:** [es-toolkit](https://github.com/toss/es-toolkit), [just](https://github.com/angus-c/just) and [clsx](https://github.com/lukeed/clsx). Compare their versions with yours. What cases did they think of that you didn't?

---

## Step 2: Test your functions

**Goal:** Prove your code works, so you can change it later without fear.

**Learn:**

- The shape of a test: set things up, run the code, check the result.
- [Vitest basics](https://vitest.dev/guide/) and [mocking](https://vitest.dev/guide/mocking): `vi.fn()` and fake timers.
- How to test the weird cases as well as the normal ones.

**Setup:**

```bash
npm install -D vitest @vitest/coverage-v8
```

In the root `package.json`, add this to `scripts`:

```json
"test": "vitest"
```

Add `coverage` to `.gitignore`.

Put each test next to its code:

```js
// src/utils/clamp.test.js
import { describe, expect, it } from 'vitest'
import { clamp } from './clamp.js'

describe('clamp', () => {
  it('returns the max when the value is too high', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('returns the min when the value is too low', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('returns the value when it is in range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
})
```

| Command | What it does |
|---|---|
| `npm test` | Runs tests and reruns them when you save |
| `npx vitest run` | Runs tests once |
| `npx vitest run --coverage` | Also shows which lines your tests never ran |

**Project: test everything, then add timing functions.** Test all your Step 1 functions. Then add these, writing the test **before** the code:

| Function | What it does | What it teaches |
|---|---|---|
| `sleep(ms)` | A promise that resolves after `ms` | Promises |
| `once(fn)` | Runs `fn` only the first time | Closures |
| `memoize(fn)` | Remembers results for inputs it has seen | `Map` |
| `debounce(fn, wait)` | Runs `fn` only after calls stop. Has a `.cancel()` method. | Timers, like a search box |
| `throttle(fn, wait)` | Runs `fn` at most once per `wait` | Timers, like scrolling |
| `retry(fn, { times, delay })` | Tries an async function again if it fails | Async loops and errors |

Timing tests should not really wait. Use fake timers:

```js
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { debounce } from './debounce.js'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it('runs once, after the calls stop', () => {
  const fn = vi.fn()
  const debounced = debounce(fn, 100)

  debounced()
  debounced()
  expect(fn).not.toHaveBeenCalled()

  vi.advanceTimersByTime(100)
  expect(fn).toHaveBeenCalledTimes(1)
})
```

**Show it in the app:** Add a search box that uses `debounce`, and log when it fires.

**Done when:**

- [ ] All 18 functions have tests, including at least one edge case each
- [ ] Coverage is above 90%
- [ ] You broke a function on purpose and watched its test fail

**Read after:** [lodash's debounce](https://github.com/lodash/lodash) (search the repo for it, and see how many cases it handles) and [p-retry](https://github.com/sindresorhus/p-retry).

---

## Step 3: Turn your functions into a package

**Goal:** Understand what a package is by making one and importing it by name.

**Learn:**

- What `package.json` is for.
- [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces): several packages in one repo.
- `exports`: how a package decides what people are allowed to import.

**Project: `@yourname/utils`.**

1. Create the folder `packages/utils/src`.

2. Move every file from `src/utils/` into `packages/utils/src/`, including the tests.

3. Create `packages/utils/package.json`:

   ```json
   {
     "name": "@yourname/utils",
     "version": "0.1.0",
     "description": "Small helper functions",
     "type": "module",
     "exports": "./src/index.js",
     "files": ["src", "!src/**/*.test.js"],
     "sideEffects": false,
     "license": "MIT",
     "publishConfig": { "access": "public" }
   }
   ```

   | Field | What it does |
   |---|---|
   | `name` | The name people install. |
   | `version` | Versions below `1.0.0` mean "early, may still change". |
   | `description` | Shown on npm and in search results. |
   | `type` | `"module"` means `.js` files use `import` and `export`. |
   | `exports` | The only things people can import. This is your public API. |
   | `files` | What goes into the published package. `!` leaves things out, so tests stay home. |
   | `sideEffects` | `false` promises that importing does nothing by itself, so bundlers can remove unused code. |
   | `license` | What people may do with your code. See [choosealicense.com](https://choosealicense.com/). |
   | `publishConfig` | Scoped packages are private by default. This makes yours public. |

4. In the **root** `package.json`, add the workspaces list, and add your package to `dependencies`:

   ```json
   "workspaces": ["packages/*"],
   "dependencies": {
     "@yourname/utils": "*",
     "react": "...keep what is there",
     "react-dom": "...keep what is there"
   }
   ```

   `*` means "whatever version is here". That is safe only because the root is `"private": true` and never gets published. Real packages use real ranges like `^0.1.0`.

5. Install, which links everything together:

   ```bash
   npm install
   ```

6. Change the imports in your app:

   ```js
   import { clamp } from '@yourname/utils'
   ```

7. Add a `README.md` and a `LICENSE` file to `packages/utils/`.

**Look inside:**

- Open `node_modules/@yourname/`. `utils` is a link to your `packages/utils` folder. That is all a workspace is.
- Run `npm pack --dry-run -w packages/utils` to see exactly what would be published.
- Try `import { clamp } from '@yourname/utils/src/clamp.js'`. It fails, because that path is not in `exports`. Your public API is working. Undo it.

**Done when:**

- [ ] The app imports from `@yourname/utils`, with no relative path
- [ ] `npm run build` and `npx vitest run` both pass
- [ ] The dry run shows no test files
- [ ] You can explain every field in your `package.json`

**Stretch:** Add a second way in with subpath exports, so `@yourname/utils/array` works:

```json
"exports": {
  ".": "./src/index.js",
  "./array": "./src/array.js"
}
```

---

## Step 4: Publish to npm

**Goal:** Put your package on the internet and learn how versions work.

Plain JavaScript does not need a build step, so you can publish it right now. You add a build in Step 5, when you know why you want one.

> **Publishing is public.** You can unpublish within 72 hours of publishing, but that `name@version` can [never be used again](https://docs.npmjs.com/unpublishing-packages-from-the-registry). Never publish anything with a password or secret in it.

**Learn:** [semantic versioning](https://semver.org/).

| You changed | Version bump | Example |
|---|---|---|
| Fixed a bug | Patch | `1.4.2` to `1.4.3` |
| Added something new. Old code still works. | Minor | `1.4.2` to `1.5.0` |
| Changed or removed something. Old code may break. | Major | `1.4.2` to `2.0.0` |

The `^` in `^1.4.2` means "any `1.x` that is at least this version". Below 1.0 it is stricter: `^0.1.0` only matches `0.1.x`.

**Project: release `@yourname/utils` for real.**

1. Turn on two-factor authentication in your npm account settings. [Publishing requires it](https://docs.npmjs.com/about-two-factor-authentication), and Windows Hello or a security key both work.

2. Log in:

   ```bash
   npm login
   ```

3. Check the package for mistakes:

   ```bash
   npx publint packages/utils
   ```

4. Test it the way a stranger would, as a packed file in a project outside this repo. Add `*.tgz` to `.gitignore` first.

   ```bash
   npm pack -w packages/utils
   mkdir ../test-install
   cd ../test-install
   npm init -y
   npm install ../internals/yourname-utils-0.1.0.tgz
   node --input-type=module -e "import { clamp } from '@yourname/utils'; console.log(clamp(15, 0, 10))"
   ```

   It should print `10`. Go back to the repo with `cd ../internals`, then delete the `.tgz` file.

5. Do a practice run. Nothing gets uploaded:

   ```bash
   npm publish --dry-run -w packages/utils
   ```

6. Publish for real. npm may open your browser to confirm it's you.

   ```bash
   npm publish -w packages/utils
   ```

7. Open `https://www.npmjs.com/package/@yourname/utils`. That's yours.

8. Practise releasing with these changes. Commit after each one, because `npm version` here only changes the number.

   | Change | Command |
   |---|---|
   | Add a new function, `range(start, end)` | `npm version minor -w packages/utils` |
   | Fix a bug or handle an edge case | `npm version patch -w packages/utils` |

   After each one, update a `CHANGELOG.md` by hand and publish again.

**Done when:**

- [ ] Your package is on npmjs.com, with a README
- [ ] You installed it from npm in a separate project and it worked
- [ ] You have released a minor and a patch version
- [ ] You can answer: "If I rename `clamp`, what kind of version bump is that?"

---

## Step 5: Add a build and types

**Goal:** Learn what a build step does and when a library needs one.

Your package works without a build. Here is what a build adds:

- **Types:** `.d.ts` files give people autocomplete, even in plain JavaScript projects.
- **One tidy output:** your internal files can move around freely.
- **Compiling:** JSX can't run in Node or in a browser, so Step 9 can't work without a build.

**You still write only JavaScript.** The TypeScript compiler reads your JSDoc comments and writes the `.d.ts` files for you.

**Learn:**

- [Vite library mode](https://vite.dev/guide/build)
- What tree shaking is, and why `sideEffects: false` helps it.
- **Ship ESM only.** Bundlers and current Node versions all support it. Avoid top-level `await` in libraries, because it stops `require()` from loading your ESM. Add a CJS build only if a real user needs one.

**Project: build `@yourname/utils`.**

1. Install TypeScript at the root:

   ```bash
   npm install -D typescript
   ```

2. Create `packages/utils/vite.config.js`:

   ```js
   import { defineConfig } from 'vite'

   export default defineConfig({
     build: {
       lib: { entry: 'src/index.js', formats: ['es'], fileName: 'index' },
       minify: false,
       sourcemap: true,
     },
   })
   ```

   `minify: false` matters because Vite would otherwise rename your code to things like `function e(e, t, n)`. Libraries should stay readable. The app that installs your library does its own minifying.

3. Create `packages/utils/tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "allowJs": true,
       "checkJs": true,
       "noImplicitAny": false,
       "declaration": true,
       "emitDeclarationOnly": true,
       "rootDir": "src",
       "outDir": "dist",
       "target": "esnext",
       "module": "nodenext",
       "skipLibCheck": true
     },
     "include": ["src"],
     "exclude": ["src/**/*.test.js"]
   }
   ```

   `noImplicitAny: false` lets code without JSDoc still build. Anything undocumented shows up to your users as `any`, which means "no help from the editor", so keep writing JSDoc.

4. Update `packages/utils/package.json`. Keep your own version number.

   ```json
   {
     "name": "@yourname/utils",
     "version": "0.3.0",
     "description": "Small helper functions",
     "type": "module",
     "exports": {
       ".": {
         "types": "./dist/index.d.ts",
         "default": "./dist/index.js"
       }
     },
     "files": ["dist"],
     "sideEffects": false,
     "license": "MIT",
     "publishConfig": { "access": "public" },
     "scripts": {
       "build": "vite build && tsc -p .",
       "dev": "vite build --watch --no-emptyOutDir",
       "prepublishOnly": "npm run build"
     }
   }
   ```

   `types` must come first in `exports`, because the first match wins. `prepublishOnly` rebuilds before every publish, so you can't ship old code by accident.

5. Build and check:

   ```bash
   npm run build -w packages/utils
   npx publint packages/utils
   npx -p @arethetypeswrong/cli attw --pack packages/utils --profile esm-only
   ```

**Your daily routine changes now.** The app reads `dist/`, so it needs the package built. Use two terminals:

```bash
npm run dev -w packages/utils   # terminal 1: rebuilds the package when you save
npm run dev                     # terminal 2: runs the app
```

**Try this:**

- Open `dist/index.js` and read what Vite made. It's short and readable.
- Open `dist/index.d.ts` and see the types made from your JSDoc.
- Hover over `clamp` in your app. Your docs show up.
- **See tree shaking:** add a function with a very unusual string in it to your package, but don't use it in the app. Run `npm run build -w packages/utils`, then `npm run build`. Search `dist/assets/*.js` for the string. It isn't there.

**Done when:**

- [ ] `npm run build -w packages/utils` makes `dist/` with `.js` and `.d.ts` files
- [ ] `publint` and `attw` are both happy
- [ ] You released a new version, installed it elsewhere, and got autocomplete there
- [ ] You can explain when a library does not need a build

---

## Step 6: Build libraries that remember things

**Goal:** Go beyond single functions, to libraries that keep state inside them.

**Learn:**

- Closures as private storage.
- `Map` and `Set`.
- The subscribe pattern: `subscribe` returns a function that unsubscribes. You will see it everywhere.
- Factory functions (`createStore()`) versus classes, and why many small libraries prefer factories.
- Memory leaks: a listener that is never removed stays in memory forever.

**How to start any new package:**

1. Copy `packages/utils` to the new folder.
2. Delete its `dist/`, `src/` contents and `CHANGELOG.md`.
3. In `package.json`, change `name` and `description`, and set `version` to `0.1.0`.
4. Add the new package to the root `dependencies` as `"*"`, then run `npm install`.

(You will automate this in Step 10.)

### Project A: `@yourname/emitter`

A small event system.

```js
const bus = createEmitter()

const off = bus.on('login', (user) => console.log(user.name))
bus.once('logout', () => console.log('bye'))
bus.emit('login', { name: 'Sam' })
off()
bus.clear()
```

Test these cases:

- A listener removes itself while events are being sent.
- A listener throws an error. Do the others still run? Decide, then document it.
- The same function is added twice.
- `emit` with no listeners does nothing and does not crash.

**Read after:** [mitt](https://github.com/developit/mitt). It's so short you can read all of it.

### Project B: `@yourname/store`

A small state manager that works without React.

```js
const counter = createStore({ count: 0 })

counter.getState()                                   // { count: 0 }
counter.setState({ count: 1 })                       // merge in a new value
counter.setState((state) => ({ count: state.count + 1 })) // or use a function

const unsubscribe = counter.subscribe((state, previous) => {
  console.log(previous.count, 'became', state.count)
})
unsubscribe()
```

Test these cases:

- Setting a value that doesn't change anything does not notify listeners.
- A listener that unsubscribes during a notification.
- The old state object is never changed.

**Show it in the app:** Connect the store to a component using `useState` and `useEffect`. It's a bit awkward. Keep that in mind, because Step 8 has a better way.

**Stretch:** Add `persist(store, key)`, which saves state to `localStorage` and restores it on load.

**Read after:** [zustand](https://github.com/pmndrs/zustand). Its `src/vanilla.ts` is very close to what you just wrote.

**Done when:**

- [ ] Both packages are tested, built and published
- [ ] Both have a README with a working example
- [ ] Neither has any dependencies
- [ ] You can explain why `subscribe` returns a function

---

## Step 7: Design a bigger API

**Goal:** Practise API design, error handling, and packages that depend on each other.

**Learn:**

- Chaining: `v.string().min(2)`. Each call returns a new object rather than changing the old one.
- Recursion, for handling nested data.
- Custom error classes: `class HttpError extends Error`.
- [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal), for cancelling and timing out requests.
- Options objects: `retry(fn, { times: 3 })` is easier to read and extend than `retry(fn, 3, 100, true)`.

### Project A: `@yourname/validate`

Checks that data has the shape you expect.

```js
const userSchema = v.object({
  name: v.string().min(2),
  email: v.string().email(),
  age: v.number().min(18).optional(),
  tags: v.array(v.string()),
})

userSchema.safeParse(input)
// { success: true, data: { ... } }
// or
// { success: false, errors: [{ path: ['email'], message: 'Must be a valid email' }] }
```

Include:

- `string`, `number`, `boolean`, `array`, `object` and `optional`
- `.parse()`, which throws an error, and `.safeParse()`, which returns a result. Think about why having both is useful.
- Error paths for nested data, such as `['address', 'city']`
- Reporting **all** the errors, rather than stopping at the first

**Read after:** [zod](https://github.com/colinhacks/zod).

### Project B: `@yourname/http`

A friendly wrapper around `fetch`. It's your first package that depends on another of your packages: it uses `retry` from `@yourname/utils`.

```js
const api = createClient({
  baseUrl: 'https://example.com/api',
  timeout: 5000,
  retries: 2,
})

const users = await api.get('/users', { query: { page: 1 } })
await api.post('/users', { json: { name: 'Sam' } })

api.use({
  before(request) { /* add a header */ },
  after(response) { /* log it */ },
})
```

Include:

- Base URL, query params and automatic JSON
- An `HttpError` with `status` and `response`, thrown on 4xx and 5xx responses
- Timeouts and cancelling
- Retries on network errors and 5xx responses only. Think about why you shouldn't retry a 400.

Test it without a network by faking `fetch`:

```js
vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"ok":true}')))
```

**Setup for a package that depends on another:**

1. In `packages/http/package.json`, use the version of `utils` you actually have:

   ```json
   "dependencies": { "@yourname/utils": "^0.3.0" }
   ```

2. In `packages/http/vite.config.js`, tell Vite not to copy `utils` into your build:

   ```js
   rolldownOptions: { external: [/^@yourname\//] },
   ```

   This goes inside `build`. Without it, every package would carry its own copy of the others.

3. In the root `package.json`, list what others depend on first, and add a script to build everything:

   ```json
   "workspaces": ["packages/utils", "packages/*"],
   "scripts": {
     "build:packages": "npm run build --workspaces --if-present"
   }
   ```

   Keep your other scripts. Without this order, packages build alphabetically, so `http` builds before `utils` and fails.

> **Watch out for version ranges.** If `utils` goes from `0.3.0` to `0.4.0`, then `^0.3.0` in `http` no longer matches your local copy. npm then looks on the registry, so you get a `404` if that version was never published, or a stale copy from npm if it was. Update the range in `http`, then run `npm install`. Step 11 automates this.

Always publish `utils` before `http`.

**Show it in the app:** Build a sign-up form validated by `validate`, and fetch a list from a public API with `http`.

**Read after:** [ky](https://github.com/sindresorhus/ky).

**Done when:**

- [ ] Both packages are tested, built and published
- [ ] `dist/index.js` in `http` contains `from "@yourname/utils"`, with no copied code
- [ ] A clean build works: delete all the `dist` folders, then run `npm run build:packages`
- [ ] Your error messages tell people how to fix the problem

---

## Step 8: Build React hooks

**Goal:** Build libraries for React, and learn peer dependencies.

**Learn:**

- [Custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- **Peer dependencies:** your library uses React, but the app provides it. Two copies of React in one app breaks hooks.
- [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore): the right way to connect outside state to React.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

**Setup:**

```bash
npm install -D jsdom @testing-library/react @testing-library/dom @testing-library/user-event
```

`packages/hooks/package.json` needs this, and React must **not** be in `dependencies`:

```json
"peerDependencies": { "react": ">=18" }
```

`packages/hooks/vite.config.js`:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: { entry: 'src/index.js', formats: ['es'], fileName: 'index' },
    minify: false,
    sourcemap: true,
    rolldownOptions: { external: [/^react($|\/)/] },
  },
})
```

The pattern matches `react` and anything starting with `react/`. Older tutorials call this option `rollupOptions`. The current Vite name is `rolldownOptions`.

### Project A: `@yourname/hooks`

| Hook | What it does | What it teaches |
|---|---|---|
| `useToggle(initial)` | Returns `[on, toggle]` | Stable functions with `useCallback` |
| `useDebouncedValue(value, wait)` | A value that updates late | Effect cleanup |
| `useLocalStorage(key, initial)` | State that survives a reload | Lazy setup, bad JSON, syncing between tabs |
| `useMediaQuery(query)` | `true` when a CSS query matches | `useSyncExternalStore` |
| `useClickOutside(ref, handler)` | Runs when you click elsewhere | Document listeners and cleanup |
| `useAsync(fn)` | Returns data, loading and error | Stale results and race conditions |

Test hooks with `renderHook`. The comment on the first line gives the test a fake browser:

```js
// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { expect, it } from 'vitest'
import { useToggle } from './useToggle.js'

it('toggles', () => {
  const { result } = renderHook(() => useToggle())
  expect(result.current[0]).toBe(false)

  act(() => result.current[1]())
  expect(result.current[0]).toBe(true)
})
```

The fake browser doesn't include `window.matchMedia`, so stub it in your `useMediaQuery` tests.

**Rules for hooks:**

- Clean up everything: timers, listeners and subscriptions.
- Only touch `window` inside effects, never at the top of a file. Then your hooks won't crash when an app renders on a server.
- Keep returned functions stable, so they don't cause extra renders.

**Try this:** Remove `rolldownOptions`, rebuild, and compare the size of `dist/index.js`. Then put it back. That extra code is why React must be a peer dependency.

### Project B: `@yourname/store/react`

Go back to your store and add React support as a separate entry, so people who don't use React never load it.

1. Create `packages/store/src/react.js`, exporting `useStore(store, selector)` built on `useSyncExternalStore`.

2. Give Vite two entries in `packages/store/vite.config.js`:

   ```js
   lib: {
     entry: { index: 'src/index.js', react: 'src/react.js' },
     formats: ['es'],
   },
   ```

   Remove `fileName`, and add `rolldownOptions: { external: [/^react($|\/)/] }` inside `build`.

3. Update `packages/store/package.json`:

   ```json
   "exports": {
     ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
     "./react": { "types": "./dist/react.d.ts", "default": "./dist/react.js" }
   },
   "peerDependencies": { "react": ">=18" },
   "peerDependenciesMeta": { "react": { "optional": true } }
   ```

**Show it in the app:** Replace your awkward Step 6 code with `useStore`, then compare the two.

**Read after:** [useHooks](https://github.com/uidotdev/usehooks). Also re-read [zustand](https://github.com/pmndrs/zustand), which you can now follow completely.

**Done when:**

- [ ] All hooks are tested, including their cleanup
- [ ] `dist/index.js` imports from `"react"` and doesn't contain React's code
- [ ] `import { useStore } from '@yourname/store/react'` works
- [ ] You can explain why React is a peer dependency

---

## Step 9: Build a UI component library

**Goal:** Build components other people can restyle, control and use with only a keyboard.

**Learn:**

- Passing through `className` and `...props`, so people stay in control.
- Controlled and uncontrolled components.
- Compound components, using context: `<Tabs><Tabs.List>...`.
- **Accessibility.** The [ARIA patterns guide](https://www.w3.org/WAI/ARIA/apg/patterns/) shows the correct keyboard behaviour for each kind of component.
- [Testing by role](https://testing-library.com/docs/queries/about): finding things the way a user does.

**Setup:**

`packages/ui/package.json`:

```json
"peerDependencies": { "react": ">=19", "react-dom": ">=19" }
```

React 19 lets `ref` be a normal prop, which is simpler than the older `forwardRef`, so this package requires React 19.

`packages/ui/vite.config.js`:

```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: 'src/index.js', formats: ['es'], fileName: 'index' },
    minify: false,
    sourcemap: true,
    rolldownOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^@yourname\//],
    },
  },
})
```

In `packages/ui/tsconfig.json`, add `"jsx": "react-jsx"` to `compilerOptions`, and add `"src/**/*.test.jsx"` to `exclude`.

**Testing components:**

```jsx
// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Button } from './Button.jsx'

afterEach(cleanup)

it('calls onClick', async () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Save</Button>)

  await userEvent.click(screen.getByRole('button', { name: 'Save' }))

  expect(onClick).toHaveBeenCalledTimes(1)
})
```

`afterEach(cleanup)` clears the page between tests. Without it, buttons from earlier tests are still there.

**Project: `@yourname/ui`.** Build these in order. Each one is harder than the last.

| Component | What it teaches |
|---|---|
| `Button` | Variants and sizes, `className` and `...props`, using your `cn` function |
| `Input` | Connecting a label and an error message using `useId` |
| `Modal` | Using `<dialog>`, focus, closing with Escape, giving focus back afterwards |
| `Tabs` | Compound components, context, arrow keys |
| `Tooltip` | Showing on both hover **and** keyboard focus |
| `Toast` | Portals, timers, a shared store. Use your `@yourname/store`. |

For `Modal`, see [`<dialog>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). If a test says `showModal is not a function`, the fake browser doesn't support it, so stub it in your test.

**How Tailwind finds your classes:**

- **Inside this repo:** it just works. Tailwind scans `packages/ui/src` by itself.
- **For anyone who installs your package from npm:** Tailwind ignores `node_modules`, so your classes would be missing. Tell them in your README to add this to their CSS:

  ```css
  @import "tailwindcss";
  @source "../node_modules/@yourname/ui/dist";
  ```

  This is explained in [Tailwind's docs](https://tailwindcss.com/docs/detecting-classes-in-source-files).

**Stretch:**

- Use [`@theme`](https://tailwindcss.com/docs/theme) so people can change your colours.
- `cn('p-2', 'p-4')` keeps both classes. Learn why that's a problem, then read [tailwind-merge](https://github.com/dcastil/tailwind-merge).

**Read after:** [Radix Primitives](https://github.com/radix-ui/primitives) for behaviour and [shadcn/ui](https://github.com/shadcn-ui/ui) for a different way to share components.

**Done when:**

- [ ] Every component works with **only a keyboard**. Unplug your mouse and try.
- [ ] Every component works in light and dark mode
- [ ] Tests find elements by role, not by class name
- [ ] Each component has a demo in the app
- [ ] The README explains the `@source` setup

---

## Step 10: Build a CLI tool

**Goal:** Build a command people can run in a terminal. You'll use it to automate your own work.

**Learn:**

- The `bin` field in `package.json`.
- The first line of a CLI file, `#!/usr/bin/env node`.
- [`parseArgs`](https://nodejs.org/api/util.html) from `node:util`, plus `node:fs/promises` and `node:path`.
- Exit codes: `process.exitCode = 1` means something went wrong.
- Keeping the logic separate from the command line, so you can test it.

**Project: `@yourname/create-package`.** Automate "How to start any new package" from Step 6.

```bash
npx create-package my-lib
npx create-package my-hooks --react
npx create-package --help
```

It creates `packages/my-lib/` with `package.json`, `vite.config.js`, `tsconfig.json`, `README.md`, `src/index.js` and `src/index.test.js`.

**Setup:** `packages/create-package/package.json`:

```json
{
  "name": "@yourname/create-package",
  "version": "0.1.0",
  "type": "module",
  "bin": { "create-package": "./bin/cli.js" },
  "files": ["bin", "src"],
  "license": "MIT",
  "publishConfig": { "access": "public" }
}
```

`packages/create-package/bin/cli.js` starts like this:

```js
#!/usr/bin/env node
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    help: { type: 'boolean', short: 'h' },
    react: { type: 'boolean' },
  },
})
```

Run `npm install` once, and `npx create-package` works everywhere in the repo.

**Requirements:**

- `--react` adds the peer dependency and the Vite externals.
- A clear error and exit code 1 when the folder already exists or the name is invalid.
- `--help` prints how to use it.
- **No dependencies.** Node's built-in modules are enough.
- Keep the logic in `src/createPackage.js`, and keep `bin/cli.js` tiny. Test `createPackage` by pointing it at a temporary folder made with `fs.mkdtemp`.

**Stretch:** After publishing, `npm create @yourname/package my-lib` works from anywhere. npm turns that into `@yourname/create-package`.

**Read after:** [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite), the same kind of tool you used to start this project.

**Done when:**

- [ ] You used your tool to create a real package, and it builds and tests with no edits
- [ ] Mistakes give helpful messages and exit code 1
- [ ] The logic has tests

---

## Step 11: Release like a professional

**Goal:** Stop doing releases by hand, and let tools catch your mistakes.

### Project A: automatic checks

Create `.github/workflows/ci.yml`. Now GitHub checks every push.

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build:packages
      - run: npx vitest run
      - run: npm run build
```

Packages build before the tests because the app imports from `dist/`.

### Project B: versions and changelogs with Changesets

[Changesets](https://github.com/changesets/changesets) fixes the version range problem from Step 7. When a package changes, it updates every package that depends on it and writes the changelogs.

**Setup:**

```bash
npm install -D @changesets/cli
npx changeset init
```

`init` asks questions in your terminal. Answer **No** to the GitHub integration for now. Then open `.changeset/config.json` and set `"access": "public"`.

**Your new release routine:**

| When | Command | What it does |
|---|---|---|
| After each change | `npx changeset` | You pick the packages and the bump type, and describe the change. Commit the file it creates. |
| Ready to release | `npx changeset version` | Updates versions, ranges in other packages, and changelogs |
| Next | `npm install` | Updates the lockfile. Commit everything. |
| Next | `npm run build:packages` | Builds it all |
| Next | `npx changeset publish` | Publishes whatever is new, and creates git tags |
| Last | `git push --follow-tags` | Sends commits and tags to GitHub |

### Project C: publish from GitHub with no passwords

[Trusted publishing](https://docs.npmjs.com/trusted-publishers) lets GitHub publish for you without any saved token.

- It needs npm 11.5.1 or newer and Node 22.14 or newer. You have both.
- Set it up separately for each package, in that package's settings on npmjs.com. You do this after your first manual publish.
- Finish a first publish within 2 days of setting it up, or the setup expires.
- The workflow needs the permission `id-token: write`.
- npm adds [provenance](https://docs.npmjs.com/trusted-publishers) by itself, which proves the package came from your repo.
- Every `package.json` needs a `repository` field that points at your GitHub repo.

Use [changesets/action](https://github.com/changesets/action). It opens a "Version Packages" pull request, and merging that pull request publishes everything.

### Project D: docs and size

- Build a docs site with [VitePress](https://vitepress.dev/), or turn your `src/demos/` app into one.
- Add [size-limit](https://github.com/ai/size-limit), so CI fails if a package suddenly gets bigger.

**Done when:**

- [ ] A failing test on a pull request shows a red X on GitHub
- [ ] You released using Changesets, and a package that depends on another got its range updated
- [ ] Each package has a generated `CHANGELOG.md`
- [ ] A package has been published from GitHub, with no token saved anywhere

---

## Step 12: Final project

**Goal:** Use everything you've learned on a library and a real app.

### Library: `@yourname/form`

A form library built from your own packages. `store` holds the state, `validate` checks the data, and `utils` provides the helpers.

```js
const form = createForm({
  initialValues: { title: '', amount: 0 },
  schema: v.object({
    title: v.string().min(2),
    amount: v.number().min(1),
  }),
  onSubmit: async (values) => {
    await api.post('/expenses', { json: values })
  },
})
```

```jsx
import { useField, useFormState } from '@yourname/form/react'

function TitleField() {
  const { value, error, onChange, onBlur } = useField(form, 'title')
  // Only this field re-renders when its value changes.
}
```

**Include:**

- Values, errors, `touched`, `dirty` and `isSubmitting`
- Showing errors only after a field has been touched
- Nested fields such as `address.city`
- Fields that re-render alone, using selectors from your store
- Plain JavaScript in the main entry, and React in `/react`

**Setup:** Packages must build in the order they depend on each other, so update the root `package.json`:

```json
"workspaces": ["packages/utils", "packages/store", "packages/validate", "packages/hooks", "packages/*"]
```

**Read after:** [React Hook Form](https://github.com/react-hook-form/react-hook-form).

### App: an expense tracker in `src/`

Build it with your own packages wherever you can:

| Feature | Package |
|---|---|
| Add and edit expense forms | `form`, `validate`, `ui` |
| Totals and grouping by month | `utils` |
| Saved between visits | `store`, `hooks` |
| Currency rates from a public API | `http` |
| Search box and confirmation dialogs | `utils`, `ui` |
| "Saved!" messages | `ui`, `emitter` |

Using your own libraries in a real app shows you what's annoying about them. **Write down everything that annoys you, then fix it and release a new version.** This is the most valuable part of the whole roadmap.

**Done when:**

- [ ] The app is deployed, and you have a link to share
- [ ] Every package has a README, tests, a changelog and working CI
- [ ] You released at least one breaking change, with a major version and a note on how to upgrade
- [ ] Someone else installed one of your packages and used it

---

## Release checklist

Use this before every release.

- [ ] `npx vitest run` passes
- [ ] `npm run lint` passes
- [ ] `npm run build:packages` passes
- [ ] `npx publint packages/NAME` is happy
- [ ] `npm pack --dry-run -w packages/NAME` shows only the files you want
- [ ] The version bump is correct: patch, minor or major
- [ ] The changelog is updated
- [ ] The README still matches the code
- [ ] Packages this one depends on are published first

## Common errors

| What you see | Why | Fix |
|---|---|---|
| `404` during `npm install`, for your own package | A range like `^0.3.0` no longer matches your local version | Update the range to match, then run `npm install` |
| `Cannot find module '@yourname/utils'` (TS2307) | `tsc` ran before that package was built | Put it earlier in `workspaces`, or build it first |
| `Parameter 'x' implicitly has an 'any' type` (TS7006) | `noImplicitAny: false` is missing from `tsconfig.json` | Add it, and add JSDoc |
| `Failed to resolve import "@yourname/..."` | The package isn't linked or built yet | Run `npm install`, then `npm run build -w packages/NAME` |
| `ERR_PACKAGE_PATH_NOT_EXPORTED` or `Missing "./x" specifier` | That path isn't in `exports` | Import from a public path, or add it to `exports` |
| `ERR_MODULE_NOT_FOUND` for `./clamp` | Missing file extension | Write `./clamp.js` |
| `Invalid hook call` | Two copies of React | Make React external and a peer dependency |
| `402 Payment Required` on publish | Scoped packages are private by default | Add `"publishConfig": { "access": "public" }` |
| `403 Forbidden` on publish | 2FA is off, the scope isn't yours, or that version already exists | Check each one. Bump the version if it exists. |
| Tailwind styles are missing from an installed package | Tailwind doesn't scan `node_modules` | Add `@source` to the app's CSS |
| The app doesn't show your package changes | The app reads `dist/`, which is out of date | Run `npm run dev -w packages/NAME` in a second terminal |
| `.d.ts` files vanish while developing | `vite build --watch` empties `dist/` | Use `--no-emptyOutDir`, as in Step 5 |
| Test says `window is not defined` | The test needs a fake browser | Add `// @vitest-environment jsdom` as the first line |

## After the roadmap

- **Contribute to open source.** Pick a small library you use and fix a small bug. Reading other people's code is a skill of its own.
- **Maintain one package properly.** Answer issues, write upgrade guides, and say no to features.
- **Learn TypeScript**, when you are ready. Most large libraries use it, and your JSDoc has already taught you much of the thinking.
- **Try faster monorepo tools** such as pnpm or Turborepo, once npm workspaces feel slow.

## When this was last checked

Checked on 4 November 2026 with Node 24, npm 11.9, Vite 8.3, Vitest 5.1, TypeScript 7.0, Tailwind 4.3 and Changesets 3.0.

- **Tested on a throwaway copy of this repo:** workspaces, Vitest, packing and installing a package, the Vite library builds, `.d.ts` generation, React externals, subpath exports, the Tailwind `@source` setup, the CLI `bin` setup, and `changeset version`.
- **Not tested, because they need your own accounts:** a real `npm publish`, `changeset publish`, GitHub Actions and trusted publishing. Follow the official docs linked above if they differ.

Tools change quickly. If a tutorial disagrees with this file, check the tool's official docs.
