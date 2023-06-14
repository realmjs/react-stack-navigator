"use strict"

import React from "react"

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
      {children}
    </div>
  )
}
