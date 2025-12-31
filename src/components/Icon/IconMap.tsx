import { X, Search, ArrowLeft } from 'lucide-react'

// icon từ Figma (đã convert)
import Logo from './custom/Logo'
import Success from './custom/Success'

export type IconRenderProps = {
  size?: number
  color?: string
}

export const ICONS = {
  // ========== LIBRARY ICON ==========
  Close: ({ size = 20, color }: IconRenderProps) => (
    <X size={size} color={color} />
  ),
  Search: ({ size = 20, color }: IconRenderProps) => (
    <Search size={size} color={color} />
  ),
  Back: ({ size = 20, color }: IconRenderProps) => (
    <ArrowLeft size={size} color={color} />
  ),

  // ========== FIGMA / CUSTOM ICON ==========
  Logo: (p: IconRenderProps) => <Logo {...p} />,
  Success: (p: IconRenderProps) => <Success {...p} />,
} as const

export type IconName = keyof typeof ICONS
