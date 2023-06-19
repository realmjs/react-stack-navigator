"use strict"

import { keyframes } from 'styled-components'

const animate = {
  stub,
  flyIn,
  fadeIn,
  zoomIn,
}

export function extractAnimation(animation) {
  let [type, duration] = animation.trim().split(' ').map(x => x.trim())
  if (animate[type] === undefined) {
    console.warn(`Unsupported animation ${type}`)
    type = 'stub'
  } else if (duration === undefined) {
    duration = animate[type].defaultDuration
  }
  return [type, duration]
}

export function stub() {
  return ''
}
stub.defaultDuration = '0'

export function flyIn(options) {
  const direction = options && options.direction || 'left'
  return keyframes`from {${direction}:-300px;opacity:0} to {${direction}:0;opacity:1}`
}
flyIn.defaultDuration = '0.4s'

export function fadeIn() {
  return keyframes`from {opacity:0} to {opacity:1}`
}
fadeIn.defaultDuration = '0.8s'

export function zoomIn() {
  return keyframes`from {transform:scale(0)} to {transform:scale(1)}`
}
zoomIn.defaultDuration = '0.6s'

export default animate
