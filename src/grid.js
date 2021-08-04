export const makeGrid = (cols, rows) => {
  let grid = []
  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < cols; j++) {
      // with object
      //grid[i].push({x: i, y: j})
      grid[i].push([j, i])
    }
  }
  return grid
}



