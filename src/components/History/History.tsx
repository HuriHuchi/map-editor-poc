import { cn, formatDate } from '@/lib/utils'
import { useActions, useHistories, useCurrentHistoryId } from '@/stores'
import type { History as IHistory } from '@/types'
import { Trash2 } from 'lucide-react'

export function History() {
  const histories = useHistories()
  const currentHistoryId = useCurrentHistoryId()
  const { selectHistory } = useActions()

  const hasHistory = histories.length > 0

  return hasHistory ? (
    <div className='mt-6'>
      <div className='flex mb-4 gap-2 justify-between'>
        <h1 className='text-lg font-bold'>History</h1>
        {currentHistoryId ? (
          <button
            className='text-stone-500 text-sm rounded-lg p-1 hover:bg-stone-100 top-[2px] relative'
            onClick={() => selectHistory(null)}>
            Unselect
          </button>
        ) : null}
      </div>
      <ul className='flex flex-col gap-3'>
        {histories.map((h) => (
          <HistoryItem key={h.historyId} {...h} selected={currentHistoryId === h.historyId} />
        ))}
      </ul>
    </div>
  ) : null
}

function HistoryItem({
  historyId,
  createdAt,
  updatedAt,
  selected,
}: IHistory & { selected: boolean }) {
  const { selectHistory, deleteHistory } = useActions()
  return (
    <li>
      <button
        className={cn(
          'px-4 py-2 bg-stone-100 rounded-md flex items-center justify-between w-full hover:bg-stone-200',
          selected && 'bg-stone-900 text-white hover:bg-stone-900',
        )}
        onClick={() => selectHistory(historyId)}>
        <p>id: {historyId}</p>
        <div
          className={cn(
            'flex gap-2 text-stone-500 text-sm items-center',
            selected && 'text-white',
          )}>
          <p>createdAt: {formatDate(new Date(createdAt))}</p>
          {updatedAt && <p>updatedAt: {formatDate(new Date(updatedAt))}</p>}
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteHistory(historyId)
            }}
            className={cn(
              'hover:bg-stone-100 p-1 rounded-[4px] ml-1',
              selected && 'hover:bg-stone-700',
            )}>
            <Trash2 size={20} />
          </button>
        </div>
      </button>
    </li>
  )
}
