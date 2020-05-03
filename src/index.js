'use strict'

const Squirrel = require('./squirrel')

console.log(process.argv.slice(2))

const createAPI = bars => ({
  getHeightAt: i => bars[i],
  getNumberOfBars: () => bars.length
})

const apiFromArgs = args => {
  const parsed = args.map(Number)
  console.log(parsed)
  if (!parsed.every(Number.isInteger)) {
    console.log('Only integers are allowed')
    process.exit(1)
  }
  return createAPI(parsed)
}

const squirrel = Squirrel(apiFromArgs(process.argv.slice(2)))

const positions = new Array(squirrel.maxNumberOfJumps())
  .fill()
  .map((_, step) => squirrel.positionAtStep(step))

console.log('The maximum number of jumps is:', squirrel.maxNumberOfJumps())
console.log('The positions are:', positions)
