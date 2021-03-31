import React from 'react';
import './WhyComponent.css';
import CardItem from '../../assets/Card Item/CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 className='cards__header'>Why Us!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Drive as much as you want with unlimited kms. Just like your own car!'
              label='No Limits'
              path='/services'
              daos='fade-right'
              daosdur='3000ms'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Enjoy complete peace of mind with your liability limited to Rs. 10000. In case of any unfortunate incident, our insurance cover will take care of the rest!'
              label='Limited Liability'
              path='/services'
              daos="zoom-in"
              daosdur="3000ms"
            />
            <CardItem
              src='images/img-2.jpg'
              text='The enhanced cleaning policy requires hosts to clean & disinfect their cars so you can feel good behind the wheel.'
              label='Clean & disinfected cars'
              path='/services'
              daos="fade-left"
              daosdur="3000ms"
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Easy and Transparent Procedure!'
              label='Booking in 2 Minutes'
              path='/services'
              daos='fade-right'
              daosdur='3000ms'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Our tariffs include taxes &amp; insurance. And since our tariffs do NOT include fuel, it means you pay for only as much fuel as you use!'
              label='0 Hidden Charges'
              path='/products'
              daos="zoom-out"
              daosdur="3000ms"
            />
            <CardItem
              src='images/img-8.jpg'
              text='Cancel for free up to 24 hours before your trip starts. Plans can change and it helps to be flexible when they do.'
              label='Flexible cancellations'
              path='/sign-up'
              daos="fade-left"
              daosdur="3000ms"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cards);
