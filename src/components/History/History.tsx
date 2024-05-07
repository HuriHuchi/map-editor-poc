import { useHistories } from '@/stores'
import type { History as IHistory } from '@/types'

export function History() {
  const histories = useHistories()
  return (
    <div className='mt-6 w-[1000px]'>
      <h1 className='text-lg font-bold mb-4'>History</h1>
      <ul className='flex flex-col gap-3'>
        {histories.map((h) => (
          <HistoryItem key={h.historyId} {...h} />
        ))}
      </ul>
    </div>
  )
}

function HistoryItem({ historyId, createdAt }: IHistory) {
  return (
    <li>
      <button className='px-4 py-2 bg-stone-100 rounded-md flex items-center justify-between w-full hover:bg-stone-200'>
        <p>id: {historyId}</p>
        <p>{new Date(createdAt).toDateString()}</p>
      </button>
    </li>
  )
}
