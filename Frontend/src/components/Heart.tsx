import React, { Fragment, FC } from 'react'
import styled from 'styled-components'

interface HeartLineProps {
  first: string
  second: string
  third: string
  fourth: string
  fifth: string
  sixth: string
  seventh: string
}

interface HeartProps {
  className?: string
}

const Heart: FC<HeartProps> = ({ className }) => (
  <HeartContainer className={className}>
    <HeartLine
      first="transparent"
      second="#A92048"
      third="#D41B5E"
      fourth="transparent"
      fifth="#E1155D"
      sixth="#DA2C74"
      seventh="transparent"
    />
    <HeartLine
      first="#DE155C"
      second="#F02278"
      third="#EF2078"
      fourth="#D81A5B"
      fifth="#ED2277"
      sixth="#F0B3D1"
      seventh="#B91947"
    />
    <HeartLine
      first="#D12F72"
      second="#D71A59"
      third="#D6195D"
      fourth="#AE1D43"
      fifth="#D7185E"
      sixth="#D32D75"
      seventh="#AB2047"
    />
    <HeartLine
      first="transparent"
      second="#AA2042"
      third="#EA2075"
      fourth="#DE195D"
      fifth="#EC2174"
      sixth="#D51F5D"
      seventh="transparent"
    />
    <HeartLine
      first="transparent"
      second="transparent"
      third="#D51B5A"
      fourth="#D32E75"
      fifth="#D21B5A"
      sixth="transparent"
      seventh="transparent"
    />
    <HeartLine
      first="transparent"
      second="transparent"
      third="transparent"
      fourth="#EA1974"
      fifth="transparent"
      sixth="transparent"
      seventh="transparent"
    />
  </HeartContainer>
)

const HeartLine: FC<HeartLineProps> = (props) => (
  <HeartLineContainer>
    <HeartFragment color={props.first} />
    <HeartFragment color={props.second} />
    <HeartFragment color={props.third} />
    <HeartFragment color={props.fourth} />
    <HeartFragment color={props.fifth} />
    <HeartFragment color={props.sixth} />
    <HeartFragment color={props.seventh} />
  </HeartLineContainer>
)

const HeartContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const HeartLineContainer = styled.div`
  display: flex;
`

const HeartFragment = styled.div`
  width: 15px;
  height: 15px;
  background: ${({ color }) => color};
  transition: color;

  :hover {
    background: transparent;
    width: 30px;
    height: 30px;
  }
`

export { Heart }
