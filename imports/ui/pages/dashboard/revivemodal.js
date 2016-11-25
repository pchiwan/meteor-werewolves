import { Template } from 'meteor/templating';
import enums from '/imports/helpers/enums.js';
import './revivemodal.html';

Template.revivemodal.onCreated(function () {
  this.player = this.data;
});

Template.revivemodal.events({
  'click #reviveButton'(event, instance) {
    // bring player back from the dead
    Meteor.call('players.updateStatus', instance.player._id, enums.playerStatus.Alive);
    Modal.hide('revivemodal');
    
    // register that the witch has already used her power to revive in this game
    Meteor.call('games.setProperty', instance.player.gameCode, { witchUsedRevivePower: true });
  }
});