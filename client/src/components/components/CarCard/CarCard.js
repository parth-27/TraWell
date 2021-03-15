import React from 'react';
import { Link } from 'react-router-dom';

function CarCard(props) {
  return (
    <>
      <li className='cards__item'>
        <div className="cards__item__rap" data-aos={props.daos} data-aos-duration={props.daosdur}>
          <Link className='cards__item__link' to={props.path}>
            <figure className='cards__item__pic-wrap' data-category={props.label}>
              <img
                className='cards__item__img'
                alt='Image'
                src={props.src}
              />
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
          </Link>
        </div>
      </li>
    </>
  );
}

export default CarCard;