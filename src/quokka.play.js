let totalItems = 0
let totalRows = 0;
let coords = {}

_2dArray = [
  ['wall', 'door'],
  ['grass', 'grass'],
  ['door', 'wall'],
]
for (let row = 0 ; row <  _2dArray.length; row++) {
  coords[`row_${row}`] = {}
  totalRows++
  for (let col = 0; col < _2dArray[row].length; col++) {
    totalItems++
    terrain = _2dArray[row][col]
    coords[`row_${row}`][col] = {row, col, terrain}
  }
}
coords = {...coords, totalRows, totalItems}
console.log(coords)