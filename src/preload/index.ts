import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  saveNoteToFile: (noteId: string, title: string, content: string, notebookId?: string) =>
    electronAPI.ipcRenderer.invoke('save-note-to-file', noteId, title, content, notebookId),
  deleteNoteFile: (noteId: string, title: string, notebookId?: string) =>
    electronAPI.ipcRenderer.invoke('delete-note-file', noteId, title, notebookId),
  getNoteForgeNotesPath: () => electronAPI.ipcRenderer.invoke('get-noteforge-notes-path'),
  deleteNotebookFolder: (notebookId: string) =>
    electronAPI.ipcRenderer.invoke('delete-notebook-folder', notebookId),
  createNotebookFolder: (notebookId: string, notebookName: string) =>
    electronAPI.ipcRenderer.invoke('create-notebook-folder', notebookId, notebookName),
  loadNotebooks: () => electronAPI.ipcRenderer.invoke('load-notebooks'),
  loadNotes: () => electronAPI.ipcRenderer.invoke('load-notes'),
  openDataFolder: () => electronAPI.ipcRenderer.invoke('open-data-folder')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
