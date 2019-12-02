// --- Day 2: 1202 Program Alarm ---
// https://adventofcode.com/2019/day/2

package main

import (
  "io/ioutil"
  "strings"
  "strconv"
  "fmt"
)

func readInputFile(filePath string) ([]int) {
  file, err := ioutil.ReadFile(filePath)
  if err != nil {
    panic(err)
  }
  trimmedFile := strings.TrimSpace(string(file))

  var ints []int
  for _, val := range strings.Split(trimmedFile, ",") {
    toInt, err := strconv.Atoi(val)
    if err != nil {
      panic(err)
    }
    ints = append(ints, toInt)
  }
  return ints
}

func intcode(ints []int, noun, verb int) (result int) {
  // copy ints array into memory
  memInts := make([]int, len(ints))
  copy(memInts, ints)

  rounds := 0
  memInts[1], memInts[2] = noun, verb
  for {
    opcode := memInts[(rounds * 4)]
    firstLoc := memInts[(rounds * 4) + 1]
    secondLoc := memInts[(rounds * 4) + 2]
    dest := memInts[(rounds * 4) + 3]

    switch opcode {
    case 1:
      memInts[dest] = (memInts[firstLoc] + memInts[secondLoc])
    case 2:
      memInts[dest] = (memInts[firstLoc] * memInts[secondLoc])
    case 99: 
      return memInts[0]
    default:
      return 0
    }

    rounds++
  }
}

func main() {
  ints := readInputFile("input.txt")

  // Part 1
  res1 := intcode(ints, 12, 02)
  fmt.Println("part one:", res1)

  // Part 2
  needed := 19690720 // we are trying to find the noun and verb that produce this output
  for noun := 0; noun < 100; noun++ {
    for verb := 0; verb < 100; verb++ {
      res2 := intcode(ints, noun, verb)
      if res2 == needed {
        fmt.Printf("part two: %02d%02d\n", noun, verb)
        break
      }
    }
  }
}