import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(",").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const log = input.length < 20 ? console.log : () => {};

  let minPos = input[0];
  let maxPos = minPos;
  let minFuelCost = 0;
  const posCounts: Record<number, number> = {};
  input.forEach((pos) => {
    if (pos < minPos) {
      minPos = pos;
    }
    if (pos > maxPos) {
      maxPos = pos;
    }
    posCounts[pos] = (posCounts[pos] ?? 0) + 1;
    minFuelCost += Math.abs(0 - pos);
  });

  let prevFuelCost = minFuelCost;
  let prevNumPosLTECurPos = posCounts[minPos] ?? 0;
  let prevNumPosGTCurPos = input.length - posCounts[minPos];
  let curPos = minPos + 1;

  while (curPos <= maxPos) {
    const curFuelCost = prevFuelCost + prevNumPosLTECurPos - prevNumPosGTCurPos;

    if (curFuelCost < minFuelCost) {
      minFuelCost = curFuelCost;
    }

    prevFuelCost = curFuelCost;
    prevNumPosLTECurPos = prevNumPosLTECurPos + (posCounts[curPos] ?? 0);
    prevNumPosGTCurPos = prevNumPosGTCurPos - (posCounts[curPos] ?? 0);
    curPos += 1;
  }

  return minFuelCost;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const log = input.length < 20 ? console.log : () => {};

  let minPos = input[0];
  let maxPos = minPos;
  input.forEach((pos) => {
    if (pos < minPos) {
      minPos = pos;
    }
    if (pos > maxPos) {
      maxPos = pos;
    }
  });
  let minFuelCost = Infinity;

  for (let pos = minPos; pos < maxPos; pos++) {
    const fuelCost = input.reduce((cost, p) => {
      const dist = Math.abs(pos - p);
      return cost + (dist * (dist + 1)) / 2;
    }, 0);
    if (fuelCost < minFuelCost) {
      minFuelCost = fuelCost;
    }
  }

  return minFuelCost;
};

const testInput = "16,1,2,0,4,2,7,1,2,14";
run({
  part1: {
    tests: [{ input: testInput, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
