import { ICONS, IconName } from './IconMap'

interface IconProps {
  name: IconName
  size?: number
  color?: string
}

export function Icon({
  name,
  size = 24,
  color = '#000',
}: IconProps) {
  const RenderIcon = ICONS[name]
  return <RenderIcon size={size} color={color} />
}
