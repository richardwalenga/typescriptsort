# TypeScript Sort

This code was a way for me to familiarize myself a bit with TypeScript by implementing common sorting algorithms.  The SortTests file gives an idea of how the algorithms compare with regard to efficiency.

## Setup

This project depends on an install of node and npm. Once those are installed, run the VS Code task "install compiler."

## Running

To run the sorting tests, run the VS Code task "run tests."

Linting support has been added. Run this npm script for identify issues:
```
npm run lint
```

Source file formatting has also been added via prettier, which can be invoked by running this:
```
npm run format
```

The generated JS files in the out folder are unaffected by the linting and formatting, since both of them ignore the patterns in the .gitignore.