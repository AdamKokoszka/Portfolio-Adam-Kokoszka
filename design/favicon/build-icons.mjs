// Renders the raster favicon set from public/favicon.svg.
// Run with `node design/favicon/build-icons.mjs` after changing the SVG.
import { readFileSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

const SOURCE = readFileSync('public/favicon.svg')
const TILE_COLOR = '#1e252d'

const renderPng = (size, { fullBleed = false } = {}) => {
  const image = sharp(SOURCE, { density: (size / 64) * 72 * 2 }).resize(size, size)
  return (fullBleed ? image.flatten({ background: TILE_COLOR }) : image).png().toBuffer()
}

const toIco = (pngs) => {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + pngs.length * 16
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size % 256, 0)
    entry.writeUInt8(size % 256, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)])
}

const icoSizes = [16, 32, 48]
const icoPngs = await Promise.all(icoSizes.map(async (size) => ({ size, data: await renderPng(size) })))

writeFileSync('public/favicon.ico', toIco(icoPngs))
writeFileSync('public/apple-touch-icon.png', await renderPng(180, { fullBleed: true }))
writeFileSync('public/icon-192.png', await renderPng(192))
writeFileSync('public/icon-512.png', await renderPng(512))
