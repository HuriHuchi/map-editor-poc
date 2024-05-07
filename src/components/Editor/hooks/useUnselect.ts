import { useActions, useEditor } from '@/stores'
import { RefObject, useEffect } from 'react'

interface Params {
  entity: RefObject<HTMLDivElement>
}
export function useUnselect({ entity }: Params) {
  const { updateSelectedEntityId } = useActions()
  const editor = useEditor()

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!entity.current?.contains(e.target as Node) && editor?.contains(e.target as Node)) {
        updateSelectedEntityId(null)
      }
    }

    document.addEventListener('click', handleOutside)
    return () => {
      document.removeEventListener('click', handleOutside)
    }
  }, [updateSelectedEntityId, editor, entity])
}
