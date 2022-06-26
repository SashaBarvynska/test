import React from 'react'
import styled from 'styled-components'

interface TableProps<T> {
  records: T[]
  columns: Column[]
}

interface Column {
  header: string
  field: string
}

const Table = <T extends Record<string, any>>({
  records,
  columns
}: TableProps<T>) => {
  return (
    <StyledTable>
      <tbody>
        <StyledHeaderRow>
          {columns.map((column, index) => (
            <StyledHeader key={index}>{column.header}</StyledHeader>
          ))}
        </StyledHeaderRow>
        {records.map((record, index) => (
          <StyledDataRow key={index}>
            {columns.map((column, index) => (
              <StyledDataCell key={index}>
                {record[column.field]}
              </StyledDataCell>
            ))}
          </StyledDataRow>
        ))}
      </tbody>
    </StyledTable>
  )
}

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-bottom: 2px solid var(--primary);
`

const StyledHeaderRow = styled.tr`
  background: var(--primary);
  color: #fbeef4;
  text-transform: uppercase;
  font-family: cursive;
`

const StyledHeader = styled.th`
  height: 3.5em;
  padding-left: 1.5em;
  text-align: start;
`

const StyledDataRow = styled.tr`
  height: 2.4em;
  font-family: cursive;

  :nth-child(even) {
    background: #ede1e6;
  }
`

const StyledDataCell = styled.td`
  padding-left: 1.5em;
`

export { Table }
