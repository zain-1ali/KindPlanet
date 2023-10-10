import React, { useEffect, useState } from 'react'
import ActivateSapid from '../../Components/organisms/ActivateSapid/ActivateSapid'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

const ActivateSapidScreen = () => {
  const [profileurl, setprofileurl] = useState('')


  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000)
  }, [])

  return (
    <div>
      {loading ? <LoadingScreen /> : <ActivateSapid />

      }

    </div>
  )
}

export default ActivateSapidScreen