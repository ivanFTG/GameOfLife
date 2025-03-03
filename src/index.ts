// src/index.ts
// export function helloWorld(): string {
//   return "Hello, world!";
// };

// console.log(helloWorld());

export class Universe {
  cells: Cell[];
  constructor(seed: Seed) {
    this.cells = seed.livingCells();
  }

  livingCells(): Cell[] {
    return [];
  }
}

export class Seed {
  livingCells(): Cell[] {
    return [];
  }
}

export class Cell {
}