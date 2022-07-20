import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { RecordValue } from '../types/common'

type Shape = 'square' | 'round'
type Color = 'initial' | 'aliceblue' | 'secondary'

interface InfoCardProps<T> {
  data: T
  fields: CardField<T>[]
  className?: string
  title?: string
  button1?: ReactElement
  button2?: ReactElement
  shape?: Shape
}

export interface CardField<T> {
  name: string
  field: keyof T
}

export const InfoCard = <T extends Record<keyof T, RecordValue>>({
  data,
  fields,
  className,
  title,
  button1,
  button2,
  shape = 'square'
}: InfoCardProps<T>) => (
  <Card className={className} shape={shape}>
    {title && <CardTitle>{title}</CardTitle>}
    <CardFields>
      {fields.map(({ name, field }, index) => (
        <Field key={index}>
          <FieldName>{name}:</FieldName>
          <span>{data[field]}</span>
        </Field>
      ))}
    </CardFields>
    {(button1 || button2) && (
      <CardButtons>
        {button1}
        {button2}
      </CardButtons>
    )}
  </Card>
)

const Card = styled.div<{ shape: Shape }>`
  width: 20em;
  padding: 1.5em 2.5em 1.5em 2.5em;
  font-family: cursive;
  border: 0.1em solid var(--primary);
  border-radius: ${({ shape }) => (shape === 'round' ? '1em' : '0')};
  background: aliceblue;
`

const CardTitle = styled.h2`
  margin-top: 0.5em;
  margin-bottom: 1.5em;
`

const CardFields = styled.div`
  margin-top: 2em;
  margin-bottom: 3em;
`

const Field = styled.div`
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
  border-bottom: groove;
`

const FieldName = styled.span`
  width: 45%;
  font-weight: bold;
`

const CardButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
