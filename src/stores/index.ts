import { WritableDraft } from 'immer'
import { History } from './../types'
import { Entity, Mode } from '@/types'
import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  mode: Mode
  ids: string[]
  entities: Record<string, Entity>
  editorEl: HTMLDivElement | null
  selectedEntityId: string | null
  histories: History[]
  currentHistoryId: string | null
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
    selectEntity: (id: string | null) => void
    changeEntitySize: (id: string, size: number) => void
    // history
    saveHistory: () => void
    selectHistory: (id: string | null) => void
    deleteHistory: (id: string) => void
  }
}

type Store = State & Actions

export const useStore = create<Store>()(
  persist(
    immer((set) => ({
      mode: 'create',
      ids: [],
      entities: {},
      editorEl: null,
      selectedEntityId: null,
      histories: [],
      currentHistoryId: null,
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

            if (id === state.selectedEntityId) {
              state.selectedEntityId = null
            }

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
            if (state.currentHistoryId) {
              // if editing history
              updateHistory(state)
            } else {
              // if new history
              createHistory(state)
            }

            clear(state)
          }),
        selectHistory: (id) =>
          set((state) => {
            // update current history
            state.currentHistoryId = id

            const history = state.histories.find((h) => h.historyId === id)

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
        deleteHistory: (id) =>
          set((state) => {
            state.histories = state.histories.filter((h) => h.historyId !== id)
            // if deleting history currently editing, then clear
            if (state.currentHistoryId === id) {
              clear(state)
            }
          }),
      },
    })),
    {
      name: 'editor-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([k]) => !['actions', 'editorEl'].includes(k)),
        ),
    },
  ),
)

// helper functions

function clear(state: WritableDraft<Store>) {
  state.ids = []
  state.entities = {}
  state.selectedEntityId = null
  state.currentHistoryId = null
}

function createHistory(state: WritableDraft<Store>) {
  const entities = state.ids.map((id) => state.entities[id])
  const historyId = nanoid()
  const createdAt = new Date().toISOString()
  state.histories.push({ entities, historyId, createdAt })
}

function updateHistory(state: WritableDraft<Store>) {
  const history = state.histories.find((h) => h.historyId === state.currentHistoryId)
  if (!history) return

  history.entities = state.ids.map((id) => state.entities[id])
  history.updatedAt = new Date().toISOString()

  state.currentHistoryId = null
}

// selectors
export const useEntity = (id: string) => useStore((s) => s.entities[id])
export const useEntityIds = () => useStore((s) => s.ids)
export const useMode = () => useStore((s) => s.mode)
export const useSelectedEntityId = () => useStore((s) => s.selectedEntityId)
export const useEditor = () => useStore((s) => s.editorEl)
export const useHistories = () => useStore((s) => s.histories)
export const useCurrentHistoryId = () => useStore((s) => s.currentHistoryId)

// action
export const useActions = () => useStore((s) => s.actions)
