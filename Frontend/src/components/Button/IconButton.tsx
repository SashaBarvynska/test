import React, { FC } from 'react'
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi'
import * as MdIcons from 'react-icons/md'
import * as GoIcons from 'react-icons/go'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Icons = { ...AiIcons, ...FiIcons, ...MdIcons, ...GoIcons }

export interface IconButtonProps {
  icon?: keyof typeof Icons
  onClick?: VoidFunction
  size?: string | number
  linkTo?: string
  color?: 'primary'
}

export const IconButton: FC<IconButtonProps> = ({
  icon = 'MdInsertEmoticon',
  onClick,
  linkTo,
  color,
  size = '1.7em'
}) => {
  const Icon = Icons[icon]

  const StyledIcon = styled(Icon)`
    cursor: pointer;
    vertical-align: -webkit-baseline-middle;
    color: ${color ? `var(--${color})` : 'black'};
  `

  return (
    <>
      {linkTo ? (
        <Link to={linkTo}>
          <StyledIcon size={size} />
        </Link>
      ) : (
        <StyledIcon
          size={size}
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
