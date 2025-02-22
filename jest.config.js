module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/test"],
    moduleFileExtensions: ["ts", "js", "json", "node"],
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/src/$1",
    },
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
  };
  