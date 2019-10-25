import React, { Component, Fragment } from 'react';
import API from '../utils/API';
import {
  Input,
  Card,
  Col,
  Row,
  Table,
  Avatar,
  Typography,
  Alert,
  Empty
} from 'antd';
import './Search.css';
import 'antd/dist/antd.css';
import Moment from 'react-moment';
import Chart from 'react-google-charts';

const InputSearch = Input.Search;
const { Title } = Typography;
const columns = [
  {
    title: 'Champion',
    dataIndex: 'championName'
  },
  {
    title: '',
    dataIndex: 'championURL',
    render: championURL => <img src={championURL} className='champion-Url' />
  },
  {
    title: 'Statistics',
    dataIndex: 'stats',
    render: stats => (
      <div>
        <span>{`${stats.kills}/${stats.deaths}/${stats.assists}`}</span>
      </div>
    )
  },
  {
    title: 'Win or Loss',
    dataIndex: 'result'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: date => <Moment format='MM/DD/YYYY'>{date}</Moment>
  }
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoners: [],
      results: [],
      summonerName: '',
      summonerLevel: '',
      profileIconUrl: '',
      stats: '',
      error: {
        status_code: '',
        msg: ''
      }
    };
  }

  summonerSearch = value => {
    API.getLols(value)
      .catch(err => {
        this.setState({
          error: {
            status_code: 400,
            msg:
              'This summoner is not registered at League of Legends. Please check spelling and try again!'
          }
        });
        throw err;
      })
      .then(response => {
        let summonerName;
        let summonerLevel;
        let profileIconUrl;
        let championName;
        let championURL;
        let stats;
        let winCount = response.data.filter(match => {
          return match.result === 'Win';
        }).length;

        let lossCount = response.data.filter(match => {
          return match.result === 'Fail';
        }).length;

        if (response.data.length > 0) {
          if (response.data[0].summonerName) {
            summonerName = response.data[0].summonerName;
          }

          if (response.data[0].summonerLevel) {
            summonerLevel = response.data[0].summonerLevel;
          }

          if (response.data[0].profileIconUrl) {
            profileIconUrl = response.data[0].profileIconUrl;
          }
          if (response.data[0].championName) {
            championName = response.data[0].championName;
          }

          if (response.data[0].championURL) {
            championURL = response.data[0].championURL;
          }
          if (response.data[0].stats) {
            stats = response.data[0].stats;
          }
          this.setState({
            results: response.data,
            summonerName: summonerName,
            summonerLevel: summonerLevel,
            profileIconUrl: profileIconUrl,
            championName: championName,
            championURL: championURL,
            winCount: winCount,
            lossCount: lossCount,
            stats: stats,
            error: ''
          });
        }
        // }
      });
  };

  render() {
    const data = this.state.results;
    return (
      <Fragment>
        <div class='search-bar'>
          <InputSearch
            style={{ width: 400 }}
            placeholder='Search for a Summoner'
            onSearch={value => this.summonerSearch(value)}
            enterButton
          />
        </div>
        <Fragment>
          {this.state.error.status_code === 400 ? (
            <Fragment>
              <Alert
                message={<h2>{this.state.error.msg}</h2>}
                type='warning'
              ></Alert>
              <Empty />
            </Fragment>
          ) : (
            <wrapper>
              <div className='gutter-example'>
                <Row gutter={16}>
                  <Col className='gutter-row' span={12}>
                    <div class='summoner-icon' style={{ padding: '1px' }}>
                      <Card
                        title={this.state.summonerName}
                        style={{ width: 300 }}
                      >
                        <p>
                          {this.state.summonerLevel
                            ? `Level ${this.state.summonerLevel}`
                            : ''}{' '}
                        </p>

                        {this.state.profileIconUrl ? (
                          <img src={this.state.profileIconUrl} />
                        ) : (
                          <Avatar shape='square' size={64} icon='user' />
                        )}
                      </Card>
                    </div>
                  </Col>
                  <Col className='gutter-row' span={12}>
                    <div className='gutter-box'>
                      <header className='match-statistics'>
                        <Title level={3}>Match Statistics</Title>
                      </header>
                      <div className='chart'>
                        <Chart
                          width={'500px'}
                          height={'300px'}
                          chartType='PieChart'
                          loader={<div>Loading Chart</div>}
                          data={[
                            ['Match Statistics', 'Win or Loss'],
                            ['Win', this.state.winCount],
                            ['Loss', this.state.lossCount]
                          ]}
                          options={{
                            colors: ['#1890FF', '#F74859']
                          }}
                          rootProps={{ 'data-testid': '1' }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className='gutter-row' span={24}>
                    <div class='results-table'>
                      <h4>Most Recent Matches</h4>
                      <Table
                        columns={columns}
                        dataSource={data}
                        size='middle'
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </wrapper>
          )}
        </Fragment>
      </Fragment>
    );
  }
}

export default Search;
