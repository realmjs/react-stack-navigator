"use strict"

import { useContext } from 'react'
import { StackContext } from './StackContext'

export function useStack() {
  return useContext(StackContext)
}
