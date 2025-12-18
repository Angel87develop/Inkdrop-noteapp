import { ElectronAPI } from '@electron-toolkit/preload'

export interface FileManagerAPI {
  saveNoteToFile: (
    noteId: string,
    title: string,
    content: string,
    notebookId?: string
  ) => Promise<{ success: boolean; filePath?: string; error?: string }>
  deleteNoteFile: (
    noteId: string,
    title: string,
    notebookId?: string
  ) => Promise<{ success: boolean; error?: string }>
  getNoteForgeNotesPath: () => Promise<{ success: boolean; path?: string; error?: string }>
  deleteNotebookFolder: (notebookId: string) => Promise<{ success: boolean; error?: string }>
  createNotebookFolder: (
    notebookId: string,
    notebookName: string
  ) => Promise<{ success: boolean; folderPath?: string; error?: string }>
  loadNotebooks: () => Promise<{
    success: boolean
    notebooks?: Array<{ id: string; name: string }>
    error?: string
  }>
  loadNotes: () => Promise<{
    success: boolean
    notes?: Array<{
      id: string
      title: string
      content: string
      notebook?: string
      createdAt: string
      updatedAt: string
    }>
    error?: string
  }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: FileManagerAPI
  }
}
