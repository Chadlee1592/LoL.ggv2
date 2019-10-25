import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
import './Carousel.css';

const fadeImages = [
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_16.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_6.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_15.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Brand_7.jpg'
];

const fadeProperties = {
  duration: 3000,
  transitionDuration: 1000,
  infinite: false,
  indicators: true
};

class Carousel extends Component {
  render() {
    return (
      <>
        <div className='slideshow-container'>
          <Fade {...fadeProperties}>
            <div className='each-fade'>
              <div className='image-container'>
                <img src={fadeImages[0]} alt='Champion' />
              </div>
            </div>
            <div className='each-fade'>
              <div className='image-container'>
                <img src={fadeImages[1]} alt='Champion' />
              </div>
            </div>
            <div className='each-fade'>
              <div className='image-container'>
                <img src={fadeImages[2]} alt='Champion' />
              </div>
            </div>
            <div className='each-fade'>
              <div className='image-container'>
                <img src={fadeImages[3]} alt='Champion' />
              </div>
            </div>
            <div className='each-fade'>
              <div className='image-container'>
                <img src={fadeImages[4]} alt='Champion' />
              </div>
            </div>
          </Fade>
        </div>
      </>
    );
  }
}

export default Carousel;
