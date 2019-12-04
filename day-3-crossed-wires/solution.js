// --- Day 3: Crossed Wires ---
// https://adventofcode.com/2019/day/3

const fs = require('fs')

const file = fs.readFileSync('input.txt', 'utf-8').split('\n')

const directions1 = file[0].split(',')
const directions2 = file[1].split(',')

const touchingPointsMap = directions => {
  let touchingPoints = {}
  let pos = [0, 0] // x, y
  for (const currDirection of directions) {
    const direction = currDirection[0] // U,D,L,R
    const distance = parseInt(currDirection.slice(1)) // remove direction from instruction

    if (direction == 'U') {
      for (let i = 0; i < distance; i++) {
        touchingPoints[[pos[0], pos[1] + i]] = true
      }
      pos = [pos[0], pos[1] + distance]
    } else if (direction == 'D') {
      for (let i = 0; i < distance; i++) {
        touchingPoints[[pos[0], pos[1] - i]] = true
      }
      pos = [pos[0], pos[1] - distance]
    } else if (direction == 'L') {
      for (let i = 0; i < distance; i++) {
        touchingPoints[[pos[0] - i, pos[1]]] = true
      }
      pos = [pos[0] - distance, pos[1]]
    } else if (direction == 'R') {
      for (let i = 0; i < distance; i++) {
        touchingPoints[[pos[0] + i, pos[1]]] = true
      }
      pos = [pos[0] + distance, pos[1]]
    }
  }
  touchingPoints[[0, 0]] = false
  return touchingPoints
}

const touchingPointsArr = directions => {
  let touchingPoints = []
  let pos = [0, 0] // x, y
  directions.forEach(currDirection => {
    const direction = currDirection[0] // U,D,L,R
    const distance = parseInt(currDirection.slice(1)) // remove direction from instruction

    if (direction == 'U') {
      for (let i = 0; i < distance; i++) {
        touchingPoints.push([pos[0], pos[1] + i])
      }
      pos = [pos[0], pos[1] + distance]
    } else if (direction == 'D') {
      for (let i = 0; i < distance; i++) {
        touchingPoints.push([pos[0], pos[1] - i])
      }
      pos = [pos[0], pos[1] - distance]
    } else if (direction == 'L') {
      for (let i = 0; i < distance; i++) {
        touchingPoints.push([pos[0] - i, pos[1]])
      }
      pos = [pos[0] - distance, pos[1]]
    } else if (direction == 'R') {
      for (let i = 0; i < distance; i++) {
        touchingPoints.push([pos[0] + i, pos[1]])
      }
      pos = [pos[0] + distance, pos[1]]
    }
  })
  return touchingPoints
}

const findIntersections = (touchingPoints1, touchingPoints2) => {
  let intersections = []
  // touchingPoints1/touchingPoints2 are in format '{POINTS}': true
  // so we need to get the key
  const points1 = Object.keys(touchingPoints1)
  // Loop through the touching points in the first board and if any keys
  // match with the second board, add to the array of intersections
  for (let current of points1) {
    if (touchingPoints2[current]) {
      intersections.push(current)
    }
  }
  return intersections
}

const intersections = findIntersections(
  touchingPointsMap(directions1),
  touchingPointsMap(directions2)
)

const retrieveStepsToPoint = (intersection, points1, points2) => {
  const points = intersection.split(',').map(x => parseInt(x))
  let board1Dist = 0,
    board2Dist = 0
  for (const [idx, curr] of points1.entries()) {
    if (curr[0] == points[0] && curr[1] == points[1]) {
      board1Dist = idx
      break
    }
  }
  for (const [idx, curr] of points2.entries()) {
    if (curr[0] == points[0] && curr[1] == points[1]) {
      board2Dist = idx
      break
    }
  }
  return board1Dist + board2Dist
}

let distances = [],
  numSteps = []
intersections.forEach(points => {
  ;[x, y] = points.split(',')
  distances.push(Math.abs(x) + Math.abs(y))
  const steps = retrieveStepsToPoint(
    points,
    touchingPointsArr(directions1),
    touchingPointsArr(directions2)
  )
  numSteps.push(steps)
})
distances = new Uint32Array(distances)
distances = distances.sort()
numSteps = new Uint32Array(numSteps)
numSteps = numSteps.sort()

console.log('part one:', distances[0])
console.log('part two:', numSteps[0])
