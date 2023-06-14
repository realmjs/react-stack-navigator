"use strict"

import React, { useEffect, useState } from 'react'

export default function PopupProvider(props) {

  useEffect(() => {
    const { handler, popups } = props
    handler.createPopup(popups, { addPopup, removePopup })
  }, [])

  const [popups, setPopups] = useState([])

  return (
    <div>
      <div style = {{ display: popups.length > 0? 'block' : 'none' }}>
      {
        popups.map((popup, index) => (
          <div key = {index}>
            { popup.render() }
          </div>
        ))
      }
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )

  function addPopup(popup) {
    setPopups([...popups, popup])
  }

  function removePopup(popup) {
    setPopups(popups.filter(p => p === popup))
  }

}