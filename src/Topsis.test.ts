import Topsis from './Topsis.js';

test('Rank 4 alternatives with 6 criteria', () => {
  const topsis = new Topsis([
    { weight: 4, type: 'cost' },
    { weight: 5, type: 'benefit' },
    { weight: 4, type: 'benefit' },
    { weight: 3, type: 'benefit' },
    { weight: 3, type: 'benefit' },
    { weight: 2, type: 'benefit' },
  ]);

  expect(
    topsis.rank(
      [
        [3500, 70, 10, 80, 3000, 36],
        [4500, 90, 10, 60, 2500, 48],
        [4000, 80, 9, 90, 2000, 48],
        [4000, 70, 8, 50, 1500, 60],
      ],
      true
    )
  ).toEqual([0, 2, 1, 3]);
});
