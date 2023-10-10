import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import QRCodeScan from '../../Components/organisms/QRCode/QRCode'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

const QRcodeScreen = () => {
  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000)
  }, [])

  return (
    <div>
      {loading ? <LoadingScreen /> :
        <QRCodeScan />
      }

    </div>
  )
}

export default QRcodeScreen