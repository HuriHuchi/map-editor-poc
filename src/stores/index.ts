import { History } from './../types'
import { Entity, Mode } from '@/types'
import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  mode: Mode
  ids: string[]
  entities: Record<string, Entity>
  editorEl: HTMLDivElement | null
  selectedEntityId: string | null
  savedHistories: History[]
}

type Actions = {
  actions: {
    initEditor: (el: HTMLDivElement) => void
    updateMode: (mode: Mode) => void
    addEntity: (entity: Entity) => void
    moveEntity: (id: string, position: { x: number; y: number }) => void
    deleteEntity: (id: string) => void
    // selected
    updateSelectedEntityId: (id: string | null) => void
    changeEntitySize: (id: string, size: number) => void
    saveHistory: () => void
  }
}

type Store = State & Actions

export const useStore = create<Store>()(
  immer((set) => ({
    mode: 'create',
    ids: [],
    entities: {},
    editorEl: null,
    selectedEntityId: null,
    savedHistories: [],
    actions: {
      initEditor: (el) => set({ editorEl: el }),
      updateMode: (mode) => set({ mode }),
      addEntity: (entity) =>
        set((state) => {
          state.ids.push(entity.id)
          state.entities[entity.id] = entity
        }),
      moveEntity: (id, position) =>
        set((state) => {
          state.entities[id].position = position
        }),
      deleteEntity: (id) =>
        set((state) => {
          state.ids = state.ids.filter((i) => i !== id)
          delete state.entities[id]
        }),
      updateSelectedEntityId: (id) => set({ selectedEntityId: id }),
      changeEntitySize: (id, size) =>
        set((state) => {
          state.entities[id].size = size
        }),
      saveHistory: () =>
        set((state) => {
          const entities = state.ids.map((id) => state.entities[id])
          const historyId = nanoid()
          const createdAt = new Date().toISOString()
          state.savedHistories.push({ entities, historyId, createdAt })

          // clear
          state.ids = []
          state.entities = {}
        }),
    },
  })),
)

export const useEntity = (id: string) => useStore((s) => s.entities[id])
export const useEntityIds = () => useStore((s) => s.ids)
export const useMode = () => useStore((s) => s.mode)
export const useSelectedEntityId = () => useStore((s) => s.selectedEntityId)
export const useEditor = () => useStore((s) => s.editorEl)
export const useHistories = () => useStore((s) => s.savedHistories)

export const useActions = () => useStore((s) => s.actions)
