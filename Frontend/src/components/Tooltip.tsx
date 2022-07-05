import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'

interface TooltipProps {
  text: string
  children: ReactElement
}

const Tooltip: FC<TooltipProps> = ({ text, children }) => (
  <Wrapper>
    <div className="tooltip">{text}</div>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  position: relative;
  div.tooltip {
    display: none;
  }

  :hover div.tooltip {
    display: inline;
    position: absolute;
    top: -2.7em;
    z-index: 1;
    border: 0.1em solid black;
    border-radius: 0.5em;
    font-family: cursive;
    padding: 0.25em;
    width: max-content;
    background: var(--hover);
  }
`

export { Tooltip }
