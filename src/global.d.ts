// this file contains missing TypeScript type definitions used throughout the app

interface NodeRequire {
  ensure(dependencies: string[], callback: (require: NodeRequire) => void): void;
}
