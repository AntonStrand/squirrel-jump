const { describe, it } = require('mocha')
const { expect } = require('chai')

const SUT = require('./squirrel')

const createAPI = bars => ({
  getHeightAt: i => bars[i],
  getNumberOfBars: () => bars.length
})

describe('Level 1', () => {
  const API = createAPI([6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12])

  it('the max number of jumps should be 6', () => {
    expect(SUT(API).maxNumberOfJumps()).to.equal(6)
  })

  it('the steps should be correct', () => {
    const squirrel = SUT(API)
    const expectedPath = [10, 8, 6, 4, 3, 1]

    expectedPath.forEach((step, i) =>
      expect(squirrel.positionAtStep(i)).to.equal(step)
    )
  })
})
