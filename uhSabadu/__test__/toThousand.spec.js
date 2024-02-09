const mainController = require("../src/controllers/mainController")

test('Regex to string with thousand sep', () => {
    expect(mainController.toThousand(1000)).toBe('1.000');
  });