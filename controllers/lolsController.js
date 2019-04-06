require("dotenv").config()
const db = require("../models");
const fetch = require("node-fetch");
const api = process.env.RIOT_API_KEY
const champions = require("../champions.json");

Object.defineProperty(Array.prototype, "flat", {
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
  // console.log("account", account);
  return fetch(
    "https://na1.api.riotgames.com//lol/match/v4/matches/" +
      match.gameId +
      "?api_key=" +
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
          // console.log("results", results);
        }
      }

      // console.log("getOneMatch results", results);

      return results;
    });
};

const fixProfileURL = (link, json) => {
  return fetch(link)
    .then(response => {
      // console.log(response.status);
      if (response.status < 400) {
        json.profileIconURL = link;
      } else {
        json.profileIconURL =
          "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png";
      }
      return json;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  findAll: function(req, res) {
    const summonerName = req.params.id;
    // console.log(req.params.id, "req");
    fetch(
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        summonerName +
        "?api_key=" +
        api
    )
      .then(response => response.json())
      .then(json =>
        fixProfileURL(
          "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/" +
            json.profileIconId +
            ".png",
          json
        )
      )
      .then(json => {
        const account = {
          accountId: json.accountId,
          summonerName: summonerName,
          summonerLevel: json.summonerLevel,
          profileIconId: json.profileIconId,
          profileIconUrl: json.profileIconURL
        };
        res.locals.accountInfo = account;

        console.log("account",account);

        return fetch(
          "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" +
            account.accountId +
            "?api_key=" +
            api
        );
      })
      .then(response => response.json())
      .then(json => {
        console.log("json", json)
        const matches = json.matches.slice(0, 10);
        return Promise.all(
          matches.map(match => getOneMatch(match, res.locals.accountInfo))
        );
      })
      .then(matches => {
        res.locals.results = matches;
        let arrayMatches = matches.flat();

        db.Lol.find({ summonerName: summonerName })
          .then(function(response) {
            if (response.length === 0) {
              db.Lol.collection.insertMany(arrayMatches);
              // console.log(matches);
            } else {
              for (let i = 0; i < response.length; i++) {
                // console.log("looping over response");
                let exists = false;
                for (var j = 0; j < arrayMatches.length; j++) {
                  // console.log('looping over results')
                  // console.log("arrayMatches", arrayMatches.length)
                  // console.log("checking", arrayMatches[j].gameId == response[i].gameId)
                  if (arrayMatches[j].gameId == response[i].gameId) {
                    exists = true;
                    // console.log("exists", exists);
                  }
                }

                if (!exists) {
                  db.Lol.collection.insertOne(results[j]);
                } else {
                  // console.log("already there");
                }
                // if(typeof results[i] !== "undefined" && res[i].gameId !== results[i].gameId) {
                //   db.Lol.collection.insertOne(results[i]);
                //   console.log("inserted: ", res[i].gameId)
                // } else {
                //   console.log(res[i].gameId, " is already inserted")
                // }
              }
            }
          })
          .then(() => {
            db.Lol.find({ summonerName: summonerName })
              .then(function(response) {
                let clientData = response;
                console.log("client data", clientData);
                res.json(clientData);
              })
              .then(results => {
                res.json(results);
              });
          })

          .catch(err => res.status(422).json(err));
      });
  }
};
