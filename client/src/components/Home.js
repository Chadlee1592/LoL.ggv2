import React, { Component } from 'react';
import Search from './Search';

class Home extends Component {
  render() {
    return (
      <>
        <div
          class='welcome-title'
          style={{ background: '#fff', padding: 24, minHeight: 80 }}
        >
          Welcome to LoL.gg
          <p />
          <Search />
        </div>
      </>
    );
  }
}

export default Home;
