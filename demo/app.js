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

const CustomToast = (props) => {
  return (
    <div style={{ marginTop: '6px', textAlign: 'center' }}>
      <div className='w3-container w3-blue w3-round-xxlarge' style = {{ width:'fit-content', margin: 'auto'}}>
        <p>{props.children} <span className='cursor-pointer' style = {{ marginLeft: '6px'}} onClick={onCloseButtonClick}><i className='fas fa-times' /></span></p>
      </div>
    </div>
  )
  function onCloseButtonClick() {
    props.resolve()
  }
}

import Popup from '../src/popup'
import Toast from '../src/toast'

const YourName = () => {
  const stack = useStack()
  const [name, setName] = useState('Awesome')
  const popup = Popup.useHandler()
  const [popupResolveValue, setPopupResolveValue] = useState('')
  const toast = Toast.useToast()
  return (
    <div>
      <Toast.Provider
        toast = {toast}
      />
      <Popup.Provider
        popups = {[
          ['name', GetNamePopup],
          ['timeout', TimeoutPopup]
        ]}
        handler = {popup}
      />
      <div>
        <div className='w3-bar w3-black'>
          <button className='w3-bar-item w3-button' onClick = {showPopup}>GetNamePopup</button>
          <button className='w3-bar-item w3-button' onClick = {timeoutPopup}>TimeoutPopup</button>
          <button className='w3-bar-item w3-button' onClick = {showCustomToast}>CustomToast</button>
          <button className='w3-bar-item w3-button' onClick = {showErrorToast}>ErrorToast</button>
          <button className='w3-bar-item w3-button' onClick = {showInfoToast}>InfoToast</button>
          <button className='w3-bar-item w3-button' onClick = {showSuccessToast}>SuccessToast</button>
        </div>
        <p>
          Popup Resolve Value: {popupResolveValue}
        </p>
        <p>
          <button className='w3-button w3-blue w3-round' onClick = {() => stack.next({name})}>Next</button>
          {' '}
          <button className='w3-button w3-yellow w3-round' onClick = {nextAfter2s}>Next After 2s</button>
        </p>
      </div>
    </div>
  )
  function showPopup() {
    popup
    .get('name')
    .overlay({ opacity: '0.3' })
    .show({name})
    .then((value) => {
      setPopupResolveValue(value)
      setName(value)
    })
    .catch((err) => console.log(`Popup reject: ${err}`))
  }
  function timeoutPopup() {
    popup
    .get('timeout')
    .overlay({ opacity: '0.8' })
    .show({ timeout: 2 })
    .then((value) => setPopupResolveValue(value))

    setTimeout(() => popup.get('timeout').resolve('timeout'), 2000)
  }
  function nextAfter2s() {
    setTimeout(() => {
      stack.next({name})
    }, 2000)
  }
  function showCustomToast() {
    toast.show((resolve, reject) => <CustomToast resolve = {resolve}>Toast message</CustomToast>, { duration: 3000, bottom: true })
  }
  function showErrorToast() {
    toast.error('Error message', { closeButton: true })
  }
  function showInfoToast() {
    toast.info('Info message', { duration: 3000, closeButton: false })
  }
  function showSuccessToast() {
    toast.success('Success message', { duration: 3000, closeButton: false })
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