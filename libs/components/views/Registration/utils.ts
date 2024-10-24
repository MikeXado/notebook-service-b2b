export const generateCode = (chars: string, charsCount: number): string => {
  const captcha: string[] = []
  for (let i = 0; i < charsCount; i += 1) {
    const index = Math.floor(Math.random() * chars.length)
    if (chars[index] && captcha.indexOf(chars[index]) === -1)
      captcha.push(chars[index])
    else i -= 1
  }
  return captcha.join('')
}

interface GenerateCanvasOptions {
  backgroundColor: string
  font?: string | null
  fontColor: string
  fontFamily: string
  fontSize: number
  fontStyle: string
  height: number
  width: number
}

export const generateCanvas = (
  ctx: CanvasRenderingContext2D,
  code: string,
  {
    backgroundColor,
    font,
    fontColor,
    fontFamily,
    fontSize,
    fontStyle,
    height,
    width
  }: GenerateCanvasOptions
): void => {
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)
  ctx.font = font || `${fontStyle} ${fontSize}px ${fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = fontColor
  ctx.fillText(code.split('').join(' '), width / 2, height / 2)
}
