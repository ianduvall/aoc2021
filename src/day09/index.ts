import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("").map(Number));

type Point = {
  row: number;
  col: number;
};

const isLow = ({ row, col }: Point, input: number[][]) => {
  const point = input[row][col];

  const isLowAdjacent = ({ r, c }: { r: number; c: number }) => {
    const adjacent = input[r]?.[c];
    if (adjacent === undefined || point < adjacent) return true;
    return false;
  };

  const top = [row - 1, col];
  const bottom = [row + 1, col];
  const left = [row, col - 1];
  const right = [row, col + 1];
  return [top, bottom, left, right].every(([adjRow, adjCol]) =>
    isLowAdjacent({ r: adjRow, c: adjCol }),
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (isLow({ row, col }, input)) {
        sum += 1 + input[row][col];
      }
    }
  }

  return sum;
};

const calcBasinSize = ({ row, col }: Point, input: number[][]) => {
  const basinPointsKey = (r: number, c: number) => `${r},${c}`;
  const basinPoints = new Set<string>([basinPointsKey(row, col)]);

  const dfs = [{ r: row, c: col }];
  const adjacentIsInBasin = (point: number, adjacent: undefined | number) => {
    return adjacent !== undefined && adjacent < 9 && adjacent > point;
  };
  const addPointToBasin = (r: number, c: number) => {
    basinPoints.add(basinPointsKey(r, c));
    dfs.push({ r, c });
  };

  while (dfs.length > 0) {
    const { r, c } = dfs.pop()!;
    const point = input[r][c];

    const addAdjacent = (adjRow: number, adjCol: number) => {
      if (basinPoints.has(basinPointsKey(adjRow, adjCol))) return;

      const adjacent: number | undefined = input[adjRow]?.[adjCol];
      if (adjacentIsInBasin(point, adjacent)) {
        addPointToBasin(adjRow, adjCol);
      }
    };

    const top = [r - 1, c];
    const bottom = [r + 1, c];
    const left = [r, c - 1];
    const right = [r, c + 1];
    [top, bottom, left, right].forEach(([adjRow, adjCol]) =>
      addAdjacent(adjRow, adjCol),
    );
  }

  return basinPoints.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const largestBasins: number[] = [];
  const addBasin = (basinSize: number) => {
    largestBasins.push(basinSize);
    largestBasins.sort((a, b) => b - a);
    if (largestBasins.length > 3) {
      largestBasins.pop();
    }
  };

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (isLow({ row, col }, input)) {
        const basinSize = calcBasinSize({ row, col }, input);
        addBasin(basinSize);
      }
    }
  }

  return largestBasins.reduce((acc, size) => acc * size, 1);
};

const exampleInput = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;
run({
  part1: {
    tests: [{ name: "", input: exampleInput, expected: 15 }],
    solution: part1,
  },
  part2: {
    tests: [{ name: "", input: exampleInput, expected: 1134 }],
    solution: part2,
  },
  trimTestInputs: true,
});
