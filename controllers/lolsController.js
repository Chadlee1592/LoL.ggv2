require('dotenv').config();

const db = require('../models');
const fetch = require('node-fetch');
const api = process.env.RIOT_API;
const champions = require('../champions.json');

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth - 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});

const getChampName = key => {
  let championData = [];
  for (let i = 0; i < champions.length; i++) {
    if (champions[i].Key == key) {
      championData.push({
        championName: champions[i].championName,
        championURL: champions[i].imageUrl
      });
    }
  }
  return championData;
};

const getOneMatch = (match, account) => {
  return fetch(
    'https://na1.api.riotgames.com//lol/match/v4/matches/' +
      match.gameId +
      '?api_key=' +
      api
  )
    .then(response => response.json())
    .then(json => {
      const results = [];

      let participantId = null;
      let participantTeam = null;
      let kills = null;
      let deaths = null;
      let assists = null;

      let id = json.gameId;
      let date = new Date(json.gameCreation);
      // console.log('champion', match.champion);
      let champData = getChampName(match.champion);

      for (let j = 0; j < json.participantIdentities.length; j += 1) {
        if (
          json.participantIdentities[j].player.accountId === account.accountId
        ) {
          participantId = json.participantIdentities[j].participantId;
        }
      }
      for (let k = 0; k < json.participants.length; k += 1) {
        if (json.participants[k].participantId === participantId) {
          participantTeam = json.participants[k].teamId;
          kills = json.participants[k].stats.kills;
          deaths = json.participants[k].stats.deaths;
          assists = json.participants[k].stats.assists;
        }
      }
      for (let l = 0; l < json.teams.length; l += 1) {
        if (json.teams[l].teamId === participantTeam) {
          results.push({
            summonerName: account.summonerName,
            gameId: id,
            date: date,
            result: json.teams[l].win,
            summonerLevel: account.summonerLevel,
            profileIconUrl: account.profileIconUrl,
            championName: champData[0].championName,
            championURL: champData[0].championURL,
            stats: {
              kills: kills,
              deaths: deaths,
              assists: assists
            }
          });
        }
      }
      return results;
    });
};

const fixProfileURL = (link, json) => {
  return fetch(link)
    .then(response => {
      if (response.status < 400) {
        json.profileIconURL = link;
      } else {
        json.profileIconURL =
          'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png';
      }
      return json;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  findAll: async function(req, res) {
    const summonerName = req.params.id;
    // Grabbing basic profile information from the API based on the params
    const accountCallRes = await fetch(
      'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
        summonerName +
        '?api_key=' +
        api
    );
    const accountCallJson = await accountCallRes.json();

    if (!accountCallJson.id && accountCallJson.status.status_code === 404) {
      const error = {
        msg: 'Please try again'
      };
      res.status(400).json(error);
    } else {
      // Grabbing profile infomation from the fixProfileURL function
      const profileInfo = await fixProfileURL(
        'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/' +
          accountCallJson.profileIconId +
          '.png',
        accountCallJson
      );
      const profileInfoJson = await profileInfo;
      // Grabbing the accounId and passing it to the matchlist route
      const matchCallres = await fetch(
        'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' +
          accountCallJson.accountId +
          '?api_key=' +
          api
      );
      const matchCallJson = await matchCallres.json();

      // Creating account object to consolidate account information
      const account = {
        accountId: accountCallJson.accountId,
        summonerName: summonerName,
        summonerLevel: accountCallJson.summonerLevel,
        profileIconId: profileInfoJson.profileIconId,
        profileIconUrl: profileInfoJson.profileIconURL
      };

      // Only grabbing the latest 10 matches
      const matches = matchCallJson.matches.slice(0, 10);

      // Using Promise.all to make 10 calls at once and waiting for all of them to return
      const matchHistoryRes = await Promise.all(
        matches.map(match => getOneMatch(match, account))
      );
      const matchHistoryJson = await matchHistoryRes;

      // Using the flat method, combining all of the arrays into one array of objects
      const arrayMatches = matchHistoryJson.flat();

      const database = await db.Lol.find({ summonerName: summonerName });

      if (database.length === 0) {
        db.Lol.collection.insertMany(arrayMatches);
      } else {
        for (let i = 0; i < database.length; i++) {
          let exists = false;
          for (let j = 0; j < arrayMatches.length; j++) {
            if (arrayMatches[j].gameId == database[i].gameId) {
              exists = true;
            }
          }

          if (!exists) {
            db.Lol.collection.insertOne(arrayMatches[j]);
          }
        }
      }

      const sendClient = await db.Lol.find({ summonerName: summonerName });

      try {
        res.send(sendClient);
      } catch (e) {
        res.status(422).json(e);
      }
    }
  }
};
