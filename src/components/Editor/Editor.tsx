import { Entity } from '@/types'
import React, { HTMLAttributes, forwardRef, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

const SIZE = 48

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, ...props }, ref) => {
  return (
    <div className='border border-stone-900 min-h-[500px] w-full relative' {...props} ref={ref}>
      {children}
    </div>
  )
})

export function Editor() {
  const ref = useRef<HTMLDivElement>()
  const offset = useRef({ x: 0, y: 0 })
  const [entities, setEntities] = useState<Entity[]>([])

  const init = (element: HTMLDivElement) => {
    if (!ref.current) {
      ref.current = element
    }
    const { x, y } = ref.current.getBoundingClientRect()
    offset.current = { x, y }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { x, y } = offset.current

    const en: Entity = {
      id: nanoid(),
      position: { x: e.clientX - x - SIZE / 2, y: e.clientY - y - SIZE / 2 },
    }

    setEntities([...entities, en])
  }
  return (
    <Container ref={init} onClick={handleClick}>
      {entities.map((entity) => (
        <Circle key={entity.id} {...entity} />
      ))}
    </Container>
  )
}

function Circle({ position: { x, y } }: Entity) {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'black',
        width: SIZE,
        height: SIZE,
        left: x,
        top: y,
        borderRadius: SIZE,
      }}></div>
  )
}
