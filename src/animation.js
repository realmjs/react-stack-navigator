"use strict"

import { keyframes } from 'styled-components'

export function flyIn(direction) {
  return keyframes`from {${direction}:-300px;opacity:0} to {${direction}:0;opacity:1}`
}

export default {
  flyIn
}
