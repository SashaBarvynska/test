import React, { FC } from 'react'
import { Tooltip } from '../Tooltip'
import { IconButton, IconButtonProps } from './IconButton'
import { ImageButton, ImageButtonProps } from './ImageButton'
import { TextButton, TextButtonProps } from './TextButton'

interface ButtonProps extends TextButtonProps, IconButtonProps, ImageButtonProps {
  tooltipText?: string
}

export const Button: FC<ButtonProps> = (props) => {
  const { src, icon, text, tooltipText } = props

  const getButton = () => {
    if (text) {
      return <TextButton {...props} />
    }
    if (icon) {
      return <IconButton {...props} />
    }
    if (src) {
      return <ImageButton {...props} />
    }

    return <button />
  }

  return (
    <>{tooltipText ? <Tooltip text={tooltipText}>{getButton()}</Tooltip> : getButton()}</>
  )
}
