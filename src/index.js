import { readFile, writeFile } from 'fs/promises'
import { drop, dropLast, map, pipe, prop, Set } from './utilities.js'

// Load the file to a string
// : string
const file = await
  readFile('../task-data.csv')
  .then(data => data.toString())
  .catch(e => {throw e})

// Split the table to a 2D array
// : string[][]
const table = file
.split('\n')
.map(x => x.trim().split(','))

const colInQuestion = 72

// : string -> Set<string>[]
const getActivities = pipe(
  map(prop(colInQuestion)),
  drop(1),
  map(cell => Set(...cell.split(';'))),
)

// Gather activities into sets
// : Set<string>[]
const peopleActivites = getActivities(table)
// combine all activities into one set
// : Set<string>
const allActivities = peopleActivites
  .reduce((combined, single) => combined.union(single), Set())

const picked = 1
const notPicked = 2

// Create arrays of picked/not_picked
const peopleActivitesTable = 
peopleActivites.map(set =>
  allActivities.values.map(activity => set.values.includes(activity) ? picked : notPicked))

// The first row is allActivties.values
// Remove column_in_question
// Append new data
const newData = [allActivities.values, ...peopleActivitesTable]

const finalResult =
  table.map((row, i) => [...dropLast(1)(row), ...newData[i]])

// Convert to CSV format
const serialise = table => table
  .map(column => column.join(','))
  .join('\n')

writeFile('output.csv', serialise(finalResult))
console.log("Wrote result to output.csv")