import { WritableDraft } from 'immer'
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
  viewingHistoryId: string | null
}

type Actions = {
  actions: {
    initEditor: (el: HTMLDivElement) => void
    updateMode: (mode: Mode) => void
    addEntity: (entity: Entity) => void
    moveEntity: (id: string, position: { x: number; y: number }) => void
    deleteEntity: (id: string) => void
    deleteAllEntities: () => void
    modifyEntity: (id: string, partial: Partial<Entity>) => void
    // selected
    selectEntity: (id: string | null) => void
    changeEntitySize: (id: string, size: number) => void
    saveHistory: () => void
    viewHistory: (id: string | null) => void
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
    viewingHistoryId: null,
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
      deleteAllEntities: () =>
        set((state) => {
          state.ids = []
          state.entities = {}
        }),
      modifyEntity: (id, partial) =>
        set((state) => {
          state.entities[id] = { ...state.entities[id], ...partial }
        }),
      selectEntity: (id) => set({ selectedEntityId: id }),
      changeEntitySize: (id, size) =>
        set((state) => {
          state.entities[id].size = size
        }),
      saveHistory: () =>
        set((state) => {
          // if editing history
          if (state.viewingHistoryId) {
            const history = state.savedHistories.find((h) => h.historyId === state.viewingHistoryId)
            if (!history) return

            history.entities = state.ids.map((id) => state.entities[id])
            history.updatedAt = new Date().toISOString()

            state.viewingHistoryId = null
          } else {
            // if new history
            const entities = state.ids.map((id) => state.entities[id])
            const historyId = nanoid()
            const createdAt = new Date().toISOString()
            state.savedHistories.push({ entities, historyId, createdAt })
          }

          clear(state)
        }),
      viewHistory: (id) =>
        set((state) => {
          state.viewingHistoryId = id
          const history = state.savedHistories.find((h) => h.historyId === id)

          if (!history) {
            clear(state)
            return
          }

          state.ids = history.entities.map((e) => e.id)
          state.entities = history.entities.reduce((acc, e) => {
            acc[e.id] = e
            return acc
          }, {} as Record<string, Entity>)

          state.selectedEntityId = null
        }),
    },
  })),
)

// helpers
function clear(state: WritableDraft<Store>) {
  state.ids = []
  state.entities = {}
  state.selectedEntityId = null
}

// selectors
export const useEntity = (id: string) => useStore((s) => s.entities[id])
export const useEntityIds = () => useStore((s) => s.ids)
export const useMode = () => useStore((s) => s.mode)
export const useSelectedEntityId = () => useStore((s) => s.selectedEntityId)
export const useEditor = () => useStore((s) => s.editorEl)
export const useHistories = () => useStore((s) => s.savedHistories)
export const useViewingHistoryId = () => useStore((s) => s.viewingHistoryId)

export const useActions = () => useStore((s) => s.actions)