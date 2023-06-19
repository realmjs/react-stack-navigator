"use strict"

import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'

import animate, { extractAnimation } from '../animation'

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  animation: ${props => animate[props.animation]({ direction: props.direction})}  ${props => props.duration};
  ${props => props.direction}: 0;
`

export default function ToastProvider(props) {

  useEffect(() => {
    props.toast.bindHandler({ addToast, removeToast })
    return () => props.toast.unbindHandler()
  }, [])

  const [toast, setToast] = useState(null)

  const direction = toast && toast.bottom ? 'bottom' : 'top'

  const [animation, duration] = toast && extractAnimation(toast.animation) || []

  return  toast !== null?
    <Container
      direction = {direction}
      animation = {animation}
      duration = {duration}
    >
      {toast.render()}
    </Container>
  :
    null

  function addToast(toast) {
    setToast(toast)
  }

  function removeToast() {
    setToast(null)
  }

}