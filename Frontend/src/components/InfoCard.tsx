import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md'

interface InfoCardProps<T> {
  fields: T
  rows: Row<T>[]
  title: string
  children?: ReactElement[]
}

export interface Row<T> {
  title: string
  field: keyof T
}

const InfoCard = <T extends Record<string, any>>({
  fields,
  rows,
  title,
  children
}: InfoCardProps<T>) => {
  return (
    <Container>
      <h2>{title}</h2>
      <RowsGroup>
        {rows.map((row, index) => (
          <Row key={index}>
            <RowHeader>{row.title}:</RowHeader>
            <span>{fields[row.field]}</span>
          </Row>
        ))}
      </RowsGroup>
      {children && <ActionContainer>{children}</ActionContainer>}
    </Container>
  )
}

const Container = styled.div`
  width: 40%;
  padding: 1.5em 2.5em 1.5em 2.5em;
  background: var(--secondary);
  font-family: cursive;
  border: 0.4em solid var(--primary);
`

const RowsGroup = styled.div`
  margin-top: 3em;
  margin-bottom: 3em;
`

const Row = styled.div`
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
  border-bottom: groove;
`

const RowHeader = styled.span`
  width: 45%;
  font-weight: bold;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export { InfoCard }
