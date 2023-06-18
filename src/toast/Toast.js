"use strict"

import React from 'react'
import createToastComponent from "./Toast.factory"

const ErrorToast = createToastComponent({ background: '#f44336', color: '#fff' })
const InfoToast = createToastComponent({ background: '#2196F3', color: '#fff' })
const SuccessToast = createToastComponent({ background: '#4caf50', color: '#fff' })

export default class Toast {

  #toast = null
  #injectedHandler = undefined
  #timeout = undefined
  #toastQueue = []

  bindHandler(handler) {
    this.#injectedHandler = handler
  }

  unbindHandler() {
    this.#injectedHandler = undefined
  }

  show(render, options) {
    return new Promise((resolve, reject) => {
      if (this.#toastQueue.length > 0 || this.#toast) {
        this.#toastQueue.push([render, options, resolve, reject])
      } else {
        this.#createToastToScreen(render, options, resolve, reject)
      }
    })
  }

  #createToastToScreen(render, options, resolve, reject) {
    if (this.#injectedHandler === undefined) {
      reject('Toast is not binded to any ToastProvider')
      return
    }
    this.#toast = {
      render: () => render(this.resolve, this.reject),
      resolve: resolve,
      reject: reject,
      bottom: options && options.bottom || false,
    }
    this.#injectedHandler.addToast(this.#toast)
    if (options && options.duration && typeof options.duration === 'number') {
      this.#timeout = setTimeout(this.resolve, options.duration)
    }
  }

  resolve = this.toastCompletionRountine('resolve')
  reject = this.toastCompletionRountine('reject')

  toastCompletionRountine(action) {
    return (value) => {
      if (this.#toast) {
        this.#toast[action](value)
        this.#toast = null
        this.#injectedHandler && this.#injectedHandler.removeToast()
      }
      if (this.#timeout !== undefined) {
        clearTimeout(this.#timeout)
        this.#timeout = undefined
      }
      if (this.#toastQueue.length > 0) {
        const [render, options, resolve, reject] = this.#toastQueue.shift()
        this.#createToastToScreen(render, options, resolve, reject)
      }
    }
  }

  error(message, options) {
    return this.show(
      (resolve) =>  <ErrorToast
                      message = {message}
                      resolve = {resolve}
                      closeButton={options && options.closeButton || false}
                    />,
      options
    )
  }

  info(message, options) {
    return this.show(
      (resolve) =>  <InfoToast
                      message = {message}
                      resolve = {resolve}
                      closeButton={options && options.closeButton || false}
                    />,
      options
    )
  }

  success(message, options) {
    return this.show(
      (resolve) =>  <SuccessToast
                      message = {message}
                      resolve = {resolve}
                      closeButton={options && options.closeButton || false}
                    />,
      options
    )
  }

}