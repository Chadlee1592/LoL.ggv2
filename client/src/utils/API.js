import axios from "axios";

export default {
  // Gets all books
  getLols: function(summonerName) {
    return axios.get("/api/lols/" + summonerName);
  },
  // Gets the book with the given id
  getLol: function(id) {
    return axios.get("/api/lols/" + id);
  },
  // Deletes the book with the given id
  deleteLol: function(id) {
    return axios.delete("/api/lols/" + id);
  },
  // Saves a book to the database
  saveLol: function(lolData) {
    return axios.post("/api/lols", lolData);
  }
};
