import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Players = new Mongo.Collection('players');   

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('players', () => Players.find());
}

Meteor.methods({
  'players.create'(gameCode, status) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    var player = {
      userId: Meteor.userId(),
      name: Meteor.user().username,
      gameCode: gameCode,
      role: null,
      status: status  
    };
    
    Players.insert(player);
  },
  'players.updateRole'(playerId, role) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Players.update(playerId, {
      $set: {
        role: role
      }
    });
  }
});