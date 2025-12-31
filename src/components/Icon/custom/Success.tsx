import { IconRenderProps } from '../IconMap'

export default function Logo({
  size = 24,
  color = 'currentColor',
}: IconRenderProps) {
  return (
    <svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      ...
    </svg>
  )
}
