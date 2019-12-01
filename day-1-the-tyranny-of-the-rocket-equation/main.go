package main

import (
  "bufio"
  "fmt"
  "os"
  "strconv"
)

func readInputFile(filePath string) ([]int) {
  file, err := os.Open(filePath)
  if err != nil {
    panic(err)
  }
  defer file.Close()

  scanner := bufio.NewScanner(file)
  var nums []int
  for scanner.Scan() {
    text, err := strconv.Atoi(scanner.Text())
    if err != nil {
      panic(err)
    }
    nums = append(nums, text)
  }
  return nums
}

func calculateFuel(mass int) int {
  return ((mass / 3) - 2)
}

func main() {
  nums := readInputFile("input.txt")
  total, totalFuelSums := 0, 0
  for _, mass := range nums {
    total += calculateFuel(mass)
    for {
      fuel := calculateFuel(mass)
      if fuel <= 0 {
        break
      }
      totalFuelSums += fuel
      mass = fuel
    }
  }
  fmt.Println("part one =", total)
  fmt.Println("part two =", totalFuelSums)
}