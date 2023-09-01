module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    // transform: {
    //     // Add the following line to support ES modules
    //     '^.+\\.jsx?$': 'babel-jest',
    //     '^.+\\.(ts|tsx)?$': 'ts-jest',
    //   },
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }],
      },
      globals: {
        'ts-jest': {
          tsconfig: './tsconfig.json',
          // isolatedModules: true,
        },
      },
  };
  // module.exports = {
  //   preset: 'ts-jest',
  //   transform: {
  //     '^.+\\.(ts|tsx)?$': 'ts-jest',
  //     '^.+\\.(js|jsx)$": "babel-jest',
  //   }
  // };
  
