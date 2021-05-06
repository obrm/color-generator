import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import Values from 'values.js'

import SingleColor from './SingleColor'

function App() {
  const [color, setColor] = useState('#49A6E9')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#49A6E9').all(10))
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisplayColorPicker(false)
    try {
      let colors = new Values(color).all(10)
      setList(colors)
      setError(false)
    } catch (error) {
      setError(true)
      console.error(error)
    }
  }

  return (
    <>
      <h2 className='title'>מחולל גוונים</h2>
      <section className='container'>
        <form onSubmit={handleSubmit}>
          <img
            src='/icon.png'
            alt='colors'
            className='color-picker-img'
            onClick={() => setDisplayColorPicker(true)}
            loading='lazy'
          />
          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder='#33adff'
            className={`${error && `error`}`}
          />
          <button className='btn' type='submit'>
            אישור
          </button>
        </form>
        <small>לחיצה על צבע תעתיק אותו ללוח</small>
        {displayColorPicker && (
          <div className='popover'>
            <div className='cover'>
              <ChromePicker
                color={color}
                onChange={(updatedColor) => {
                  setColor(updatedColor.hex)
                }}
              />
            </div>
          </div>
        )}
      </section>
      <section className='colors'>
        {list.map((color, i) => (
          <SingleColor
            {...color}
            key={color.rgb.join('')}
            index={i}
            hexColor={color.hex}
          />
        ))}
      </section>
    </>
  )
}

export default App
