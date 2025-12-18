/// <reference types="vite/client" />

interface Window {
  api: {
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
    ) => Promise<{ success: boolean }>
    getNoteForgeNotesPath: () => Promise<{ success: boolean; path?: string; error?: string }>
    deleteNotebookFolder: (notebookId: string) => Promise<{ success: boolean }>
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
    openDataFolder: () => Promise<{ success: boolean; error?: string }>
  }
}
