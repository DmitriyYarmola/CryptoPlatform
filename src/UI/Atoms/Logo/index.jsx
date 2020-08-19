import React from 'react'
import style from './style.module.scss'
import img from '../../Img/logo.svg'
import './style.sass'

export const Logo = ({ logo }) => {
  return (
    <div className={style.logoContainer}>
      <div className={style.logo}>
        <img src={img} className="mr-2 logo-size" alt="CryptoPlatform" />
        <div className="platform-name">{logo}</div>
      </div>
    </div>
  )
}
