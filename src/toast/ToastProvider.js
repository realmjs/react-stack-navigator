"use strict"

import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'

import { flyIn } from '../animation'

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  animation: ${props => flyIn(props.direction,)}  0.4s;
  ${props => props.direction}: 0;
`

export default function ToastProvider(props) {

  useEffect(() => {
    props.toast.bindHandler({ addToast, removeToast })
    return () => props.toast.unbindHandler()
  }, [])

  const [toast, setToast] = useState(null)

  const direction = toast && toast.bottom ? 'bottom' : 'top'

  return  toast !== null?
    <Container direction = {direction}>{toast.render()}</Container>
  :
    null

  function addToast(toast) {
    setToast(toast)
  }

  function removeToast() {
    setToast(null)
  }

}