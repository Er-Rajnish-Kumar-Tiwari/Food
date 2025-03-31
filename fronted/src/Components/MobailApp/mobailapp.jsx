import React from 'react'
import './mobailapp.css'
import { assets } from '../../assets/frontend_assets/assets'

const MobailApp = () => {
  return (

    <div className='mobail-app' id='mobaile-app'>
        <p>For Better Experience Download <br/> Tanish App</p>

        <div className="app-install-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>

    </div>
  )
}

export default MobailApp