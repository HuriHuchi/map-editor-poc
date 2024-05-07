import { useActions, useSelectedEntityId, useViewingHistoryId } from '@/stores'
import { Button, Row } from '@/components'
import { SizeSlider } from './SizeSlider'
import { ColorPicker } from './ColorPicker'

export function Panel() {
  const selectedId = useSelectedEntityId()
  const historyId = useViewingHistoryId()
  const { saveHistory, deleteAllEntities } = useActions()

  return (
    <div className='flex flex-col gap-2 justify-between flex-1'>
      <div className='flex flex-col gap-2'>
        <Row>
          <label htmlFor=''>Working on: </label>
          <code>{historyId ?? 'Untitled'}</code>
        </Row>
        <hr className='my-2' />
        <Row>
          <label htmlFor=''>ID: </label>
          <code>{selectedId ?? 'empty'}</code>
        </Row>
        {selectedId && (
          <>
            <SizeSlider selectedId={selectedId} />
            <ColorPicker selectedId={selectedId} />
          </>
        )}
      </div>
      <div className='flex gap-2'>
        <Button className='hover:bg-stone-800 flex-1' onClick={saveHistory}>
          Save
        </Button>
        <Button variant='secondary' onClick={deleteAllEntities}>
          Clear
        </Button>
      </div>
    </div>
  )
}
