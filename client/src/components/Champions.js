import React, { Component, Fragment } from 'react';
import { Col, Row, Pagination, Input, Button, Form } from 'antd';
import champions from './../champions.json';
import ChampionCard from './ChampionCard';
import API from '../utils/API';

const InputSearch = Input.Search;

class Champions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      results: [],
      error: {
        status_code: '',
        msg: ''
      },
      searched: ''
    };
  }
  onChange = (page, pageSize) => {
    this.setState({
      page: page,
      pageSize: pageSize
    });
  };

  championSearch = value => {
    API.getChamp(value)
      .catch(err => {
        this.setState({
          error: {
            status_code: 400,
            msg: 'Please check spelling and try again!'
          },
          searched: true
        });
      })
      .then(response => {
        this.setState({ searched: true, results: response.data });
      });
  };

  handleReset = e => {
    e.preventDefault();
    this.setState({ searched: '', results: [] });
    console.log(this.props.form);
  };

  render() {
    const champArray = champions.slice(
      (this.state.page - 1) * this.state.pageSize,
      this.state.page * this.state.pageSize
    );

    return (
      <Fragment>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <div className='search-bar'>
            <Form>
              <InputSearch
                style={{ width: 400 }}
                placeholder='Search for a Champion'
                onSearch={value => this.championSearch(value)}
                enterButton
              />
            </Form>
          </div>
          {this.state.searched ? (
            <Fragment>
              <Button
                type='primary'
                style={{ marginTop: '10px' }}
                onClick={this.handleReset}
              >
                Reset
              </Button>
              <Col span={12} xxl={8} />
              <ChampionCard
                name={this.state.results.championName}
                image={this.state.results.imageUrl}
                role={this.state.results.roles}
                skins={this.state.results.skinsUrls}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Row type='flex' justify='space-between'>
                {champArray.map(champion => {
                  return (
                    <Col span={12} xxl={8}>
                      <ChampionCard
                        name={champion.championName}
                        image={champion.imageUrl}
                        role={champion.roles}
                        skins={champion.skinsUrls}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Pagination
                pageSize={12}
                onChange={(page, pageSize) => this.onChange(page, pageSize)}
                defaultCurrent={1}
                total={143}
              />
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Champions;
