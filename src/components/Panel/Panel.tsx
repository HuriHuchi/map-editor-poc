import { useActions, useSelectedEntityId } from '@/stores'
import { Button, Row } from '@/components'

export function Panel() {
  const selectedId = useSelectedEntityId()
  const { changeEntitySize, saveHistory } = useActions()

  return (
    <div className='flex flex-col gap-2 justify-between'>
      <div>
        <Row>
          <label htmlFor=''>id: </label>
          <code>{selectedId ?? 'empty'}</code>
        </Row>
        {selectedId && (
          <Row>
            <label htmlFor='size-slider'>Size:</label>
            <input
              type='range'
              id='size-slider'
              onChange={(e) => {
                changeEntitySize(selectedId, +e.target.value)
              }}
            />
          </Row>
        )}
      </div>
      {/* bottom */}
      <Button className='hover:bg-stone-800' onClick={saveHistory}>
        Save
      </Button>
    </div>
  )
}
