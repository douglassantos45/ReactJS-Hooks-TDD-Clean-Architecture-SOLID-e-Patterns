module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*",
    "!<rootDir>/src/**/index.ts",
    "!**/*.d.ts", // Qualquer arquivo para testes
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest", //Antes de rodar o teste ele aplica e converte os testes
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],

  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1", // Configurando o mapeamento dos import para ficar com o path @
    "\\.scss$": "identity-obj-proxy",
  },
};
