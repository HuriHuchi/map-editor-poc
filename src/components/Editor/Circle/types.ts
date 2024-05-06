import { Entity } from '@/types'

export type ExternalProps = {
  id: string
}

export type InteralProps = Entity & React.HTMLAttributes<HTMLDivElement>
