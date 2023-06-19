"use strict"

import React from "react"
import { styled } from 'styled-components'

import animate from '../animation'

const Container = styled.div`
  animation: ${props => animate[props.animation]()}  ${props => props.duration};
`

export default function Overlay({ opacity, children }) {
  return (
    <div
      style = {{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        zIndex: '999',
        background: `rgba(0, 0, 0, ${opacity})`
      }}
    >
      <Container
        animation = 'flyIn'
        duration = '0.2s'
      >
        {children}
      </Container>
    </div>
  )
}
