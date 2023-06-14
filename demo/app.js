"use strict"

import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import StackNavigator, { useStack } from '../src'

const GetNamePopup = (props) => {
  const [name, setName] = useState(props.name)
  return (
    <div style={{ marginTop: '64px', textAlign: 'center' }}>
      <div className='w3-container w3-white w3-round' style = {{ width: '460px', margin: 'auto'}}>
        <h2 className='w3-text-red'>Enter Your Name</h2>
        <p>
          <input
            type = 'text'
            className = 'w3-input'
            value = {name}
            onChange = {e => setName(e.target.value)}
          />
        </p>
        <p>
          <button className='w3-button w3-blue w3-round' onClick={() => props.resolve(name)}>Confirm</button>
          {' '}
          <button className='w3-button w3-round' onClick={() => props.reject()}>Close</button>
        </p>
      </div>
    </div>
  )
}

const TimeoutPopup = (props) => {
  const [count, setCount] = useState(props.timeout)
  useEffect(() => {
    const t = setInterval(() => setCount(cnt => cnt - 1), 1000)
    return () => clearTimeout(t)
  })
  return (
    <div style={{ marginTop: '64px', textAlign: 'center' }}>
      <div className='w3-container w3-white w3-round' style = {{ width: '460px', margin: 'auto'}}>
        <h2 className='w3-text-red'>Timeout</h2>
        <p className='w3-xlarge w3-text-red'>
          {count}
        </p>
      </div>
    </div>
  )
}

import Popup from '../src/popup'

const YourName = () => {
  const stack = useStack()
  const [name, setName] = useState('Awesome')
  const popup = Popup.useHandler()
  return (
    <Popup.Provider
      popups = {[
        ['name', GetNamePopup],
        ['timeout', TimeoutPopup]
      ]}
      handler = {popup}
    >
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
    </Popup.Provider>
  )
  function showPopup() {
    popup
    .get('name')
    .overlay({ opacity: '0.3' })
    .show({name})
    .then((value) => console.log(`Popup resolve: ${value}`))
    .catch((err) => console.log(`Popup reject: ${err}`))
  }
  function timeoutPopup() {
    popup
    .get('timeout')
    .overlay({ opacity: '0.8' })
    .show({ timeout: 2 })
    .then((value) => console.log(`Popup resolve: ${value}`))

    setTimeout(() => popup.get('timeout').resolve('timeout'), 2000)
  }
  function nextAfter2s() {
    setTimeout(() => {
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