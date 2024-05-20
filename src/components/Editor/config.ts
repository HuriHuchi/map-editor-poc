import { Entity, Position } from '@/types'

export const SIZE = 48

export const getDefaultEntity = ({ id, position }: { id: string; position: Position }): Entity => ({
  id,
  position,
  size: SIZE,
  color: 'black',
})
