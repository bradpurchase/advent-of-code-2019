<?php
// --- Day 4: Secure Container ---
// https://adventofcode.com/2019/day/4

// Digits can never decrease, only ever increase or stay the same
function digitsNeverDecrease($str) {
  for ($x = 1; $x < strlen($str); $x++) {
    if ($str[$x] < $str[$x - 1]) return false;
  }
  return true;
}

// Verifies that two adjacent right digits are the same (i.e. 22 in 122345)
function matchingAdjacentDigits($str) {
  return preg_match('/(\d)\1/', $str);
}

// If the number is a password candidate, also check if the two matching
// adjacent digits are not part of a larger group of matching digits
function notInLargerMatchingGroup($str) {
  $countChars = count_chars($str);
  return array_search(2, $countChars, true) !== false;
}

$input = "382345-843167";
$range = explode('-', $input);
$numCandidates1 = 0;
$numCandidates2 = 0;
for ($i = $range[0]; $i < $range[1]; $i++) {
  $isCandidate = true;
  $str = (string) $i;

  // Digits can never decrease, only ever increase or stay the same
  $isCandidate = digitsNeverDecrease($str);

  // Two adjacent right digits are the same (i.e. 22 in 122345)
  if (!matchingAdjacentDigits($str)) {
    $isCandidate = false;
  }

  if ($isCandidate) {
    $numCandidates1++;
    if (notInLargerMatchingGroup($str)) $numCandidates2++;
  }
}
echo "part one: " . $numCandidates1 . PHP_EOL;
echo "part two: " . $numCandidates2 . PHP_EOL;
