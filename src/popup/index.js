"use strict"

import PopupProvider from './PopupProvider'
import PopupHandler from './PopupHandler'
import usePopupHandler from './usePopupHandler.hook'

export default {
  Provider: PopupProvider,
  createHandler: () => new PopupHandler(),
  useHandler: usePopupHandler,
}
