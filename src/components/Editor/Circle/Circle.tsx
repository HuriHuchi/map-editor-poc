import { SIZE } from '../config'
import { useActions, useEntity, useMode, useStore } from '@/stores'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { isInBound } from '../helper'
import { ExternalProps, InteralProps } from './types'

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
  ({ position: { x, y }, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          borderRadius: `${SIZE}px`,
          backgroundColor: 'black',
          left: `${x - SIZE / 2}px`,
          top: `${y - SIZE / 2}px`,
          ...style,
        }}
        {...props}></div>
    )
  },
)

function Editable(props: InteralProps) {
  const { id } = props

  const editor = useStore((s) => s.editorEl)
  const [isDragging, setIsDragging] = useState(false)

  const frameID = useRef<number>()
  const circle = useRef<HTMLDivElement>(null)

  const { moveEntity } = useActions()

  useEffect(() => {
    if (!editor) return
    const { top, left, bottom, right } = editor.getBoundingClientRect()

    const handleMouseUp = () => {
      if (!isDragging) return

      setIsDragging(false)

      if (circle.current) {
        const { x, y } = circle.current.getBoundingClientRect()
        const newPos = {
          x: x + SIZE / 2,
          y: y + SIZE / 2,
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
        circle.current.style.left = `${e.clientX - SIZE / 2}px`
        circle.current.style.top = `${e.clientY - SIZE / 2}px`
      })
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [id, editor, isDragging, moveEntity])

  const handleMouseDown = () => setIsDragging(true)

  return (
    <Base
      ref={circle}
      onMouseDown={handleMouseDown}
      className='hover:border-[4px] hover:border-green-500 cursor-pointer'
      {...props}
    />
  )
}

function Deletable(props: InteralProps) {
  const { deleteEntity } = useActions()
  return (
    <Base
      onClick={() => {
        deleteEntity(props.id)
      }}
      className='hover:border-[4px] hover:border-red-500 cursor-pointer'
      {...props}></Base>
  )
}
