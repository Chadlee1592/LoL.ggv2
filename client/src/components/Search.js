import React, { Component, Fragment } from 'react';
import API from '../utils/API';
import Carousel from './Carousel';
import { Input, Alert, Empty } from 'antd';
import MatchData from './MatchData';
import './Search.css';
import 'antd/dist/antd.css';

const InputSearch = Input.Search;

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
      },
      searched: ''
    };
  }

  summonerSearch = value => {
    this.setState({ searched: true });
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
        console.log(response);
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
    return (
      <Fragment>
        <div className='search-bar'>
          <InputSearch
            style={{ width: 400 }}
            placeholder='Search for a Summoner'
            onSearch={value => this.summonerSearch(value)}
            enterButton
          />
        </div>
        <Fragment>
          {this.state.searched === true ? (
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
                <Fragment>
                  <MatchData
                    summonerName={this.state.summonerName}
                    summonerLevel={this.state.summonerLevel}
                    profileIconUrl={this.state.profileIconUrl}
                    winCount={this.state.winCount}
                    lossCount={this.state.lossCount}
                    data={this.state.results}
                  />
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Carousel />
          )}
        </Fragment>
      </Fragment>
    );
  }
}

export default Search;
