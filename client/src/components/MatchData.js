import React, { Fragment } from 'react';
import { Card, Col, Row, Table, Typography, Avatar } from 'antd';
import Chart from 'react-google-charts';
import Moment from 'react-moment';
import './MatchData.css';

const { Title } = Typography;
const columns = [
  {
    title: 'Champion',
    dataIndex: 'championName'
  },
  {
    title: '',
    dataIndex: 'championURL',
    render: championURL => (
      <div>
        <img src={championURL} className='champion-Url' alt='Champion' />
      </div>
    )
  },
  {
    title: 'Game Mode',
    dataIndex: 'queueId'
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

function MatchData(props) {
  return (
    <Fragment>
      <div className='gutter-example'>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <div className='summoner-icon' style={{ padding: '1px' }}>
              <Card title={props.summonerName} style={{ width: 300 }}>
                <p>
                  {props.summonerLevel ? `Level ${props.summonerLevel}` : ''}{' '}
                </p>

                {props.profileIconUrl ? (
                  <img src={props.profileIconUrl} alt='Profile-Icon' />
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
                    ['Win', props.winCount],
                    ['Loss', props.lossCount]
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
            <div className='results-table'>
              <h4>Most Recent Matches</h4>
              <Table columns={columns} dataSource={props.data} size='middle' />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default MatchData;
