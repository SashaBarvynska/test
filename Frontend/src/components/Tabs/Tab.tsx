import React, { FC, ReactElement } from 'react'

export interface TabProps {
  key: string
  title: string
  content: ReactElement
}

export const Tab: FC<TabProps> = ({ content }) => <div>{content}</div>
