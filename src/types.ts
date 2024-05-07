export type Mode = 'edit' | 'create' | 'delete'
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
