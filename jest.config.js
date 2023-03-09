/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  testMatch: ["<rootDir>/src/**/*.+(spec|test).ts?(x)"],
  transform: {
    ".spec.(ts|tsx)": "dts-jest/transform",
    ".(ts|tsx)": "ts-jest",
  },
  collectCoverage: true,
};
