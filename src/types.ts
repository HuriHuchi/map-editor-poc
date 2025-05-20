export const MODES = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
} as const

export type Mode = (typeof MODES)[keyof typeof MODES]
export type Position = { x: number; y: number }

export type Entity = {
  id: string
  position: Position
  size: number
  color: string
}

export type History = {
  historyId: string
  entities: Entity[]
  createdAt: string
  updatedAt?: string
}
