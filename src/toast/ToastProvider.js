"use strict"

import React, { useState, useEffect } from 'react'

export default function ToastProvider(props) {

  useEffect(() => {
    props.toast.bindHandler({ addToast, removeToast })
    return () => props.toast.unbindHandler()
  }, [])

  const [toast, setToast] = useState(null)

  const pos = toast && toast.bottom ? 'bottom' : 'top'

  return  toast !== null?
    (
      <div style = {{
        position: 'fixed',
        [pos]: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
      }}>
        {toast.render()}
      </div>
    )
  :
    null

  function addToast(toast) {
    setToast(toast)
  }

  function removeToast() {
    setToast(null)
  }

}