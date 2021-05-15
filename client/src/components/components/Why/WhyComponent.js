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
              src='https://i.pinimg.com/236x/02/8b/d7/028bd71717782755e2f78fd4eb8db69b.jpg'
              text='Drive as much as you want with unlimited kms. Just like your own car!'
              label='No Limits'
              path='/services'
              daos='fade-right'
              daosdur='3000ms'
            />
            <CardItem
              src='https://i.pinimg.com/236x/22/07/15/22071546f7c1a7ba363c93cdcc26bec2.jpg'
              text='Enjoy complete peace of mind with your liability limited to Rs. 10000. In case of any unfortunate incident, our insurance cover will take care of the rest!'
              label='Limited Liability'
              path='/services'
              daos="zoom-in"
              daosdur="3000ms"
            />
            <CardItem
              src='https://i.pinimg.com/236x/f8/5f/a5/f85fa5cc20fa64c426ea21c80c32dfbd.jpg'
              text='The enhanced cleaning policy requires hosts to clean & disinfect their cars so you can feel good behind the wheel.'
              label='Clean & disinfected cars'
              path='/services'
              daos="fade-left"
              daosdur="3000ms"
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://i.pinimg.com/236x/c9/97/85/c9978551f765824a2af3612c3117b853.jpg'
              text='Easy and Transparent Procedure!'
              label='Booking in 2 Minutes'
              path='/services'
              daos='fade-right'
              daosdur='3000ms'
            />
            <CardItem
              src='https://i.pinimg.com/236x/01/15/df/0115df95ec10be0f04a96e63fbbe60f4.jpg'
              text='Our tariffs include taxes &amp; insurance. And since our tariffs do NOT include fuel, it means you pay for only as much fuel as you use!'
              label='0 Hidden Charges'
              path='/products'
              daos="zoom-out"
              daosdur="3000ms"
            />
            <CardItem
              src='https://i.pinimg.com/236x/80/ce/65/80ce6571a2ea74aed68922c99483ecb1.jpg'
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
