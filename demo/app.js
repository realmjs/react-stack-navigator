"use strict"

import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import StackNavigator, { useStack } from '../src'

const Popup = ({ resolve, timeout }) => {
  const [count, setCount] = useState(timeout)
  useEffect(() => {
    let t = null
    if (timeout) {
      t = setInterval(() => count > 0 && setCount(count => count - 1), 1000)
    }
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ marginTop: '64px', textAlign: 'center' }}>
      <div className='w3-container w3-white w3-round' style = {{ width: '460px', margin: 'auto'}}>
        <h2 className='w3-text-red'>POPUP</h2>
        {
          timeout?
            <p className='w3-text-red w3-xxlarge'>{count}</p>
          :
            <p>
              <button className='w3-button w3-blue' onClick={() => resolve('Close')}>Close</button>
            </p>
        }
      </div>
    </div>
  )
}

const YourName = () => {
  const stack = useStack()
  const [name, setName] = useState('Awesome')
  const popup = stack.usePopup(Popup)
  return (
    <div>
      <div className='w3-bar w3-black'>
        <button className='w3-bar-item w3-button' onClick = {showPopup}>Popup</button>
        <button className='w3-bar-item w3-button' onClick = {timeoutPopup}>TimeoutPopup</button>
      </div>
      <p>
        Your name
        <input
          type = 'text'
          className = 'w3-input'
          value = {name}
          onChange = {e => setName(e.target.value)}
        />
      </p>
      <p>
        <button className='w3-button w3-blue w3-round' onClick = {() => stack.next({name})}>Next</button>
        {' '}
        <button className='w3-button w3-yellow w3-round' onClick = {nextAfter2s}>Next After 2s</button>
      </p>
    </div>
  )
  function showPopup() {
    popup
    .overlay({ opacity: '0.3' })
    .show({name})
    .then((value) => console.log(`Popup resolve: ${value}`))
  }
  function timeoutPopup() {
    popup
    .overlay({ opacity: '0.8' })
    .show({ timeout: 2 })
    .then((value) => console.log(`Popup resolve: ${value}`))

    setTimeout(() => popup.resolve('timeout'), 2000)
  }
  function nextAfter2s() {
    setTimeout(() => {
      popup.resolve('page closed')
      stack.next({name})
    }, 2000)
  }
}

const Welcome = ({ name }) => {
  return (
    <div>
      <h3>Welcome <span className='w3-text-blue'>{name}</span></h3>
    </div>
  )
}

const Demo = () => {

  return (
    <div className='w3-container'>
      <h1>Stack Navigator</h1>
      <StackNavigator
        stacks = {[
          ['yourname', () => <YourName />],
          ['welcome', (props) => <Welcome {...props} />],
        ]}
      />

    </div>
  )

}

const root = createRoot(document.getElementById('root'))
root.render(<Demo />)