"use strict"

import { useRef } from 'react'

import Popup from './popup.class'

export default function usePopupRoutine({ addPopup, removePopup }) {
  return (Component) => {
    const popup = useRef(new Popup(Component, { addPopup, removePopup }))
    return popup.current
  }
}
