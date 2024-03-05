const mainController = require("../../src/controllers/mainController")

test('Regex number bigger than 999 to string with thousand sep', () => {
  expect(mainController.toThousand(1000)).toBe('1.000');
});

test('Regex number smaller than 999 to string without thousand sep', () => {
  expect(mainController.toThousand(100)).toBe('100');
});

// test('Regex string without number produces error type', () => {
//   expect(mainController.toThousand("")).();
// });