"use strict"

import Popup from './Popup'

export default class PopupHandler {

  #popups = {}

  createPopup(popups, injectedHandler) {
    popups.forEach(
      ([name, Comp]) => this.#popups[name] = new Popup(Comp, injectedHandler)
    )
  }

  clearPopup() {
    this.#popups = {}
  }

  get(name) {
    if (!this.#popups[name]) {
      console.warn(`Popup ${name} is not available anymore`)
    }
    return this.#popups[name]
  }

}
