"use strict"

import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

import StackNavigator, { useStack } from '../src'

const YourName = () => {
  const stack = useStack()
  const [name, setName] = useState('Awesome')
  return (
    <div>
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
      </p>
    </div>
  )
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