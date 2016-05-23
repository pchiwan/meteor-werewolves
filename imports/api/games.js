import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Players } from './players.js';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('games', () => Games.find());
}

Meteor.methods({
  'games.create'(selectedChars, wolfCount, status) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    var game = {
      owner: this.userId,
      gameCode: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase(), 
      specialChars: selectedChars,
      wolfCount: wolfCount,
      status: status,
      creationDate: new Date(),
      modifiedDate: null
    };    
    
    return Games.insert(game);
  },
  'games.dealCards'(gameCode, players, roles) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    var game = Games.findOne({ gameCode: gameCode }),
        roleNames = roles.map(x => x.name),
        rolesMapped = _.object(roleNames, roleNames),
        villagerCount = players.length - (game.specialChars.length + game.wolfCount),
        cards = [];
  
    // let's collect the playable roles
    // special characters
    cards = cards.concat(game.specialChars);
    // wolves
    for (var i = 0, l = game.wolfCount; i < l; i++) cards.push(rolesMapped.werewolf);
    // villagers
    for (var i = 0, l = villagerCount; i < l; i++) cards.push(rolesMapped.villager);
  
    // now let's randomly deal roles to players
    players.forEach((player) => {
      var index = Math.floor(Math.random() * cards.length),
          card = cards.splice(index, 1);
      
      // assign role to player and update in database
      Meteor.call('players.updateRole', player._id, card[0]);
    });    
  },
  'games.updateStatus'(gameCode, status) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Games.update({
        gameCode: gameCode
      }, {
      $set: {
        status: status,
        modifiedDate: new Date()
      }
    });
  }
});