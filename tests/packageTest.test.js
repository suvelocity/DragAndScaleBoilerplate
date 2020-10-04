test("package.json does not include any extra libraries ", () => {
  const pack = require("../package.json");
  const expectedDependencies = [
    "jest",
    "puppeteer",
  ];

  const isDependeciesClean = Object.keys(pack.dependencies)
    .map((key) => expectedDependencies.includes(key))
    .every((result) => result === true);

  const isDevDependeciesClean = pack.devDependencies === undefined;

  expect(isDependeciesClean).toBe(true);
  expect(isDevDependeciesClean).toBe(true);
});
