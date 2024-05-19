import { cn } from '@/lib/utils'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({
  children,
  className,
  variant = 'primary',
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'px-3 py-2',
        variant === 'primary' && 'bg-black text-white',
        variant === 'secondary' && 'bg-stone-100 text-black',
        disabled && 'opacity-50',
        variant === 'primary' && !disabled && 'hover:bg-stone-800',
        className,
      )}
      {...props}>
      {children}
    </button>
  )
}
