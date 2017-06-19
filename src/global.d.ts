// this file contains missing TypeScript type definitions used throughout the app

interface NodeRequire {
  ensure(dependencies: string[], callback: (require: NodeRequire) => void, chunkName: string): void;
}

interface Window {
  AWB_APP_BASE_HREF: string
}
