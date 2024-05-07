import { cn, formatDate } from '@/lib/utils'
import { useActions, useHistories, useViewingHistoryId } from '@/stores'
import type { History as IHistory } from '@/types'

export function History() {
  const histories = useHistories()
  const viewingId = useViewingHistoryId()
  const { viewHistory } = useActions()

  const hasHistory = histories.length > 0

  return hasHistory ? (
    <div className='mt-6'>
      <div className='flex mb-4 gap-2'>
        <h1 className='text-lg font-bold'>History</h1>
        {viewingId && (
          <button
            className='text-stone-500 text-sm rounded-lg p-1 hover:bg-stone-100 top-[2px] relative'
            onClick={() => viewHistory(null)}>
            unselect
          </button>
        )}
      </div>
      <ul className='flex flex-col gap-3'>
        {histories.map((h) => (
          <HistoryItem key={h.historyId} {...h} selected={viewingId === h.historyId} />
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
  const { viewHistory } = useActions()
  return (
    <li>
      <button
        className={cn(
          'px-4 py-2 bg-stone-100 rounded-md flex items-center justify-between w-full hover:bg-stone-200',
          selected && 'bg-stone-900 text-white hover:bg-stone-900',
        )}
        onClick={() => viewHistory(historyId)}>
        <p>id: {historyId}</p>
        <div className={cn('flex gap-2 text-stone-500 text-sm', selected && 'text-white')}>
          <p>createdAt: {formatDate(new Date(createdAt))}</p>
          {updatedAt && <p>updatedAt: {formatDate(new Date(updatedAt))}</p>}
        </div>
      </button>
    </li>
  )
}
