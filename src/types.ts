export type AppId = 'welcome' | 'memory' | 'prediction' | 'chess' | 'agent' | 'notebook' | 'archive' | 'about' | 'contact';
export type Workspace = 'overview' | 'explore' | 'notebook';
export interface AppProps { openApp: (id: AppId) => void }
export interface AppDefinition { id: AppId; title: string; subtitle: string; color: string; short: string }
