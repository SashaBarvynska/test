import React, { FC, Key, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

import { TabProps } from './Tab'

interface TabsProps {
  children: ReactElement<TabProps>[]
}

export const TabsGroup: FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ReactElement<TabProps>>()

  const tabsContent = new Map(children.map((child) => [child.key, child]))

  useEffect(() => {
    setActiveTab(tabsContent.get(children[0].key))
  }, [children])

  const onClick = (key: Key | null) => {
    if (key) {
      setActiveTab(tabsContent.get(key))
    }
  }

  return (
    <Container>
      <Tabs>
        {children.map((tab) => (
          <Tab
            key={tab.key}
            active={tab.key === activeTab?.key}
            onClick={() => onClick(tab.key)}
          >
            {tab.props.title}
          </Tab>
        ))}
      </Tabs>
      {activeTab}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Tabs = styled.div`
  display: flex;
  font-family: cursive;
`

const Tab = styled.div<{ active: boolean }>`
  padding: 0.5em 1em;
  margin-left: 0.1em;
  background: aliceblue;
  border-left: 0.1em solid var(--primary); 
  border-top: 0.1em solid var(--primary);
  border-right: 0.1em solid var(--primary);
  border-top-left-radius: 0.4em;
  border-top-right-radius: 0.4em;
  cursor: pointer;
  background: ${({ active }) => (active ? 'var(--hover)' : 'aliceblue')}}
  color: ${({ active }) => (active ? 'white' : 'black')}}
`
