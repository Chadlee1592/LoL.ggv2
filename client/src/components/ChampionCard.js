import React, { Component } from 'react';
import { Card, Col, Row, Carousel } from 'antd';
import './ChampionCard.css';

class ChampionCard extends Component {
  render() {
    return (
      <>
        <Card>
          <Row type='flex'>
            <Col>
              <img
                className='champion-icon'
                alt={this.props.name}
                src={this.props.image}
              />
            </Col>
            <Col>
              <div className='champion-name'> {this.props.name}</div>
              <div> {this.props.role}</div>
            </Col>
          </Row>
          <p />
          <Carousel afterChange={this.onChange} className='carousel'>
            {this.props.skins.map(skin => {
              return (
                <div className='carousel-skin'>
                  <img src={skin} alt='skin' />
                </div>
              );
            })}
          </Carousel>
        </Card>
      </>
    );
  }
}

export default ChampionCard;
