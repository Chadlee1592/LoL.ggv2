import axios from 'axios';

export default {
  // Get summoner information
  getLols: function(summonerName) {
    return axios.get('/api/lols/' + summonerName);
  },
  getChamp: function(championName) {
    return axios.get('/api/lols/champion/' + championName);
  },
  getSummonerSpell: function() {
    return axios.get(
      'http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/summoner.json'
    );
  }
};
