/* eslint-disable prettier/prettier */
import { join } from 'path'
import { existsSync, mkdirSync, writeFileSync, unlinkSync, readdirSync, statSync, rmSync } from 'fs'
import { ensureNoteForgeNotesFolder, getNoteForgeNotesPath, sanitizeFileName } from './fileManager'

function findNoteFile(noteId: string, basePath: string): string | null {
  try {
    if (existsSync(basePath)) {
      const files = readdirSync(basePath)
      for (const file of files) {
        const fp = join(basePath, file)
        const st = statSync(fp)
        if (st.isFile() && file.endsWith('.md') && file.includes(`_${noteId}.md`)) return fp
      }
      const items = readdirSync(basePath)
      for (const item of items) {
        const ip = join(basePath, item)
        const st = statSync(ip)
        if (st.isDirectory()) {
          const files2 = readdirSync(ip)
          for (const f of files2) {
            const fp = join(ip, f)
            if (f.endsWith('.md') && f.includes(`_${noteId}.md`)) return fp
          }
        }
      }
    }
  } catch {
    return null
  }
  return null
}

export function saveMarkdown(noteId: string, title: string, content: string, notebookId?: string): string {
  const base = ensureNoteForgeNotesFolder()
  const existing = findNoteFile(noteId, base)
  const targetFolder = notebookId ? join(base, sanitizeFileName(notebookId)) : base
  if (!existsSync(targetFolder)) mkdirSync(targetFolder, { recursive: true })
  const safeTitle = sanitizeFileName(title) || 'Untitled_Note'
  const newName = `${safeTitle}_${noteId}.md`
  const newPath = join(targetFolder, newName)
  if (existing && existing !== newPath) {
    writeFileSync(newPath, content, 'utf-8')
    if (existsSync(existing)) unlinkSync(existing)
    return newPath
  }
  writeFileSync(existing || newPath, content, 'utf-8')
  return existing || newPath
}

export function deleteMarkdown(noteId: string, title: string, notebookId?: string): boolean {
  try {
    const base = getNoteForgeNotesPath()
    let target = base
    if (notebookId) target = join(base, sanitizeFileName(notebookId))
    const safeTitle = sanitizeFileName(title) || 'Untitled_Note'
    const name = `${safeTitle}_${noteId}.md`
    const fp = join(target, name)
    if (existsSync(fp)) {
      unlinkSync(fp)
      return true
    }
    return false
  } catch {
    return false
  }
}

export function deleteNotebookFolderSafe(notebookId: string): boolean {
  try {
    const base = getNoteForgeNotesPath()
    const folder = join(base, sanitizeFileName(notebookId))
    if (existsSync(folder)) {
      rmSync(folder, { recursive: true, force: true })
      return true
    }
    return false
  } catch {
    return false
  }
}
