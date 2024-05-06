export type Mode = 'edit' | 'create' | 'delete'
export type Position = { x: number; y: number }

export type Entity = {
  id: string
  position: Position
}
