import type { WaveShape } from '~/types/base'

const round = (value: number) => Math.round(value * 10) / 10

export const createWavePaths = ({ width, height, lines, spread }: WaveShape) =>
  Array.from({ length: lines }, (_, index) => {
    const offset = index * spread
    const y = round(height * 0.4 + offset)
    const control1 = round(y - height * 0.233 - offset * 0.3)
    const control2 = round(y + height * 0.21 + offset * 0.27)
    const smooth = round(y - height * 0.187 - offset * 0.24)
    const end = round(y + height * 0.047 + offset * 0.06)
    return `M-40 ${y} C ${0.22 * width} ${control1}, ${0.42 * width} ${control2}, ${0.6 * width} ${y} S ${0.92 * width} ${smooth}, ${width + 40} ${end}`
  })
