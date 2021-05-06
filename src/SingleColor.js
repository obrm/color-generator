import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false)
  const bcg = rgb.join(',')
  const hex = hexColor ? `#${hexColor}` : rgbToHex(...rgb)

  useEffect(() => {
    const timeout = setTimeout(() => setAlert(false), 1500)
    return () => clearTimeout(timeout)
  }, [alert])

  return (
    <article
      className={`color ${index > 10 && `color-light`}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true)
        navigator.clipboard.writeText(hex)
      }}
    >
      <p className='percent-value' dir='ltr'>
        {weight}%
      </p>
      <p className='color-value' dir='ltr'>
        {hex}
      </p>
      {alert && (
        <p className='alert' dir='ltr'>
          הועתק ללוח
        </p>
      )}
    </article>
  )
}

export default SingleColor
