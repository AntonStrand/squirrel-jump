module.exports = API => {
  /** Private functions */

  /**
   * isSuccessor :: Number -> Number -> Boolean
   *
   * Checks if the bar at the provided index is a successor of the bar with the provided height.
   *
   * The function is curried.
   *
   * @param {Number} height - The height of the predecessor
   * @param {Number} index - The index of the bar that should be tested
   * @returns {Boolean} - If the bar is a successor or not
   */

  const isSuccessor = height => index =>
    index >= 0 &&
    index < API.getNumberOfBars() &&
    API.getHeightAt(index) < height

  /**
   * getSuccessors :: Number -> [Number]
   *
   * Get all bars that are shorter and within the range of the squirrel.
   *
   * @param {Number} index - The index of the current bar
   * @returns {[Number]} - The successors of the current bar
   */

  const getSuccessors = index =>
    [-1, 1, -2, 2]
      .map(diff => index + diff)
      .filter(isSuccessor(API.getHeightAt(index)))

  /**
   * getAvailablePaths :: (Number, [[Number]], [Number]) -> [[Number]]
   *
   * Find all available paths from the current bar.
   *
   * @param {Number} index - The start index
   * @param {[[Number]]} allPaths - An array of paths
   * @param {[Number]} path - The current path
   * @returns {[[Number]]} All available paths
   */
  const getAvailablePaths = (index, allPaths, path = []) => {
    path = [...path, index]
    getSuccessors(index).map(i => getAvailablePaths(i, allPaths, path))
    allPaths.push(path)

    return allPaths
  }

  /**
   * getLongest :: ([a], [a]) -> [a]
   *
   * Compares the length of two arrays and returns the longest.
   *
   * @param {[*]} a
   * @param {[*]} b
   * @returns {[*]} The longest array
   */
  const getLongest = (a, b) => (a.length > b.length ? a : b)

  /**
   * findLongestPath :: () -> [Number]
   *
   * Compares all available paths and picks the longest.
   *
   * @returns {[Number]}
   */
  const findLongestPath = () => {
    let paths = []
    for (let i = 0; i < API.getNumberOfBars(); i++) {
      paths = getAvailablePaths(i, paths, [])
    }
    return paths.reduce(getLongest, [])
  }

  const longestPath = findLongestPath()
  const numOfJumps = longestPath.length

  /**
   * The public functions
   */
  return {
    /**
     * The maximum number of jumps the squirrel can make.
     *
     * @returns {Number}
     */
    maxNumberOfJumps: () => numOfJumps,

    /**
     * Get the index of the bar of the current step.
     *
     * @param {Number} step - The current step
     * @return {Number}
     */
    positionAtStep: step =>
      step >= 0 && step < numOfJumps ? longestPath[step] : -1
  }
}
