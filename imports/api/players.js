import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import enums from '/imports/helpers/enums.js';

export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.methods({
    'players.create'(gameCode) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      var player = {
        userId: Meteor.userId(),
        name: Meteor.user().username,
        gameCode: gameCode,
        role: null,
        status: enums.playerStatus.Alive
      };

      Players.insert(player);
    },
    'players.updateRole'(playerId, role) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Players.update(playerId, {
        $set: { role: role }
      });
    },
    'players.updateStatus'(playerId, status) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Players.update(playerId, {
        $set: { status: status }
      });
    }
  });
}