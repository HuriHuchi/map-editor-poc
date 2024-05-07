import { useActions, useStore } from '@/stores'
import { Row } from '../ui/Row'

export function SizeSlider({ selectedId }: { selectedId: string }) {
  const size = useStore((s) => s.entities[selectedId]?.size)
  const { changeEntitySize } = useActions()
  return (
    <Row>
      <label htmlFor='size-slider'>Size:</label>
      <input
        min={1}
        max={100}
        type='range'
        id='size-slider'
        onChange={(e) => {
          changeEntitySize(selectedId, +e.target.value)
        }}
      />
      <span>{size}</span>
    </Row>
  )
}
