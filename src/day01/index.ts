import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(str => parseInt(str, 10));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return part1Parsed(input);
};
const part1Parsed = (input: number[]) => {
  let numIncreases = 0;
  for (let i = 1, end = input.length; i < end; ++i) {
    if (input[i] > input[i - 1]) {
      ++numIncreases;
    }
  }

  return  numIncreases;
};

const windowSize = 3;
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let slidingWindowSum: number[] = new Array(input.length - windowSize + 1);
  const sumArray = (arr: number[]): number => arr.reduce((sum,num) => sum + num, 0);
  
  for (let i = 0, end = slidingWindowSum.length; i < end; ++i) {
    slidingWindowSum[i] = sumArray(input.slice(i, i + windowSize));
  }

  return part1Parsed(slidingWindowSum);
};

const testInputArray = [1, 2, 3, 4, 5, 6, 7, 8]
run({
  part1: {
    tests: [
      { input: testInputArray.join('\n'), expected: testInputArray.length - 1 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInputArray.join('\n'), expected: testInputArray.length - windowSize },
    ],
    solution: part2,
  },
  // trimTestInputs: true,
});
