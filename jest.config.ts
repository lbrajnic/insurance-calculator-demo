/** @type {import('ts-jest').JestConfigWithTsJest} */
import { defaultsESM as tsjPreset } from "ts-jest/presets";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  ...tsjPreset,
  moduleNameMapper: { "^(\\.|\\.\\.)\\/(.+)\\.js": "$1/$2" },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  modulePathIgnorePatterns: ["<rootDir>/build/"],
};
