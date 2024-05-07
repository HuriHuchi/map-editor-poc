import React, { HTMLAttributes, forwardRef, useRef } from 'react'
import { nanoid } from 'nanoid'
import { useActions, useEntityIds, useMode } from '@/stores'
import { Circle } from './Circle'
import { cn } from '@/lib/utils'
import { SIZE } from './config'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, ...props }, ref) => {
  const mode = useMode()
  return (
    <div
      className={cn(
        'border border-stone-900 min-h-[500px] w-[1000px]',
        mode === 'create' ? 'cursor-crosshair' : 'cursor-default',
      )}
      ref={ref}
      {...props}>
      {children}
    </div>
  )
})

export function Editor() {
  const ref = useRef<HTMLDivElement>()
  const ids = useEntityIds()
  const mode = useMode()
  const { addEntity, initEditor } = useActions()

  const init = (element: HTMLDivElement) => {
    if (!ref.current) {
      ref.current = element
      initEditor(element)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'create') return

    addEntity({
      id: nanoid(),
      position: { x: e.clientX, y: e.clientY },
      size: SIZE,
    })
  }

  return (
    <Container ref={init} onClick={handleClick}>
      {ids.map((id) => (
        <Circle key={id} id={id} />
      ))}
    </Container>
  )
}
