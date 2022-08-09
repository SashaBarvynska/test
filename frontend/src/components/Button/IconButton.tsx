import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi'
import * as MdIcons from 'react-icons/md'
import * as GoIcons from 'react-icons/go'

const Icons = { ...AiIcons, ...FiIcons, ...MdIcons, ...GoIcons }

export interface IconButtonProps {
  icon?: keyof typeof Icons
  onClick?: VoidFunction
  size?: string | number
  linkTo?: string
  color?: 'primary' | 'black'
}

export const IconButton: FC<IconButtonProps> = ({
  icon = 'MdInsertEmoticon',
  onClick,
  linkTo,
  color = 'black',
  size = '1.7em'
}) => {
  const Icon = Icons[icon]
  const style = { cursor: 'pointer', color: `var(--${color})` }

  return (
    <>
      {linkTo ? (
        <Link to={linkTo}>
          <Icon size={size} style={style} />
        </Link>
      ) : (
        <Icon
          size={size}
          style={style}
          onClick={(event) => {
            if (onClick) {
              event.preventDefault()
              onClick()
            }
          }}
        />
      )}
    </>
  )
}
