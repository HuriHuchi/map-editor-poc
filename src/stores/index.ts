import { Entity, Mode } from '@/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  mode: Mode
  ids: string[]
  entities: Record<string, Entity>
  editorEl: HTMLDivElement | null
}

type Actions = {
  actions: {
    initEditor: (el: HTMLDivElement) => void
    updateMode: (mode: Mode) => void
    addEntity: (entity: Entity) => void
    moveEntity: (id: string, position: { x: number; y: number }) => void
    deleteEntity: (id: string) => void
  }
}

type Store = State & Actions

export const useStore = create<Store>()(
  immer((set) => ({
    mode: 'create',
    ids: [],
    entities: {},
    editorEl: null,
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
    },
  })),
)

export const useEntity = (id: string) => useStore((s) => s.entities[id])
export const useEntityIds = () => useStore((s) => s.ids)
export const useMode = () => useStore((s) => s.mode)

export const useActions = () => useStore((s) => s.actions)
