const { describe, it } = require('mocha')
const { expect } = require('chai')

const SUT = require('./squirrel')

const createAPI = bars => ({
  getHeightAt: i => bars[i],
  getNumberOfBars: () => bars.length
})

describe('Level 1 - [6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12]', () => {
  const API = createAPI([6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12])

  it('the max number of jumps should be 6', () => {
    expect(SUT(API).maxNumberOfJumps()).to.equal(6)
  })

  it('the steps should be [10, 8, 6, 4, 3, 1]', () => {
    const squirrel = SUT(API)
    const expectedPath = [10, 8, 6, 4, 3, 1]

    expectedPath.forEach((step, i) =>
      expect(squirrel.positionAtStep(i)).to.equal(step)
    )
  })
})

describe('Level 2 - [7, 6, 5, 4, 3, 2, 1]', () => {
  const API = createAPI([7, 6, 5, 4, 3, 2, 1])

  it('the max number of jumps should be 7', () => {
    expect(SUT(API).maxNumberOfJumps()).to.equal(7)
  })

  it('the steps should be [0, 1, 2, 3, 4, 5, 6]', () => {
    const squirrel = SUT(API)
    const expectedPath = [0, 1, 2, 3, 4, 5, 6]

    expectedPath.forEach((step, i) => {
      expect(squirrel.positionAtStep(i)).to.equal(step)
    })
  })
})

describe('Level 3 - [12, 2, 17, 1, 5]', () => {
  const API = createAPI([12, 2, 17, 1, 5])

  it('the max number of jumps should be 4', () => {
    expect(SUT(API).maxNumberOfJumps()).to.equal(4)
  })

  it('the steps should be [2, 0, 1, 3]', () => {
    const squirrel = SUT(API)
    const expectedPath = [2, 0, 1, 3]

    expectedPath.forEach((step, i) => {
      expect(squirrel.positionAtStep(i)).to.equal(step)
    })
  })
})

describe('Exceptions', () => {
  const API = createAPI([])

  it('should return 0 if there is no steps', () => {
    expect(SUT(API).maxNumberOfJumps()).to.equal(0)
  })

  it('positionAtStep() should return -1 if the step is out of bound', () => {
    const squirrel = SUT(API)
    expect(squirrel.positionAtStep(-12)).to.equal(-1)
    expect(squirrel.positionAtStep(0)).to.equal(-1)
    expect(squirrel.positionAtStep(7)).to.equal(-1)
  })
})
