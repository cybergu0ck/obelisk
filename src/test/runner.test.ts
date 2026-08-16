// tests/runner.test.ts
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { chiselContent } from '../formatter';

describe('Markdown Formatter', () => {
  const testsDir = __dirname; // Points to 'test/'

  const testFolders = fs.readdirSync(testsDir).filter((name) => {
    const fullPath = path.join(testsDir, name);
    return fs.statSync(fullPath).isDirectory();
  });

  testFolders.forEach((folder) => {
    it(`formats ${folder} correctly`, () => {
      const inputPath = path.join(testsDir, folder, 'input.md');
      const expectedPath = path.join(testsDir, folder, 'expected.md');

      const input = fs.readFileSync(inputPath, 'utf-8');
      const expected = fs.readFileSync(expectedPath, 'utf-8');

      expect(chiselContent(input).trim()).toBe(expected.trim());
    });
  });
});