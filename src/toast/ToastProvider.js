"use strict"

import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'

import animate from '../animation'

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  animation: ${props => animate[props.animation](props.direction)}  ${props => props.duration};
  ${props => props.direction}: 0;
`

export default function ToastProvider(props) {

  useEffect(() => {
    props.toast.bindHandler({ addToast, removeToast })
    return () => props.toast.unbindHandler()
  }, [])

  const [toast, setToast] = useState(null)

  const direction = toast && toast.bottom ? 'bottom' : 'top'
  let [animation, duration] = toast && toast.animation.trim().split(' ').map(x => x.trim()) || []

  if (toast) {
    if (animate[animation] === undefined) {
      console.warn(`Unsupported animation ${animation}`)
      animation = 'stub'
    }
    if (duration === undefined) {
      duration = animate[animation].defaultDuration
    }
  }

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