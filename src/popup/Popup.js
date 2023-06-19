"use strict"

import React from 'react'

import PopupOverlay from './PopupOverlay'

import { styled } from 'styled-components'

import animate, { extractAnimation } from '../animation'

const Animation = styled.div`
  position: relative;
  animation: ${props => animate[props.animation](props.options)}  ${props => props.duration};
`

export default class Popup {

  constructor(Component, injectedHandler) {
    this.Component = Component
    this.injectedHandler = injectedHandler
  }

  #animation = { type: 'stub', duration: 0 }
  animate(animation, options) {
    const [type, duration] = extractAnimation(animation)
    this.#animation = { type, duration, options }
    return this
  }

  #props = {}
  props() {
    this.#props = props
    return this
  }

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
            <Animation
              animation = {this.#animation.type}
              duration = {this.#animation.duration}
              options = {this.#animation.options}
            >
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
            </Animation>
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
        this.#animation = { type: 'stub', duration: 0 }
        this.#overlay = { opacity: 0.5 }
        this.#props = {}
        this.injectedHandler.removePopup(this.#popup)
      }
    }
  }

}
