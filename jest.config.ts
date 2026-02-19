import type { Config } from 'jest';

const config: Config = {
  // ✅ Используем ts-jest для TS и JSX
  preset: 'ts-jest',

  // ✅ Подключаем окружение jsdom для React
  testEnvironment: 'jsdom',

  // ✅ Автоочистка моков между тестами
  clearMocks: true,

  // ✅ Сбор покрытия
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // ✅ Настройка alias @ (если используешь)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // ✅ Подключаем jest-dom (для toBeInTheDocument, toBeChecked)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // ✅ Игнорировать node_modules (по умолчанию)
  transformIgnorePatterns: ['/node_modules/'],

  // ✅ Опционально: распознаём файлы тестов с .ts, .tsx, .js, .jsx
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).(ts|tsx|js|jsx)'],
};

export default config;
