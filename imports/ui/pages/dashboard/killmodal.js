import { Template } from 'meteor/templating';

import './killmodal.html';
import enums from '/imports/ui/helpers/enums.js';

import { Players } from '/imports/api/players.js';

Template.killmodal.onCreated(function () {
  this.player = this.data;
});

Template.killmodal.events({
  'click #killButton'(event, instance) {
    // eliminate player
    Meteor.call('players.updateStatus', instance.player._id, enums.playerStatus.Dead);
    Modal.hide('killmodal');
  }
});