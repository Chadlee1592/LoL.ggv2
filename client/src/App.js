import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Champions from './components/Champions';
import Home from './components/Home';

import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <Layout className='layout'>
          <Header>
            <div className='logo' />

            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key='1'>
                <NavLink to='/'>Home</NavLink>
              </Menu.Item>
              <Menu.Item key='2'>
                <NavLink to='/champions'>Champions </NavLink>
              </Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: '0 50px' }}>
            <Route exact path='/' component={Home} />
            <Route path='/champions' component={Champions} />
          </Content>
          <Footer
            style={{
              textAlign: 'center'
            }}
          >
            LoL.gg-V2 2019
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
