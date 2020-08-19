import React, { useState } from 'react'
import { Button } from 'antd'
import style from './style.module.scss'

const General16 = ({ isFavourite, isNew, image, name, price, onBuy, vouchedId, currency }) => {
  const [favourite, setFavourite] = useState(isFavourite)

  const setIsFavourite = e => {
    e.preventDefault()
    setFavourite(!favourite)
  }

  return (
    <div className="card overflow-hidden">
      <div hidden={!isNew} className={style.new}>
        New
      </div>
      <div className="card-body">
        <a
          role="menuitem"
          className={`${style.favourite} ${favourite ? 'text-dark' : 'text-gray-3'}`}
          onClick={setIsFavourite}
          onKeyPress={setIsFavourite}
          tabIndex="0"
        >
          <i className="fe fe-heart font-size-21" />
        </a>
        <div className={`${style.image} border-bottom height-250 mb-3`}>
          <img className="img-fluid" src={image} alt={name} />
        </div>
        <div className="font-size-24 font-weight-bold text-dark mb-2">
          {price} {currency}
          {/* <del hidden={!oldPrice} className="align-text-top font-size-14">
            {oldPrice}
          </del> */}
        </div>
        <div>
          <span className="text-blue font-size-18">{name}</span>
        </div>
        <Button type="dashed" danger onClick={() => onBuy(vouchedId)}>
          Buy
        </Button>
      </div>
    </div>
  )
}

export default General16
