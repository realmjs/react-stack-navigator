"use strict"

import React from 'react'

export default function createToastComponent(style) {
  return ({ message, closeButton, resolve }) => {
    return (
      <div style={{ marginTop: '6px', textAlign: 'center' }}>
        <div
          style = {{
            padding: '0.5em 16px',
            width:'fit-content',
            margin: 'auto',
            borderRadius: '32px',
            background: style.background,
            color: style.color
          }}
        >
          <div>
            {message}
            {
              closeButton?
                <span
                  style = {{ marginLeft: '6px', cursor: 'pointer'}}
                  onClick={onCloseButtonClick}
                >
                  <i className='fas fa-times' />
                </span>
              : null
            }

          </div>
        </div>
      </div>
    )
    function onCloseButtonClick() {
      resolve()
    }
  }
}
