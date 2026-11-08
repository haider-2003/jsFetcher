# Start Here: How to Learn This Step by Step

[ROADMAP.md](ROADMAP.md) shows the whole journey. This file shows you how to begin.

It covers your first 4 weeks, teaches testing from zero, and uses what you already know from building dashboards. After that, you continue from [Step 5 of the roadmap](ROADMAP.md#step-5-add-a-build-and-types).

**One change to the roadmap:** set up tests on your first day, not in Step 2. Tests tell you when your code is right, and that makes learning much easier.

## The one idea to remember

**A library is code you already write, moved out of one project so that any project can use it.**

You have probably written a `formatCurrency` function in a dashboard, then copied it into the next dashboard. Turn it into a package and the copying stops. That is the whole idea.

So you are not starting from zero. You already know JavaScript and React. You only need to add four skills:

| Skill | The question it answers |
|---|---|
| **Design** | How should people call my function? |
| **Testing** | How do I know it works? |
| **Packaging** | How do other people install it? |
| **Maintaining** | How do I change it without breaking people's apps? |

## Your first hour

Do this now. You will write and break your first test.

**1. Save your project with Git:**

```bash
git init
git add .
git commit -m "Set up React, Vite and Tailwind"
git branch -M main
```

If Git asks who you are, see [Step 0 of the roadmap](ROADMAP.md#step-0-get-ready).

**2. Install Vitest, the test tool:**

```bash
npm install -D vitest
```

In `package.json`, add this line inside `scripts`:

```json
"test": "vitest"
```

**3. Create your first test.** Make a new file:

```js
// src/utils/add.test.js
import { expect, it } from 'vitest'

function add(a, b) {
  return a + b
}

it('adds two numbers', () => {
  expect(add(2, 3)).toBe(5)
})
```

**4. Run it:**

```bash
npx vitest run
```

You should see:

```text
 Test Files  1 passed (1)
      Tests  1 passed (1)
```

**5. Break it on purpose.** This is the most important part. Change `toBe(5)` to `toBe(6)` and run it again:

```text
 FAIL  src/utils/add.test.js > adds two numbers
AssertionError: expected 5 to be 6 // Object.is equality

- Expected
+ Received

- 6
+ 5

 ❯ src/utils/add.test.js:8:21
      6|
      7| it('adds two numbers', () => {
      8|   expect(add(2, 3)).toBe(6)
       |                     ^
      9| })
```

Here is how to read that:

| Part | What it tells you |
|---|---|
| `FAIL ... > adds two numbers` | Which test failed |
| `expected 5 to be 6` | Your code gave 5, but the test wanted 6 |
| `- 6` and `+ 5` | `-` is what you wanted. `+` is what you got. |
| `add.test.js:8:21` | The file and line number. Line 8 here. |

You can ignore `Object.is equality`. It just means "exactly the same".

**6. Finish up.** Delete `add.test.js`, then commit:

```bash
git add .
git commit -m "Add Vitest"
```

You have now written a test and read a failure. That is the core of testing.

## What to build, in order

Every project solves a problem you have seen in dashboards.

| Order | The dashboard problem | What you build | Libraries you may know | Roadmap |
|---|---|---|---|---|
| 1 | KPI cards: "+25%", "$1,234.50", "1.5K" | `percentChange`, `formatCurrency`, `formatCompact` | numeral, Intl | Step 1 |
| 2 | Chart data: totals by month, sorted tables | `groupBy`, `sumBy`, `sortBy` | lodash | Step 1 |
| 3 | A search box that calls the API too often | `debounce` | lodash | Step 2 |
| 4 | Copying helpers between projects | `@yourname/utils` on npm | | Steps 3 to 5 |
| 5 | Filters shared by the chart and the table | `store`, `emitter` | Zustand, Redux | Step 6 |
| 6 | API calls with tokens, retries and errors | `http` | axios, ky | Step 7 |
| 7 | Checking API data and form data | `validate` | zod, yup | Step 7 |
| 8 | Saved filters, loading and error states | `hooks` | TanStack Query, useHooks | Step 8 |
| 9 | Buttons, modals and tabs in every dashboard | `ui` | MUI, shadcn/ui | Step 9 |
| 10 | Starting a new package quickly | `create-package` | create-vite | Step 10 |
| 11 | Filter forms and settings forms | `form` | React Hook Form | Step 12 |

Your first 4 weeks cover rows 1 to 4. Don't worry about the rest yet.

## How I would do it

If I were starting from where you are, this is what I would do:

1. **Start with problems I have already had.** A broken KPI card teaches more than a chapter of theory.
2. **Learn only what the next function needs.** If I need `Intl.NumberFormat`, I read that one page. I don't finish a course first.
3. **Write tests from day one.** Even very small ones.
4. **Do one small thing per session.** One finished function a day is great progress.
5. **Use everything in a real app.** You find a function's problems when you use it.
6. **Read the real library after trying it myself,** never before. Then the code answers questions I already have.
7. **Keep short notes.** At the end of each session, I would write three lines in a `NOTES.md` file: what I learned, what confused me, and what comes next. It makes starting again easy.

**What I would not do:**

- Try to hold the whole roadmap in my head. Only the current step matters.
- Start with the UI library. It looks fun, but it is one of the hardest projects.
- Ask AI to write the logic. You learn by struggling a little, so ask for hints and reviews instead.
- Skip breaking a test on purpose. A test you have never seen fail may not be testing anything.
- Wait until it's perfect. Version `0.1.0` is allowed to be small.

### The same 6 steps for every function

1. **Write how you want to call it.**
2. **List the cases** in plain words.
3. **Turn the cases into tests.**
4. **Write the simplest code** that could work, and run the tests.
5. **Fix it** until every test passes.
6. **Use it in the app,** then commit.

## Worked example: `percentChange`

Let's use those 6 steps on a real dashboard feature: the "+25% vs last month" on a KPI card. Type this yourself. Don't copy and paste.

### 1. Write how you want to call it

```js
percentChange(100, 125) // 25
percentChange(100, 80)  // -20
```

The old value comes first and the new value second, like reading left to right.

### 2. List the cases in plain words

- It went up: 100 to 125 gives 25.
- It went down: 100 to 80 gives -20.
- Nothing changed: 100 to 100 gives 0.
- **The old value was 0:** 0 to 50 means dividing by zero. What should happen?
- **The old value was negative:** -100 to -50 went **up**, so it should be positive.

The last two are the real bugs in dashboards. Thinking about them **before** coding is the skill you are learning.

For the zero case you must make a decision. I choose to return `null`, which means "can't be calculated", so the card can show "No data".

### 3. Turn the cases into tests

Each bullet becomes one test:

```js
// src/utils/percentChange.test.js
import { describe, expect, it } from 'vitest'
import { percentChange } from './percentChange.js'

describe('percentChange', () => {
  it('gives a positive number when the value goes up', () => {
    expect(percentChange(100, 125)).toBe(25)
  })

  it('gives a negative number when the value goes down', () => {
    expect(percentChange(100, 80)).toBe(-20)
  })

  it('gives 0 when nothing changed', () => {
    expect(percentChange(100, 100)).toBe(0)
  })

  it('gives null when the previous value is 0', () => {
    expect(percentChange(0, 50)).toBeNull()
  })

  it('treats a rise from a negative number as going up', () => {
    expect(percentChange(-100, -50)).toBe(50)
  })
})
```

Run `npx vitest run`. It fails with `Cannot find module './percentChange.js'`, which is correct because the code doesn't exist yet.

### 4. Write the simplest code

Use the formula you already know:

```js
// src/utils/percentChange.js
export function percentChange(previous, current) {
  return ((current - previous) / previous) * 100
}
```

Run the tests again:

```text
 ❯ src/utils/percentChange.test.js (5 tests | 2 failed)
     × gives null when the previous value is 0
     × treats a rise from a negative number as going up

AssertionError: expected Infinity to be null
AssertionError: expected -50 to be 50 // Object.is equality

      Tests  2 failed | 3 passed (5)
```

This is good news. Without tests, those two bugs would reach your dashboard as `Infinity%` and as a red arrow on a number that actually went up.

### 5. Fix it

Fix one failure at a time, then add JSDoc:

```js
// src/utils/percentChange.js

/**
 * Get the percent change between two values.
 * @param {number} previous The old value.
 * @param {number} current The new value.
 * @returns {number | null} The change in percent, or null if previous is 0.
 * @example
 * percentChange(100, 125) // 25
 */
export function percentChange(previous, current) {
  if (previous === 0) return null
  return ((current - previous) / Math.abs(previous)) * 100
}
```

```text
      Tests  5 passed (5)
```

### 6. Use it in the app, then commit

```jsx
// src/components/StatCard.jsx
import { percentChange } from '../utils/percentChange.js'

export function StatCard({ label, previous, current }) {
  const change = percentChange(previous, current)

  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm text-slate-500">{label}</h3>
      <p className="text-2xl font-semibold">{current}</p>
      <p>{change === null ? 'No data' : `${change > 0 ? '+' : ''}${change}%`}</p>
    </div>
  )
}
```

Show it in `App.jsx` with `<StatCard label="Revenue" previous={100} current={125} />`, then commit.

**Now try this:** Use `percentChange(3, 3.3)`. You get `9.999999999999993`, not `10`, because computers store decimals slightly inexactly. What should your card show? `toFixed` or `Math.round` could help. This is exactly how real library work feels.

## Testing from zero

### What a test is

You already test your code. When you write `console.log(sumBy(orders))` and look at the answer, that is a test.

An automatic test is the same thing, except the computer remembers the right answer and checks it for you every time. Almost every test has three parts:

```js
it('adds up the values', () => {
  // 1. Set up
  const orders = [{ amount: 10 }, { amount: 20 }]

  // 2. Run
  const total = sumBy(orders, (order) => order.amount)

  // 3. Check
  expect(total).toBe(30)
})
```

### The words you need

| Word | What it means |
|---|---|
| `it('...', () => {})` | One test. Write the name as a sentence about what should happen. |
| `describe('...', () => {})` | A group of tests. Optional. |
| `expect(x).toBe(y)` | The check: "x should be y". |
| `vi.fn()` | A fake function that remembers how it was called. |

### The checks you will use most

| Check | Use it for | Example |
|---|---|---|
| `toBe` | Numbers, strings, true and false | `expect(total).toBe(35)` |
| `toEqual` | Arrays and objects | `expect(list).toEqual([1, 2])` |
| `toBeNull` | `null` | `expect(result).toBeNull()` |
| `toBeCloseTo` | Decimals | `expect(percentChange(3, 3.3)).toBeCloseTo(10)` |
| `toThrow` | Code that should throw an error | `expect(() => chunk([1], 0)).toThrow()` |
| `toHaveBeenCalledTimes` | Checking a `vi.fn()` | `expect(onSave).toHaveBeenCalledTimes(1)` |

`toBe` on arrays always fails, even when they look the same: `expected [ 1, 2 ] to be [ 1, 2 ]`. They are two different arrays in memory. Use `toEqual` for arrays and objects.

### How to find what to test

This is the part beginners find hardest, and it's just a list of questions. Ask them about every function:

| Ask | Example | The dashboard bug it catches |
|---|---|---|
| Does the normal case work? | `percentChange(100, 125)` | The feature doesn't work at all |
| What if it's empty? (`[]`, `''`) | `sumBy([], getValue)` | A crash or a blank chart |
| What if it's zero? | `percentChange(0, 50)` | `Infinity%` on a KPI card |
| What if it's negative? | `formatCurrency(-5)` | `$-5.00` |
| What if a value is missing? | An API leaves out a field | `NaN` or `undefined` on screen |
| What about decimals? | `percentChange(3, 3.3)` | `9.999999999999993%` |
| Did it change my input? | `sortBy(list, getValue)` | A table reorders itself by surprise |

You don't need all of them for every function. Three to five good tests are plenty.

### Different kinds of tests

Start with plain functions. They are the easiest, and most of your first month is plain functions. Use these other kinds when you need them.

**A function that should throw an error:**

```js
it('throws when size is 0', () => {
  expect(() => chunk([1, 2], 0)).toThrow('size must be more than 0')
})
```

Notice the `() =>`. Without it, the error happens before `expect` can catch it.

**A function that calls an API.** Tests should not use the real network, so give them a fake `fetch`:

```js
afterEach(() => {
  vi.unstubAllGlobals()
})

it('gets the total from the API', async () => {
  const fakeFetch = vi.fn().mockResolvedValue(Response.json({ total: 42 }))
  vi.stubGlobal('fetch', fakeFetch)

  const total = await getTotal()

  expect(total).toBe(42)
  expect(fakeFetch).toHaveBeenCalledWith('/api/total')
})
```

**Timers, like `debounce`:** See the fake timers example in [Step 2 of the roadmap](ROADMAP.md#step-2-test-your-functions).

**A React component.** You know React, so this will feel familiar. First install the tools:

```bash
npm install -D jsdom @testing-library/react @testing-library/dom @testing-library/user-event
```

Then test what the user **sees**:

```jsx
// @vitest-environment jsdom
// src/components/StatCard.test.jsx
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { StatCard } from './StatCard.jsx'

afterEach(cleanup)

it('shows a rise with a plus sign', () => {
  render(<StatCard label="Revenue" previous={100} current={125} />)
  expect(screen.getByText('+25%')).toBeTruthy()
})

it('shows "No data" when the previous value is 0', () => {
  render(<StatCard label="Revenue" previous={0} current={50} />)
  expect(screen.getByText('No data')).toBeTruthy()
})
```

The `@vitest-environment jsdom` line gives the test a fake browser, and `cleanup` clears the page between tests.

**A click:**

```jsx
it('calls onSort when clicked', async () => {
  const onSort = vi.fn()
  render(<SortButton onSort={onSort} />)

  await userEvent.click(screen.getByRole('button', { name: 'Sort by amount' }))

  expect(onSort).toHaveBeenCalledTimes(1)
})
```

**React hooks:** See [Step 8 of the roadmap](ROADMAP.md#step-8-build-react-hooks).

### What if I already have code with no tests?

This is normal. Most code starts this way. Don't stop everything to test it all.

1. **New code:** Write its tests from now on.
2. **Bugs:** Before fixing a bug, write a test that fails because of it. Then fix it. That bug can never come back without you knowing.
3. **Old code you need to change:** First write a test for what it does today. Then change it, and the test tells you if you broke something.

Tests grow a little at a time, and that's fine.

### What not to test

- **How the code works inside.** Test the result, not the variable names or the `useState` calls. Then you can rewrite the inside without breaking the tests.
- **Other people's libraries.** You don't need to test that React or `Intl` works.
- **Exact CSS classes.** A test that fails because you changed a colour wastes your time.

### Common test mistakes

| Mistake | Why it's a problem | Do this instead |
|---|---|---|
| The test has never failed | It might not check anything | Break the code once and watch it fail |
| One `it` checks many things | When it fails, you don't know why | One idea per test |
| The test repeats your formula | A bug in the formula is in both places | Write the answer by hand: `25`, not `(125 - 100) / 100 * 100` |
| Forgetting `await` | The test can finish before the check runs | Use `async` and `await` together |
| Tests share data and change it | One test breaks another | Make fresh data inside each test |
| Using a real API or real waiting | Tests become slow and random | Use a fake `fetch` and fake timers |

## Practice

The exercises get harder in three levels. **Do them in order.**

### Level 1: the tests are written, you write the code

Create the test file exactly as shown, then write the function until the tests pass. Create each function in its own file, like `src/utils/sumBy.js`. Open a hint only after you have really tried.

#### `sumBy`: add up a value from each item

```js
// src/utils/sumBy.test.js
import { expect, it } from 'vitest'
import { sumBy } from './sumBy.js'

const orders = [{ amount: 10 }, { amount: 20 }, { amount: 5 }]

it('adds up the values', () => {
  expect(sumBy(orders, (order) => order.amount)).toBe(35)
})

it('gives 0 for an empty list', () => {
  expect(sumBy([], (order) => order.amount)).toBe(0)
})
```

<details>
<summary>Hint</summary>

Start with `let total = 0`. Loop through the list and add `getValue(item)` to the total.

</details>

#### `groupBy`: put items into groups

```js
// src/utils/groupBy.test.js
import { expect, it } from 'vitest'
import { groupBy } from './groupBy.js'

const orders = [
  { id: 1, status: 'paid' },
  { id: 2, status: 'open' },
  { id: 3, status: 'paid' },
]

it('puts items into groups', () => {
  expect(groupBy(orders, (order) => order.status)).toEqual({
    paid: [
      { id: 1, status: 'paid' },
      { id: 3, status: 'paid' },
    ],
    open: [{ id: 2, status: 'open' }],
  })
})

it('gives an empty object for an empty list', () => {
  expect(groupBy([], (order) => order.status)).toEqual({})
})
```

<details>
<summary>Hint</summary>

Start with an empty object. For each item, get its key. If that key has no array yet, create one. Then push the item in.

</details>

#### `sortBy`: sort without changing the original

```js
// src/utils/sortBy.test.js
import { expect, it } from 'vitest'
import { sortBy } from './sortBy.js'

const rows = [{ amount: 30 }, { amount: 10 }, { amount: 20 }]

it('sorts from low to high by default', () => {
  expect(sortBy(rows, (row) => row.amount)).toEqual([
    { amount: 10 },
    { amount: 20 },
    { amount: 30 },
  ])
})

it('sorts from high to low', () => {
  expect(sortBy(rows, (row) => row.amount, 'desc')).toEqual([
    { amount: 30 },
    { amount: 20 },
    { amount: 10 },
  ])
})

it('does not change the original list', () => {
  const list = [3, 1, 2]
  sortBy(list, (n) => n)
  expect(list).toEqual([3, 1, 2])
})
```

<details>
<summary>Hint</summary>

`.sort()` changes the array you call it on, so copy the list first with `[...list]`. To compare numbers, use `(a, b) => getValue(a) - getValue(b)`.

</details>

#### `formatCurrency`: show money

```js
// src/utils/formatCurrency.test.js
import { expect, it } from 'vitest'
import { formatCurrency } from './formatCurrency.js'

it('formats dollars by default', () => {
  expect(formatCurrency(1234.5)).toBe('$1,234.50')
})

it('formats zero', () => {
  expect(formatCurrency(0)).toBe('$0.00')
})

it('formats negative numbers', () => {
  expect(formatCurrency(-5)).toBe('-$5.00')
})

it('formats other currencies', () => {
  expect(formatCurrency(1234.5, 'EUR')).toBe('€1,234.50')
})
```

<details>
<summary>Hint</summary>

Read about [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat). Use `'en-US'` so the result is the same on every computer, and use the `style` and `currency` options.

</details>

#### `formatCompact`: shorten big numbers

```js
// src/utils/formatCompact.test.js
import { expect, it } from 'vitest'
import { formatCompact } from './formatCompact.js'

it('leaves small numbers alone', () => {
  expect(formatCompact(950)).toBe('950')
})

it('shortens thousands', () => {
  expect(formatCompact(1500)).toBe('1.5K')
})

it('shortens millions', () => {
  expect(formatCompact(2000000)).toBe('2M')
})
```

<details>
<summary>Hint</summary>

It's the same tool as `formatCurrency`, with the option `notation: 'compact'`.

</details>

### Level 2: the cases are written, you write the tests and the code

Turn each case into a test first. The functions are described in [Step 1 of the roadmap](ROADMAP.md#step-1-write-good-functions).

| Function | Cases to test |
|---|---|
| `clamp(value, min, max)` | Too high. Too low. In range. Exactly the min. Exactly the max. |
| `unique(list)` | Removes repeats. Keeps the order. Empty list. Doesn't change the original. |
| `chunk(list, size)` | Splits evenly. Leftover items. Empty list. Size bigger than the list. Throws an error when size is 0. |
| `truncate(text, length)` | Long text is cut and gets `…`. Short text is unchanged. Text exactly at the length is unchanged. Empty text. |
| `pick(obj, keys)` | Picks the keys. Ignores a key that doesn't exist. Doesn't change the original. |

### Level 3: you write the cases, the tests and the code

You get only the name. Use the [questions list](#how-to-find-what-to-test) to find the cases yourself.

`omit`, `capitalize`, `slugify`, `formatBytes`, `isEmpty`, `cn`

Then finish with `debounce` from [Step 2 of the roadmap](ROADMAP.md#step-2-test-your-functions), which is the hardest one. Use your function in a real search box.

## Your first 4 weeks

This assumes about one hour a day. It's fine if a day takes you two or three days. **The order matters, but the speed doesn't.**

### Week 1: your first tests

| Day | Do this |
|---|---|
| 1 | [Your first hour](#your-first-hour) |
| 2 | Type out the [worked example](#worked-example-percentchange) by hand and show `StatCard` in the app |
| 3 | Delete `percentChange` and its test. Do it again without looking. Compare. |
| 4 | Level 1: `sumBy` |
| 5 | Level 1: `groupBy` |
| 6 | Level 1: `sortBy` |
| 7 | Level 1: `formatCurrency` and `formatCompact` |

### Week 2: a small dashboard

Build something you are good at, using your own functions. First do Level 2, which takes about 3 days. Then build a small sales dashboard in `src/` using fake data:

```js
// src/data/sales.js
export const sales = [
  { id: 1, product: 'Laptop', month: '2026-01', amount: 1200, status: 'paid' },
  { id: 2, product: 'Phone', month: '2026-01', amount: 650, status: 'open' },
  { id: 3, product: 'Laptop', month: '2026-02', amount: 1500, status: 'paid' },
]
```

Add more rows, then build:

- [ ] KPI cards with `percentChange`, `formatCurrency` and `formatCompact`
- [ ] A table you can sort, using `sortBy`
- [ ] Simple bars for sales per month, using `groupBy`, `sumBy` and Tailwind `div`s

**Write down everything annoying about your functions**, then fix it. This dashboard can also become your final app in [Step 12](ROADMAP.md#step-12-final-project) instead of the expense tracker.

### Week 3: harder functions and component tests

- [ ] Level 3 functions
- [ ] `debounce`, and a search box on your dashboard that uses it
- [ ] Tests for `StatCard` and your table
- [ ] Your JSDoc shows up when you hover over each function

### Week 4: your first real package

- [ ] [Step 3 of the roadmap](ROADMAP.md#step-3-turn-your-functions-into-a-package): move your functions into `@yourname/utils`
- [ ] [Step 4 of the roadmap](ROADMAP.md#step-4-publish-to-npm): publish it to npm

**At the end of week 4, you will have a tested package on npm, used by a dashboard you built.**

### After week 4

Continue with [Step 5 of the roadmap](ROADMAP.md#step-5-add-a-build-and-types). Use the same 6 steps for everything. Add `sleep`, `once`, `memoize`, `throttle` and `retry` from Step 2 when you have time. You will need `retry` in Step 7.

## When you get stuck

Being stuck is the normal feeling of learning this. Try these in order:

1. **Read the error slowly.** Find the file, the line, and the expected and received values.
2. **Try a smaller input.** Use a list with one item, and add `console.log` inside your function.
3. **Explain the problem out loud,** line by line. You often find the bug while doing this.
4. **Look up the one thing you're unsure of** on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
5. **Open the hint,** if there is one.
6. **After about 20 minutes, ask for help.** Don't lose a whole evening to one problem.

### How to ask me for help

You will learn more if you ask for less than the full answer. You can copy these:

- "Give me a **hint only**, no code. I'm writing `groupBy` and my test fails with this error: ..."
- "**Review** this function. Tell me what's wrong, but don't rewrite it: ..."
- "I wrote these tests for `chunk`. **What cases did I miss?** Name them, but don't write them."
- "Explain this error in simple words: ..."
- "**Quiz me** on what I learned in Step 3."

## How to read a real library

Open source code can look scary, but you only need to read a small part of it.

1. **Open `package.json`.** Look at `exports`, which tells you where the code starts.
2. **Find the one function you just built.** Search the repo for its name. Don't read everything.
3. **Read its tests.** Tests show what the function should do, and they are easier to read than the code.
4. **Ask one question:** "What did they handle that I didn't?"
5. **Take one idea** and add it to your version, with a test.

Start with [mitt](https://github.com/developit/mitt) and [clsx](https://github.com/lukeed/clsx). They are tiny, and you can read all of their code.

## JSDoc is TypeScript in comments

You know some TypeScript, so JSDoc will be easy. It uses the same types, written inside a comment:

```ts
// TypeScript
function formatCurrency(value: number, currency?: string): string
```

```js
// JavaScript with JSDoc

/**
 * @param {number} value
 * @param {string} [currency]
 * @returns {string}
 */
function formatCurrency(value, currency) {}
```

| TypeScript | JSDoc |
|---|---|
| `name: string` | `@param {string} name` |
| `name?: string` | `@param {string} [name]` |
| `number \| null` | `{number \| null}` |
| `string[]` | `{string[]}` |
| `: boolean` | `@returns {boolean}` |

Your TypeScript knowledge isn't wasted here. In [Step 5 of the roadmap](ROADMAP.md#step-5-add-a-build-and-types), these comments become real `.d.ts` files, so people who use TypeScript get full types from your JavaScript package.

The test code and results in this file were run on Node 24 and Vitest 5.1 on 4 November 2026. Some of the output is shortened, so yours will show a few more lines.
