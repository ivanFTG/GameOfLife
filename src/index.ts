// src/index.ts

export class Universe {
  cells: Cell[];
  private universeMaxX = 0;
  private universeMaxY = 0;
  private universeMinX = 0;
  private universeMinY = 0;

  constructor(seed: Seed) {
    this.cells = seed.livingCells();
    this.calculateUniverseSize();
  }

  tick() {
    this.markCellsToDie();
    this.reLiveCells();
    this.killCells();
  }

  livingCells(): Cell[] {
    return this.cells;
  }

  numberOfLivingCells(): number {
    return this.cells.length;
  }

  calculateUniverseSize() {
    this.universeMaxX =
      Math.max(...this.cells.map((cell) => cell.xPosition)) + 1;
    this.universeMaxY =
      Math.max(...this.cells.map((cell) => cell.yPosition)) + 1;
    this.universeMinX =
      Math.min(...this.cells.map((cell) => cell.xPosition)) - 1;
    this.universeMinY =
      Math.min(...this.cells.map((cell) => cell.yPosition)) - 1;
  }

  findLivingCellIndexFor(cell: Cell): number {
    return this.livingCells().findIndex((livingCell) => {
      return livingCell.equalsTo(cell);
    });
  }

  private markCellsToDie() {
    this.livingCells().forEach((cell) => {
      const neighbours = this.numberOfNeighbours(cell);
      cell.shouldDie = this.shouldCellDie(neighbours);
    });
  }

  private shouldCellDie(numberOfNeighbours: number): boolean {
    return numberOfNeighbours < 2 || numberOfNeighbours > 3;
  }

  private shouldCellRelive(numberOfNeighbours: number): boolean {
    return numberOfNeighbours == 3;
  }

  private killCells() {
    this.cells = this.cells.filter((cell) => {
      return !cell.shouldDie;
    });
  }

  private reLiveCells() {
    const deadCells: Cell[] = [];
    for (let x = this.universeMinX; x <= this.universeMaxX; x++) {
      for (let y = this.universeMinY; y <= this.universeMaxY; y++) {
        const possibleDeadCell = new Cell(x, y);
        const indexOfCell = this.findLivingCellIndexFor(possibleDeadCell);
        if (indexOfCell == -1) {
          deadCells.push(possibleDeadCell);
        }
      }
    }
    deadCells.forEach((cell) => {
      const neighbours = this.numberOfNeighbours(cell);
      if (this.shouldCellRelive(neighbours)) {
        this.cells.push(cell);
      }
    });
    this.calculateUniverseSize();
  }

  private numberOfNeighbours(cell: Cell): number {
    let neighbourCount: number = 0;
    this.cells.forEach((possibleNeighbour) => {
      if (cell.isNeighbourOf(possibleNeighbour)) {
        neighbourCount++;
      }
    });
    return neighbourCount;
  }
}

export class Seed {
  private cells: Cell[] = [];

  livingCells(): Cell[] {
    return this.cells;
  }

  addLivingCells(...cells: Cell[]) {
    cells.forEach((cell) => {
      this.cells.push(cell);
    });
  }
}

export class Cell {
  xPosition: number;
  yPosition: number;
  shouldDie: boolean = false;

  constructor(x: number, y: number) {
    this.xPosition = x;
    this.yPosition = y;
  }

  isNeighbourOf(cell: Cell): boolean {
    const neighbours = [
      new Cell(this.xPosition - 1, this.yPosition - 1),
      new Cell(this.xPosition - 1, this.yPosition),
      new Cell(this.xPosition - 1, this.yPosition + 1),
      new Cell(this.xPosition, this.yPosition - 1),
      new Cell(this.xPosition, this.yPosition + 1),
      new Cell(this.xPosition + 1, this.yPosition),
      new Cell(this.xPosition + 1, this.yPosition - 1),
      new Cell(this.xPosition + 1, this.yPosition + 1),
    ];
    return (
      neighbours.findIndex((neighbour) => {
        return neighbour.equalsTo(cell);
      }) >= 0
    );
  }

  equalsTo(cell: Cell) {
    return this.xPosition == cell.xPosition && this.yPosition == cell.yPosition;
  }
}
