import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node', // o 'jsdom' si es necesario
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/components/**/*.ts', '<rootDir>/pages/**/*.ts'],
  coverageDirectory: 'coverage',
};

export default config;