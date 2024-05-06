import { useStore } from '@/stores'
import { Mode } from '@/types'

export function Toolbar() {
  const mode = useStore((s) => s.mode)
  const { updateMode } = useStore((s) => s.actions)

  return (
    <div className='p-3 bg-stone-100 border border-stone-800 self-start mb-4'>
      {['create', 'edit', 'delete'].map((m) => (
        <Button key={m} title={m} selected={m === mode} onClick={() => updateMode(m as Mode)} />
      ))}
    </div>
  )
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string
  selected: boolean
}

function Button({ title, selected, ...props }: ButtonProps) {
  return (
    <button
      className='px-3 py-2'
      style={{
        backgroundColor: selected ? 'black' : 'transparent',
        color: selected ? 'white' : 'black',
      }}
      {...props}>
      {title}
    </button>
  )
}
