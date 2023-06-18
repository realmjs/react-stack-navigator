"use strict"

import Popup from './Popup'

export default class PopupHandler {

  #popups = {}

  createPopup(popups, injectorAction) {
    popups.forEach(
      ([name, Comp]) => this.#popups[name] = new Popup(Comp, injectorAction)
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
