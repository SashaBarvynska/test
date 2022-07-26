import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export interface ImageButtonProps {
  src?: string
  onClick?: VoidFunction
  linkTo?: string
  height?: string
}

export const ImageButton: FC<ImageButtonProps> = ({
  src,
  onClick,
  linkTo,
  height = '3em'
}) => (
  <>
    {linkTo ? (
      <Link to={linkTo}>
        <Image src={src} height={height} />
      </Link>
    ) : (
      <Image
        src={src}
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

const Image = styled.img`
  height: ${(props) => props.height};
  border: 0.1em solid var(--primary);
  border-radius: 0.5em;
  margin-right: 1.5em;
`
