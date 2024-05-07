import { cn } from '@/lib/utils'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-3 py-2',
        variant === 'primary' && 'bg-black text-white',
        variant === 'secondary' && 'bg-stone-100 text-black',
        className,
      )}
      {...props}>
      {children}
    </button>
  )
}
