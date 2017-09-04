import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Players } from './players.js';
import { gameStatus, playerStatus, roleNames } from '/imports/helpers/enums.js';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.methods({
    'games.create'(selectedChars, wolfCount) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      var game = {
        owner: this.userId,
        gameCode: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase(),
        specialChars: selectedChars,
        wolfCount: parseInt(wolfCount, 10),
        status: gameStatus.Created,
        creationDate: new Date(),
        modifiedDate: null
      };

      return Games.insert(game);
    },
    'games.checkStatus'(gameCode) {
      // retrieve players still alive in given game
      var players = Players.find({
        gameCode: gameCode,
        status: playerStatus.Alive
      }).fetch();
      
      // check how many of these alive players are werewolves
      var werewolves = _.filter(players, x => x.role === roleNames.werewolf).length;
      var huntsman = _.filter(players, x => x.role === roleNames.huntsman).length === 1;
      var townsfolk = players.length - werewolves;
      
      // the game is over if 
      // +there are no werewolves left, or
      // +there are more werewolves left than townsfolk, or
      // +there's equal number of werewolves and townsfolk left, and none of them is the Huntsman
      if (werewolves === 0 ||
          werewolves > townsfolk ||
          (werewolves === townsfolk && !huntsman)) {
        Meteor.call('games.setProperty', gameCode, {
          status: gameStatus.Finished,
          modifiedDate: new Date(),
          victory: werewolves === 0
        });
      }
    },
    'games.dealCards'(gameCode, players) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      // retrieve game
      var game = Games.findOne({ gameCode: gameCode });
      
      // calculate number of townsfolk: once the special character and werewolf cards
      // have been dealt, the rest of players will be townsfolk (townsfolk)
      var townsfolkCount = players.length - (game.specialChars.length + game.wolfCount);
      
      // let's collect the playable roles in this array 
      var cards = [];
      
      // special characters
      cards = cards.concat(game.specialChars);
      // wolves
      for (var i = 0, l = game.wolfCount; i < l; i++)
        cards.push(roleNames.werewolf);
      // townsfolk      
      for (var i = 0, l = townsfolkCount; i < l; i++)
        cards.push(roleNames.townsfolk);

      // now let's randomly deal roles to players
      players.forEach((player) => {
        var index = Math.floor(Math.random() * cards.length),
            card = cards.splice(index, 1);

        // assign role to player and update in database
        Meteor.call('players.updateRole', player._id, card[0]);
      });
    },
    'games.setProperty'(gameCode, prop) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Games.update({ gameCode: gameCode }, {
        $set: prop
      });
    },   
    'games.updateStatus'(gameCode, status) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Games.update({ gameCode: gameCode }, {
        $set: {
          status: status,
          modifiedDate: new Date()
        }
      });
    }
  });
}
