import { useActions, useEditor, useEntity, useMode, useSelectedEntityId } from '@/stores'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { isInBound } from '../helper'
import { ExternalProps, InteralProps } from './types'
import { cn } from '@/lib/utils'

export function Circle({ id }: ExternalProps) {
  const mode = useMode()
  const entity = useEntity(id)

  switch (mode) {
    case 'create':
      return <Base {...entity} />
    case 'edit':
      return <Editable {...entity} />
    case 'delete':
      return <Deletable {...entity} />
    default:
      return null
  }
}

const Base = forwardRef<HTMLDivElement, InteralProps>(
  ({ position: { x, y }, size, style, color, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${size}px`,
          backgroundColor: color,
          left: `${x - size / 2}px`,
          top: `${y - size / 2}px`,
          ...style,
        }}
        {...props}>
        {children}
      </div>
    )
  },
)

const Editable = (props: InteralProps) => {
  const { id, size } = props

  const editor = useEditor()
  const selectedId = useSelectedEntityId()
  const [isDragging, setIsDragging] = useState(false)

  const frameID = useRef<number>()
  const circle = useRef<HTMLDivElement>(null)

  const { moveEntity, selectEntity } = useActions()

  useEffect(() => {
    if (!editor) return

    const { top, left, bottom, right } = editor.getBoundingClientRect()

    const handleMouseUp = () => {
      if (!isDragging) return

      setIsDragging(false)

      if (circle.current) {
        const { x, y } = circle.current.getBoundingClientRect()
        const newPos = {
          x: x + size / 2,
          y: y + size / 2,
        }
        moveEntity(id, newPos)
      }
    }

    const handleMove = (e: MouseEvent) => {
      if (!isDragging) return

      // bound check
      if (!isInBound({ x: e.clientX, y: e.clientY }, { top, left, bottom, right })) return

      cancelAnimationFrame(frameID.current ?? 0)
      frameID.current = requestAnimationFrame(() => {
        if (!circle.current) return
        circle.current.style.left = `${e.clientX - size / 2}px`
        circle.current.style.top = `${e.clientY - size / 2}px`
      })
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [id, editor, isDragging, moveEntity, size])

  const handleMouseDown = () => {
    setIsDragging(true)
    selectEntity(id)
  }

  return (
    <Base
      ref={circle}
      onMouseDown={handleMouseDown}
      className={cn(
        'hover:border-[4px] hover:border-green-500 cursor-pointer',
        selectedId === id && 'border-[4px] border-green-500',
      )}
      {...props}></Base>
  )
}

const Deletable = (props: InteralProps) => {
  const { deleteEntity } = useActions()
  return (
    <Base
      onClick={() => deleteEntity(props.id)}
      className='hover:border-[4px] hover:border-red-500 cursor-pointer'
      {...props}></Base>
  )
}
