<template lang="pug">
#app
  .title
    span DungeonMaker
  button(@click="walk(map)") walk

  //- pre {{ map }}
  //- h1 {{JSON.stringify(grid)}}
  .container
    .row(v-for="(row, rowIndex) in grid")
      .cell(
        v-for="(col, colIndex) in row",
        v-on:click="setCell(rowIndex, colIndex)",
        :class="map[rowIndex][colIndex]",
        v-bind:class="{ active: activeRow === rowIndex && activeCol === colIndex }"
      )
        span
  .grid__control
    div
      h2 Grid Size
    .controllers
      div 
        label.sub-title(for="cols") cols
        input#cols(type="range", min="1", max="6", v-model="cols")
        span {{ cols }}
      div
        label.sub-title(for="cols") rows
        input#rows(type="range", min="1", max="6", v-model="rows")
        span {{ rows }}
</template>

<script setup lang="ts">
import { ref, onBeforeUpdate, reactive } from "vue";
import { makeGrid } from "./grid";
const cols = ref(1);
const rows = ref(1);
let grid = ref(makeGrid(cols.value, rows.value));
let activeRow = ref(0);
let activeCol = ref(0);
let isWalking = ref(false);
const map = reactive([]);
for (let i = 0; i < rows.value; i++) {
  if (!map[i]) {
    map[i] = [];
  }
  for (let j = 0; j < cols.value; j++) {
    if (!map[i][j]) {
      map[i][j] = "";
    }
  }
}

const setCell = (rowIndex, colIndex) => {
  console.log(map[rowIndex][colIndex]);
  if (!map[rowIndex][colIndex]) {
    map[rowIndex][colIndex] = "wall";
  } else if (map[rowIndex][colIndex] === "wall") {
    map[rowIndex][colIndex] = "door";
  } else if (map[rowIndex][colIndex] === "door") {
    map[rowIndex][colIndex] = "grass";
  } else {
    map[rowIndex][colIndex] = "";
  }
  console.log(map[rowIndex][colIndex]);
};
const getCell = (row, col) => {
  const [x, y] = col;
  console.log({ x, y });
};

const walk = (_2dArray = []) => {
   if (isWalking.value) {
     return
   }
  isWalking.value = true
  // const coords = _2dArray.map((row: [], rowIndex) =>
  //   row.map((col, colIndex) => ([rowIndex, colIndex]))
  // );
  //const coords = _2dArray.flat()
  const coords = {}
  let countItems = 0
for (let row = 0 ; row <  _2dArray.length; row++) {
  coords[row] = {}
  for (let col = 0; col < _2dArray[row].length; col++) {
    countItems++
    const terrain = _2dArray[row][col]
    coords[row][col] = {row, col, terrain}
  }
}
  console.log({...coords, total: countItems})
  return

  let idx = 0;
  const doWalk = setInterval(function () {
    console.log(coords[idx])
    idx++;
    
    if (idx === coords.flat().flat().length) {
      isWalking.value = false
      clearInterval(doWalk);
    }
  }, 1000);
};
onBeforeUpdate(() => {
  grid.value = makeGrid(cols.value, rows.value);

  for (let i = 0; i < rows.value; i++) {
    if (!map[i]) {
      map[i] = [];
    }
    for (let j = 0; j < cols.value; j++) {
      console.log({ i, j });
      if (!map[i][j]) {
        map[i][j] = "";
      }
    }
  }
});
</script>

<style lang="stylus">
body, h1, h2 {
  margin: 0;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e9c46a;
  height: 100vh;
  background-color: #264653;
  overflow: hidden;

  .title {
    margin-top: 1rem;
    text-align: center;

    span {
      font-size: 32px;
    }
  }
}

.container {
  background-color: #023047;
  min-height: 24rem;
  overflow: hidden;
}

.row {
  // background-color #666
  margin: 2px auto;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    .cell {
      &:before {
        position: absolute;
        content: '';
        top: 3rem;
        left: 1.5rem;
        border-left: 2px solid white;
        height: 1.1rem;
        // width   2px
        // background-color #666
      }
    }
  }
}

.cell {
  position: relative;
  border: 1px solid #2a9d8f;
  margin: 8px;
  min-height: 3rem;
  min-width: 3rem;
  border-radius: 5px;
  cursor: pointer;

  &:not(:last-child):after {
    position: absolute;
    content: '';
    top: 1.4rem;
    left: 3rem;
    border-top: 2px solid white;
    width: 1rem;
  }

  &:hover {
    background-color: #457b9d;
  }
}

.grid__control {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 8rem;
  padding: 1.5rem;
  background-color: #000814;

  .controllers {
    display: flex;
  }

  .sub-title {
    margin: 16px;
    font-size: 16px;
  }
}

.wall {
  background-image: url('./assets/wall.png');
  background-size: 50px;
}

.door {
  background-image: url('./assets/door.png');
  background-size: 50px;
}

.grass {
  background-image: url('./assets/grass.png');
  background-size: 50px;
}

.active {
  // background-color: darkgreen;
}
</style>
