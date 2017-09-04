import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Games } from './games.js';
import { Players } from './players.js';
import enums from '/imports/helpers/enums.js';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.methods({
    'getPlayerGames'(userId) {      
      // retrieve all players for given user ID
      var players = Players.find({
        userId: userId
      }).fetch();

      // get game codes for resulting players
      var gameCodes = players.map(p => p.gameCode);

      // now fetch games from their game codes
      var games = Games.find({
        gameCode: { $in: gameCodes }
      }).fetch();

      return games;
    }
  });
}