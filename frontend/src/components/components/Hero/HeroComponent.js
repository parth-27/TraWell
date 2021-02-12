import React from 'react';
import '../../../App.css';
import { Button } from './../../assets/Button';
import './HeroComponent.css';

function HeroComponent() {
  return (
    <div className='hero-container'>
      <video src='/videos/ff.webm' autoPlay loop muted />
      <h1>HIT THE ROAD CONFIDENTLY</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          RENT A CAR
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          LAND YOUR CAR <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroComponent;
