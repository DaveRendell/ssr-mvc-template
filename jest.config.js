module.exports = {
  "roots": [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/server.ts",
    "!src/config.ts",
    "!src/types/**/*"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },
  "snapshotSerializers": ["jest-serializer-html"],
}