import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  gap?: number
}

export function Row({ children, gap = 2 }: Props) {
  return <div className={cn('flex items-center', `gap-${gap}`)}>{children}</div>
}
