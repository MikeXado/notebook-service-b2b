import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  MouseEvent
} from 'react'
import { generateCanvas, generateCode } from '../utils'

interface ClientCaptchaProps {
  backgroundColor?: string
  captchaClassName?: string
  captchaCode: (code: string) => void
  chars?: string
  charsCount?: number
  containerClassName?: string
  font?: string | null
  fontColor?: string
  fontFamily?: string
  fontSize?: number
  fontStyle?: string
  height?: number
  refreshButton?: boolean
  refreshButtonClassName?: string
  refreshButtonIcon?: string
  refreshButtonIconClassName?: string
  refreshButtonIconSize?: number
  width?: number
}

export interface ClientCaptchaHandle {
  refresh: () => void
}

const ClientCaptcha = forwardRef<ClientCaptchaHandle, ClientCaptchaProps>(
  (
    {
      backgroundColor = '#F2F2F2',
      captchaClassName = '',
      captchaCode,
      chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      charsCount = 4,
      containerClassName = '',
      font = null,
      fontColor = '#000',
      fontFamily = 'Arial, Tahoma',
      fontSize = 22,
      fontStyle = 'normal',
      height = 40,
      refreshButton = false,
      refreshButtonClassName = '',
      refreshButtonIcon = 'https://cdn.jsdelivr.net/npm/react-client-captcha/dist/retry.svg',
      refreshButtonIconClassName = '',
      refreshButtonIconSize = 24,
      width = 100
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const generateCaptcha = () => {
      const code = generateCode(chars, charsCount)
      if (canvasRef.current) {
        generateCanvas(canvasRef.current.getContext('2d')!, code, {
          backgroundColor,
          font,
          fontSize,
          fontFamily,
          fontColor,
          fontStyle,
          height,
          width
        })
      }
      captchaCode(code)
      return code
    }

    const resetCaptcha = (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      generateCaptcha()
    }

    useEffect(() => {
      generateCaptcha()
    }, [])

    useImperativeHandle(ref, () => ({
      refresh: generateCaptcha
    }))

    return (
      <div className={`flex items-center ${containerClassName}`}>
        <canvas
          width={width}
          height={height}
          ref={canvasRef}
          className={`${captchaClassName}`}
          style={{ pointerEvents: 'none' }}
        />
        {refreshButton && (
          <div
            onClick={resetCaptcha}
            data-testid="refreshButton"
            className={`ml-4 cursor-pointer ${refreshButtonClassName}`}
          >
            <img
              src={refreshButtonIcon}
              alt="Re-new captcha"
              className={refreshButtonIconClassName}
              width={refreshButtonIconSize}
              height={refreshButtonIconSize}
            />
          </div>
        )}
      </div>
    )
  }
)

export default ClientCaptcha
