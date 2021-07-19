
// Immutable set data structure.
export const Set = (...values) => ({
  add: value => values.includes(value) ? Set(...values) : Set(...values, value),
  union: set => values.reduce((set_, value) => set_.add(value), set),
  values
})

export const prop = n => obj => obj[n]

export const pipe = (...funcs) => arg =>
  funcs.reduce((acc, func) => func(acc), arg)

export const map = f => arr => [...(function*() {
  for (let i = 0; i < arr.length; i++)
    yield f(arr[i])
})()]

export const flatten = arr => [...(function*() {
  for (let i = 0; i < arr.length; i++)
    yield* arr[i]
})()]

export const flatMap = fn => arr =>
  flatten(map(fn, arr))

export const drop = n => arr => arr.slice(n)
export const dropLast = n => arr => arr.slice(0, -n)

export const reduce = (fn, seed) => arr => arr.reduce(fn, seed)
