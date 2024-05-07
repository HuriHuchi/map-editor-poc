import { useActions } from '@/stores'
import { Row } from '../ui/Row'

export function ColorPicker({ selectedId }: { selectedId: string }) {
  const { modifyEntity } = useActions()
  return (
    <Row>
      <label htmlFor='color-picker'>Color:</label>
      <input
        type='color'
        id='color-picker'
        onChange={(e) => {
          const color = e.target.value
          modifyEntity(selectedId, { color })
        }}
      />
    </Row>
  )
}
