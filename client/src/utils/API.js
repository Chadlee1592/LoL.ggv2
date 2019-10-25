import axios from 'axios';

export default {
  // Get summoner information
  getLols: function(summonerName) {
    return axios.get('/api/lols/' + summonerName);
  }
};
