import run from "aocrunner";

interface Node {
  name: string;
  edges: Node[];
  isBigCave: boolean;
}
const parseInput = (rawInput: string) => rawInput.split("\n");
const isBigCave = (name: string) => /[A-Z]/.test(name);
const parseNodes = (input: string[]) => {
  const nodes = new Map<string, Node>();

  for (const line of input) {
    const [from, to] = line.split("-");

    let fromNode = nodes.get(from);
    if (!fromNode) {
      fromNode = {
        name: from,
        edges: [],
        isBigCave: isBigCave(from),
      };
      nodes.set(from, fromNode);
    }

    let toNode = nodes.get(to);
    if (!toNode) {
      toNode = {
        name: to,
        edges: [],
        isBigCave: isBigCave(to),
      };
      nodes.set(to, toNode);
    }

    fromNode.edges.push(toNode);
    toNode.edges.push(fromNode);
  }

  return nodes;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const nodes = parseNodes(input);

  const startNode = nodes.get("start")!;
  let numPaths = 0;
  const dfs = [{ node: startNode, visited: new Set<Node>([startNode]) }];

  while (dfs.length > 0) {
    const { node, visited } = dfs.pop()!;
    const nextVisited = new Set(visited);
    nextVisited.add(node);

    for (const edgeNode of node.edges) {
      if (!nextVisited.has(edgeNode) || edgeNode.isBigCave) {
        if (edgeNode.name === "end") {
          ++numPaths;
        } else {
          dfs.push({ node: edgeNode, visited: nextVisited });
        }
      }
    }
  }

  return numPaths;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const log = input.length < 8 ? console.log : () => {};
  const paths = new Map<string, number>();
  const nodes = parseNodes(input);

  const startNode = nodes.get("start")!;
  const endNode = nodes.get("end")!;
  let numPaths = 0;
  const dfs = [
    {
      node: startNode,
      visitedCount: new Map<Node, number>([[startNode, Infinity]]),
      hasVisitedSmallCaveTwice: false,
    },
  ];

  while (dfs.length > 0) {
    const { node, visitedCount, hasVisitedSmallCaveTwice } = dfs.pop()!;

    for (const edgeNode of node.edges) {
      const edgeVisitedCount = visitedCount.get(edgeNode) || 0;
      if (edgeNode === endNode) {
        ++numPaths;
        continue;
      }

      if (edgeNode.isBigCave || edgeVisitedCount < 1) {
        const nextVisitedCount = new Map(visitedCount);
        nextVisitedCount.set(edgeNode, edgeVisitedCount + 1);
        dfs.push({
          node: edgeNode,
          visitedCount: nextVisitedCount,
          hasVisitedSmallCaveTwice,
        });
      } else if (edgeVisitedCount === 1 && !hasVisitedSmallCaveTwice) {
        const nextVisitedCount = new Map(visitedCount);
        nextVisitedCount.set(edgeNode, edgeVisitedCount + 1);
        dfs.push({
          node: edgeNode,
          visitedCount: nextVisitedCount,
          hasVisitedSmallCaveTwice: true,
        });
      }
    }
  }

  log(paths);
  return numPaths;
};

const exampleInput1 = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;
const exampleInput2 = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;
const exampleInput3 = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;
run({
  part1: {
    tests: [
      { name: "example input 1", input: exampleInput1, expected: 10 },
      { name: "example input 2", input: exampleInput2, expected: 19 },
      { name: "example input 3", input: exampleInput3, expected: 226 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { name: "example input 1", input: exampleInput1, expected: 36 },
      { name: "example input 2", input: exampleInput2, expected: 103 },
      { name: "example input 3", input: exampleInput3, expected: 3509 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
