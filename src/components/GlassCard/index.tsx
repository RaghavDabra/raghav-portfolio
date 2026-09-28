import type { ReactNode } from 'react'
import cn from 'classnames'
import style from './index.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className }: Props) {
  return <div className={cn(style.root, className)}>{children}</div>
}
