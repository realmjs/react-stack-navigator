"use strict"

import { useRef } from 'react'

import Toast from './Toast'

export default function useToast() {
  const toast = useRef(new Toast())
  return toast.current
}
