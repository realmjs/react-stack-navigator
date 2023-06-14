"use strict"

import { useRef } from 'react'

import PopupHandler from './PopupHandler'

export default function usePopupHandler() {
  const popup = useRef(new PopupHandler())
  return popup.current
}
