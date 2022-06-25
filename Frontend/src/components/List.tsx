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
  border: 1px solid var(--primary);
  list-style-type: none;
  max-width: 30em;
  padding: 2.5em;
  font-family: cursive;
  border-radius: 0.3em;
`

const StyledListItem = styled.li`
  margin-bottom: 2.7em;
`

export { List, ListItem }
