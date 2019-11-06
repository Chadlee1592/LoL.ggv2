const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lolSchema = new Schema({
  gameId: { type: String, required: true },
  summonerName: { type: String, required: true },
  imageURL: { data: Buffer, contentType: String },
  role: { type: String, required: true },
  result: { type: String, required: true },
  championName: { type: String, required: true },
  dataPlate: { type: Date, required: true },
  summonerLevel: { type: String },
  profileIconUrl: { data: Buffer, contentType: String },
  championURL: { data: Buffer, contentType: String },
  stats: { type: Object },
  exists: { type: Boolean },
  spell1Id: { type: String },
  spell2Id: { type: String },
  gameMode: { type: String }
});

const Lol = mongoose.model('Lol', lolSchema);

module.exports = Lol;
