import React, { useEffect, useState } from 'react';
import EditHome from '../../Components/organisms/EditHome/EditHome';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const EditHomeScreen = () => {
  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000)
  }, [])
  return (
    <div>
      {
        loading ? <LoadingScreen /> : <EditHome />
      }

    </div>
  )
}

export default EditHomeScreen