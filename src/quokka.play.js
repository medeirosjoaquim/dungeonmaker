coords = {}
_2dArray = [
  ['wall', 'door'],
  ['grass', 'grass'],
]
for (let row = 0 ; row <  _2dArray.length; row++) {
  coords[row] = {}
  for (let col = 0; col < _2dArray[row].length; col++) {
    terrain = _2dArray[row][col]
    coords[row][col] = {row, col, terrain}
  }
}

console.log(coords)