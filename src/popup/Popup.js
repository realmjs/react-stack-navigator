"use strict"

import React from 'react'

import PopupOverlay from './PopupOverlay'

export default class Popup {

  constructor(Component, injectorAction) {
    this.Component = Component
    this.injectorAction = injectorAction
  }

  #animate = undefined
  animate() {}

  #props = {}
  props() {}

  #overlay = { opacity: 0.5 }
  overlay({ opacity }) {
    this.#overlay = { opacity }
    return this
  }


  #popup = undefined
  show(props) {
    return new Promise((resolve, reject) => {
      this.#props = props
      this.#popup = {
        resolve: resolve,
        reject: reject,
        render: () => (
          <PopupOverlay {...this.#overlay} >
          {
            React.createElement(
              this.Component,
              {
                resolve: this.popupCompletionRoutine('resolve'),
                reject: this.popupCompletionRoutine('reject'),
                ...this.#props
              }
            )
          }
          </PopupOverlay>
        )
      }
      this.injectorAction.addPopup(this.#popup)
    })
  }

  resolve = this.popupCompletionRoutine('resolve')
  reject = this.popupCompletionRoutine('reject')

  popupCompletionRoutine(action) {
    return (value) => {
      if (this.#popup) {
        this.#popup[action](value)
        this.#popup = undefined
        this.#animate = undefined
        this.#overlay = { opacity: 0.5 }
        this.#props = {}
        this.injectorAction.removePopup(this.#popup)
      }
    }
  }

}
