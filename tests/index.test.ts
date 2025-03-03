// tests/index.test.ts
// import { helloWorld } from "../src/";

// describe('helloWorld function', () => {
//   describe('in scenario A', () => {
//     it('should return a hello message', () => {
//       expect(helloWorld()).toBe('Hello, world!');
//     });
//   })
// });

import { Universe, Seed } from '../src/';

describe('A universe is always started with a seed that will introduce the living cells during the Universe Time.', () => {
  describe('When the universe is created the living cells are the same as the Seed ones', () => {
    it('Empty Seed will return empty Universe', () => {
      const emptySeed = new Seed();
      const emptyUniverse = new Universe(emptySeed);
      expect(emptyUniverse.livingCells()).toStrictEqual(
        emptySeed.livingCells()
      );
    });
  });
});