declare global {
  interface Window {
    ipcRendererInvoke: (...args: any[]) => Promise<any>
  }
}
