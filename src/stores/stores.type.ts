import { History } from '@/types'
import { StateCreator } from 'zustand'

export type AllSlices = HistorySlice

export type _StateCreator<T> = StateCreator<AllSlices, [['zustand/immer', never]], [], T>

export type HistorySlice = {
  histories: History[]
  currentHistoryId: string | null
  saveHistory: () => void
  selectHistory: (id: string | null) => void
  deleteHistory: (id: string) => void
}
