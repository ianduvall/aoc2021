import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(",").map(Number);

const part1 = (rawInput: string, iterations = 80) => {
  const timers = parseInput(rawInput);

  const incrementTimer = (timers: number[], i: number) => {
    if (timers[i] === 0) {
      timers[i] = 6;
      // using 9 because we will decrement the new timer during this pass
      timers.push(9);
    } else {
      --timers[i];
    }
  };

  for (let i = 0; i < iterations; ++i) {
    for (let timerIndex = 0; timerIndex < timers.length; ++timerIndex) {
      incrementTimer(timers, timerIndex);
    }
  }

  return timers.length;
};

const part2 = (rawInput: string, iters = 256) => {
  const timers = parseInput(rawInput);

  const Cache = new Map<number, number>();

  const calcDescendants = (days: number): number => {
    if (days <= 0) return 0;

    if (Cache.has(days)) {
      return Cache.get(days) || 0;
    }

    const numChildren = Math.ceil(days / 7);
    let numDescendants = numChildren;
    for (let i = 0; i < numChildren; ++i) {
      const daysRemaining = days - i * 7 - 9;
      numDescendants += calcDescendants(daysRemaining);
    }

    Cache.set(days, numDescendants);
    return numDescendants;
  };

  return timers.reduce((sum, timer, i) => {
    const numDescendants = calcDescendants(iters - timer);
    return sum + numDescendants;
  }, timers.length);
};

const exampleInput = `3,4,3,1,2`;
run({
  part1: {
    tests: [{ input: exampleInput, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: exampleInput, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
});
