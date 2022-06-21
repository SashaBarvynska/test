import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'

interface ListProps {
  children: ReactElement[]
  className?: string
}

interface ListItemProps {
  children: string | ReactElement | ReactElement[]
  className?: string
}

const List: FC<ListProps> = ({ className, children }) => (
  <StyledList className={className}>{children}</StyledList>
)

const ListItem: FC<ListItemProps> = ({ className, children }) => (
  <StyledListItem className={className}>{children}</StyledListItem>
)

const StyledList = styled.ul`
  background: white;
  list-style-type: none;
  max-width: 30em;
  padding: 2.5em;
  font-family: cursive;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0.5em 0.01em;
`

const StyledListItem = styled.li`
  margin-bottom: 2.7em;
`

export { List, ListItem }
