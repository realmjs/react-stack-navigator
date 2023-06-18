"use strict"

import React from 'react'

import PopupOverlay from './PopupOverlay'

export default class Popup {

  constructor(Component, injectedHandler) {
    this.Component = Component
    this.injectedHandler = injectedHandler
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
      this.injectedHandler.addPopup(this.#popup)
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
        this.injectedHandler.removePopup(this.#popup)
      }
    }
  }

}
