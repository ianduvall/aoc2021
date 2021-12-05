import run from "aocrunner";

type Coordinates = [x: number, y: number];
type Line = [start: Coordinates, end: Coordinates];

const parseCoordinates = (coord: string): Coordinates => {
  const [x, y] = coord.split(',').map(Number);
  return [x, y];
};
const parseLine = (line: string): Line => {
  const [start, end] = line.split(' -> ');
  
  return [parseCoordinates(start), parseCoordinates(end)];
};

const parseInput = (rawInput: string): Line[] => rawInput.split("\n").map(line => parseLine(line));

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  let numIntersectionsGreaterThanOne = 0;
  type MapKey = `${string},${string}`;
  const map = new Map<MapKey, number>();

  const logCoordinate = ([x, y]: Coordinates) => {
    const key: MapKey = `${x},${y}`;
    let intersections = map.get(key) || 0;
    if (intersections) {
      map.set(key, ++intersections);
      if (intersections === 2) {
        ++numIntersectionsGreaterThanOne;
      }
    } else {
      map.set(key, 1);
    }
  };

  for (const line of lines) {
    const [start, end] = line;
    let [x1, y1] = start;
    let [x2, y2] = end;

    const vertical = x1 === x2;
    const horizontal = y1 === y2;
    if (vertical) {
      const min = Math.min(y1, y2);
      const max = Math.max(y1, y2);
      for (let y = min; y <= max; y++) {
        logCoordinate([x1, y]);
      }
    } else if (horizontal) {
      const min = Math.min(x1, x2);
      const max = Math.max(x1, x2);
      for (let x = min; x <= max; x++) {
        logCoordinate([x, y1]);
      }
    }
  }

  return numIntersectionsGreaterThanOne;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  let numIntersectionsGreaterThanOne = 0;
  type MapKey = `${string},${string}`;
  const map = new Map<MapKey, number>();

  const logCoordinate = ([x, y]: Coordinates) => {
    const key: MapKey = `${x},${y}`;
    let intersections = map.get(key) || 0;
    if (intersections) {
      map.set(key, ++intersections);
      if (intersections === 2) {
        ++numIntersectionsGreaterThanOne;
      }
    } else {
      map.set(key, 1);
    }
  };

  for (const line of lines) {
    const [start, end] = line;
    let [x1, y1] = start;
    let [x2, y2] = end;

    const vertical = x1 === x2;
    const horizontal = y1 === y2;
    if (vertical) {
      const min = Math.min(y1, y2);
      const max = Math.max(y1, y2);
      for (let y = min; y <= max; y++) {
        logCoordinate([x1, y]);
      }
    } else if (horizontal) {
      const min = Math.min(x1, x2);
      const max = Math.max(x1, x2);
      for (let x = min; x <= max; x++) {
        logCoordinate([x, y1]);
      }
    } else {
      // diagonal
      const incrementX = x1 < x2 ? (x: number) => x + 1 : (x: number) => x - 1;
      const incrementY = y1 < y2 ? (y: number) => y + 1: (y: number) => y - 1;
      for (let x = x1, y = y1; x !== x2; x = incrementX(x), y = incrementY(y)) {
        logCoordinate([x, y]);
      }
      // need to check the last coordinate
      logCoordinate([x2, y2]);
    }
  }

  return numIntersectionsGreaterThanOne;
};

run({
  part1: {
    tests: [
      { input: `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `, expected: 5 },
      // don't double count intersections
      { input: `0,9 -> 2,9
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `, expected: 5 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `, expected: 12 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
