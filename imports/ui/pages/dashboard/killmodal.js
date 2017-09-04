import { Template } from 'meteor/templating';
import { playerStatus, roleNames } from '/imports/helpers/enums.js';
import './killmodal.html';
import './killmodal.scss';

Template.killmodal.onCreated(function () {
  this.game = this.data.game;
  this.player = this.data.player;
});

Template.killmodal.helpers({
  showWitch() {
    return this.game.specialChars.indexOf(roleNames.witch) >= 0 && !this.game.witchUsedKillPower;
  },
  showHuntsman() {
    return this.game.specialChars.indexOf(roleNames.huntsman) >= 0;
  }
});

Template.killmodal.events({
  'click #killButton'(event, instance) {
    var killedBy = instance.find('[name="killer"]:checked').value;

    // eliminate player
    Meteor.call('players.updateStatus', instance.player._id, playerStatus.Dead, killedBy);

    // check whether the player was killed by the witch
    // if true, register that the witch has already used her power to kill in this game
    Meteor.call('games.setProperty', instance.player.gameCode, { witchUsedKillPower: true });

    Modal.hide('killmodal');
    
    // check game status and finish game if necessary
    Meteor.call('games.checkStatus', instance.player.gameCode);
  }
});