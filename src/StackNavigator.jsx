"use strict"

import React, { useState, useRef, useEffect } from 'react'

import { StackContext } from './StackContext'

export default function StackNavigator({ stacks }) {
  const propsRef = useRef({})
  const [activeIndex, setActiveIndex] = useState(0)

  const animationRef = useRef('')
  useEffect(() => { animationRef.current = '' }, [activeIndex])

  const historyRef = useRef([activeIndex])

  const nav = { next, previous, move, back }
  return (
    <div>
      {
        stacks.map(([id, renderFn], index) => (
          <StackContext.Provider key = {id} value = {{ ...nav, animate }}>
            {
              activeIndex === index?
                <div className = {animationRef.current.length > 0? `w3-animate-${animationRef.current}` : ''} >
                  {renderFn(propsRef.current)}
                </div>
              : null
            }
          </StackContext.Provider >
        ))
      }
    </div>
  )

  function next(props) {
    move(activeIndex + 1, props)
  }

  function previous(props) {
    move(activeIndex - 1, props)
  }

  function move(id, props) {
    const index = (typeof id === 'number') ? id : findStackIndexFromId(id)
    if (index > -1 && index < stacks.length) {
      addPropsToPropsRef(props)
      setActiveIndex(index)
      historyRef.current.push(index)
    } else {
      throw new Error(`Cannot find stack ${id}`)
    }
  }

  function back(props) {
    if (historyRef.current.length > 1 && historyRef.current[historyRef.current.length - 1] === activeIndex) {
      historyRef.current.pop()
      const index = historyRef.current.pop()
      move(index, props)
    }
  }

  function findStackIndexFromId(id) {
    return stacks.findIndex(stack => stack[0] === id)
  }

  function addPropsToPropsRef(props) {
    for (let key in props) {
      propsRef.current[key] = props[key]
    }
  }

  function animate(animation) {
    if (animation)
      animationRef.current = animation
    return nav
  }

}
