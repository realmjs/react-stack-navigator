"use strict"

import { keyframes } from 'styled-components'

export function stub() {
  return ''
}
stub.defaultDuration = '0'

export function flyIn(direction) {
  return keyframes`from {${direction}:-300px;opacity:0} to {${direction}:0;opacity:1}`
}
flyIn.defaultDuration = '0.4s'

export function fadeIn() {
  return keyframes`from {opacity:0} to {opacity:1}`
}
fadeIn.defaultDuration = '0.8s'

export default {
  stub,
  flyIn,
  fadeIn,
}