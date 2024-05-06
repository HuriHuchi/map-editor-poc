import React, { HTMLAttributes, forwardRef, useRef } from 'react'
import { nanoid } from 'nanoid'
import { useActions, useEntityIds, useMode } from '@/stores'
import { Circle } from './Circle'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, ...props }, ref) => {
  return (
    <div className='border border-stone-900 min-h-[500px] w-full' {...props} ref={ref}>
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
