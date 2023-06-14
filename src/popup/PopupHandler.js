"use strict"

import Popup from './Popup'

export default class PopupHandler {

  #popups = {}

  createPopup(popups, injectorAction) {
    popups.forEach(
      ([name, Comp]) => this.#popups[name] = new Popup(Comp, injectorAction)
    )
  }

  get(name) {
    return this.#popups[name]
  }

}
