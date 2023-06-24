"use strict"

import React, { useState, useRef, useEffect } from 'react'

import { StackContext } from './StackContext'

import { styled } from 'styled-components'
import animate, { extractAnimation } from '@realmjs/animation-utils'

const Animation = styled.div`
  position: relative;
  animation: ${props => animate[props.$animation](props.$options)}  ${props => props.$duration};
`
Animation.passProps = false

import { env, url } from './utils'

/* here the translate of route index to literal */
const OPTIONS = 2

export default function StackNavigator({ routeStack, fallback }) {
  const propsRef = useRef(extractPropsfromInitialURL())
  const [activeIndex, setActiveIndex] = useState(findInitActiveIndex())

  const animationRef = useRef({ animation: 'stub', duration: 0 })
  useEffect(() => { animationRef.current = { animation: 'stub', duration: 0 } }, [activeIndex])

  useEffect(() => {
    if (env.isWeb()) {
      const route = (activeIndex === -1) ? fallback : routeStack[activeIndex]
      if ( route[OPTIONS] && route[OPTIONS].title && document) {
        document.title = route[OPTIONS].title
      }
      if ( route[OPTIONS] && route[OPTIONS].path) {
        const path = url.constructLocationPath(route[OPTIONS].path, propsRef.current)
        url.path.replace(path)
      }
    }
  }, [activeIndex])

  const historyRef = useRef([activeIndex])

  const nav = { next, previous, move, back }

  if (activeIndex === -1) return fallback && renderFallback() || renderFirstStack()

  return (
    <div>
    {
      routeStack.map(
        ([id, renderFn], index) => renderRoute(makeUniqueRouteId(id, index), renderFn, activeIndex === index)
      )
    }
    </div>
  )

  function renderRoute(id, renderFn, shouldRender) {
    return (
      <StackContext.Provider key = {id} value = {{ ...nav, animate }}>
        {
          shouldRender?
            <Animation
              $animation = {animationRef.current.animation}
              $duration = {animationRef.current.duration}
              $options = {animationRef.current.options}
            >
              {renderFn(propsRef.current)}
            </Animation>
          : null
        }
      </StackContext.Provider >
    )
  }

  function findInitActiveIndex() {
    const matchedIndex = env.isWeb() && routeStack.findIndex(isMatchWithURL) || 0
    return (matchedIndex === -1 && !fallback)? 0 : matchedIndex
  }

  function isMatchWithURL(route) {
    return  route[OPTIONS] &&
            route[OPTIONS].path &&
            url.match(route[OPTIONS].path).isMatched

  }

  function renderFirstStack() {
    const [id, renderFn] = routeStack[0]
    const routeId = makeUniqueRouteId(id, 0)
    return renderRoute(routeId, renderFn, true)
  }

  function renderFallback() {
    const [id, renderFn] = fallback
    const routeId = makeUniqueRouteId(id, -1) // fallback index is considered as -1
    return renderRoute(routeId, renderFn, true)
  }

  function makeUniqueRouteId(id, index) {
    return `${id}.${index}`
  }

  function extractPropsfromInitialURL() {
    if (env.isWeb()) {
      const activeIndex = findInitActiveIndex()
      const route = (activeIndex === -1)? fallback : routeStack[activeIndex]
      return route[OPTIONS] && route[OPTIONS].path && url.match(route[OPTIONS].path).params || {}
    } else {
      return {}
    }
  }

  function next(props) {
    move(activeIndex + 1, props)
  }

  function previous(props) {
    move(activeIndex - 1, props)
  }

  function move(id, props) {
    const index = (typeof id === 'number') ? id : findStackIndexFromId(id)
    if (index > -1 && index < routeStack.length) {
      addPropsToPropsRef(props)
      setActiveIndex(index)
      historyRef.current.push(index)
    } else {
      throw new Error(`Cannot find route ${id}`)
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
    return routeStack.findIndex(route => route[0] === id)
  }

  function addPropsToPropsRef(props) {
    for (let key in props) {
      propsRef.current[key] = props[key]
    }
  }

  function animate(animation, options) {
    const [type, duration] = extractAnimation(animation)
    animationRef.current = { animation: type, duration, options }
    return nav
  }

}
