import { Position } from '@/types'

type Bound = {
  top: number
  left: number
  bottom: number
  right: number
}
export function isInBound(position: Position, bound: Bound) {
  return (
    position.x >= bound.left &&
    position.x <= bound.right &&
    position.y >= bound.top &&
    position.y <= bound.bottom
  )
}
