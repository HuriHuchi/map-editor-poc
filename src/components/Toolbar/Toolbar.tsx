import { useActions, useMode } from '@/stores'
import { Mode, MODES } from '@/types'
import { Button } from '@/components'
import { useEffect } from 'react'

export function Toolbar() {
  const mode = useMode()
  const { updateMode } = useActions()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'c') {
        updateMode('create')
      } else if (e.key === 'e') {
        updateMode('edit')
      } else if (e.key === 'd') {
        updateMode('delete')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [updateMode])

  return (
    <div className='p-3 bg-stone-100 border border-stone-800 self-start mb-4'>
      {(Object.values(MODES)).map((m) => (
        <Button
          key={m}
          variant={m === mode ? 'primary' : 'secondary'}
          onClick={() => updateMode(m as Mode)}>
          {m} <code>({m[0]})</code>
        </Button>
      ))}
    </div>
  )
}
