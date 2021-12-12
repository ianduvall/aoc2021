import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("").map(Number));

type PointKey = `${number},${number}`;
const countFlashes = (input: number[][], iterations: number): number => {
  let numFlashes = 0;

  for (let step = 0; step < iterations; step++) {
    const hasFlashedThisStep = new Set<PointKey>();
    const hasFlashedThisStepKey = (r: number, c: number): PointKey =>
      `${r},${c}`;
    let flashed: [row: number, col: number][] = [];
    const hasFlashed = (r: number, c: number): boolean =>
      hasFlashedThisStep.has(hasFlashedThisStepKey(r, c));
    const shouldFlash = (r: number, c: number) =>
      !hasFlashed(r, c) && input[r][c] > 9;
    const stepPoint = (row: number, col: number) => {
      if (hasFlashed(row, col)) return;

      input[row][col] += 1;
      if (shouldFlash(row, col)) {
        input[row][col] = 0;
        flashed.push([row, col]);
        hasFlashedThisStep.add(hasFlashedThisStepKey(row, col));
      }
    };

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[row].length; col++) {
        stepPoint(row, col);
      }
    }

    // propagate flashes
    while (flashed.length > 0) {
      const [row, col] = flashed.pop()!;

      const adjacentPoints = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1],
      ];
      adjacentPoints.forEach(([adjRow, adjCol]) => {
        if (input[adjRow]?.[adjCol] !== undefined) {
          stepPoint(adjRow, adjCol);
        }
      });
    }

    numFlashes += hasFlashedThisStep.size;
  }

  return numFlashes;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const iterations = 100;

  return countFlashes(input, iterations);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const iterations = 1000;

  for (let step = 0; step < iterations; step++) {
    const hasFlashedThisStep = new Set<PointKey>();
    const hasFlashedThisStepKey = (r: number, c: number): PointKey =>
      `${r},${c}`;
    let flashed: [row: number, col: number][] = [];
    const hasFlashed = (r: number, c: number): boolean =>
      hasFlashedThisStep.has(hasFlashedThisStepKey(r, c));
    const shouldFlash = (r: number, c: number) =>
      !hasFlashed(r, c) && input[r][c] > 9;
    const stepPoint = (row: number, col: number) => {
      if (hasFlashed(row, col)) return;

      input[row][col] += 1;
      if (shouldFlash(row, col)) {
        input[row][col] = 0;
        flashed.push([row, col]);
        hasFlashedThisStep.add(hasFlashedThisStepKey(row, col));
      }
    };

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[row].length; col++) {
        stepPoint(row, col);
      }
    }

    // propagate flashes
    while (flashed.length > 0) {
      const [row, col] = flashed.pop()!;

      const adjacentPoints = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1],
      ];
      adjacentPoints.forEach(([adjRow, adjCol]) => {
        if (input[adjRow]?.[adjCol] !== undefined) {
          stepPoint(adjRow, adjCol);
        }
      });
    }

    if (hasFlashedThisStep.size === input.length * input[0].length) {
      return step + 1;
    }
  }

  return;
};

const exampleInput = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;
run({
  part1: {
    tests: [{ name: "example input", input: exampleInput, expected: 1656 }],
    solution: part1,
  },
  part2: {
    tests: [{ name: "example input", input: exampleInput, expected: 195 }],
    solution: part2,
  },
  trimTestInputs: true,
});
