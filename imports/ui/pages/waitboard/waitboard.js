import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { dashboard_games, dashboard_players } from '/imports/api/views';
import { fetch, findOne } from '/imports/api/finder';
import { subscribe } from '/imports/api/subscriber';
import enums from '/imports/helpers/enums.js';
import './waitboard.html';

const gameVar = new ReactiveVar(null);
const playersVar = new ReactiveVar([]);

Template.waitboard.onCreated(function () {
  const self = this;
  const instance = Template.instance();
  
  this.gameCode = FlowRouter.getParam('gamecode');

  const filter = { find: {
    gameCode: this.gameCode
  }};
  const gamesHandle = subscribe(dashboard_games, filter, instance);
  const playersHandle = subscribe(dashboard_players, filter, instance);

  instance.autorun(() => {
    if (gamesHandle.ready()) {
      gameVar.set(findOne(dashboard_games, filter));
    }
    if (playersHandle.ready()) {
      playersVar.set(fetch(dashboard_players, filter));
    }
  });
});

Template.waitboard.helpers({
  awaiting() {    
    return playersVar.get().length < enums.minPlayers;    
  },
  game() {
    return gameVar.get();
  },
  players() {
    return playersVar.get();
  },
  ready() {
    return Template.instance().subscriptionsReady();
  }
});

Template.waitboard.events({
  'click #start-game'(event, instance) {
    // there should at least be 8 players to start the game       
    var players = playersVar.get();
        
    if (players.length >= enums.minPlayers) {
      // deal game cards
      Meteor.call('games.dealCards', instance.gameCode, players);

      // update game
      Meteor.call('games.updateStatus', instance.gameCode, enums.gameStatus.Live);

      // and navigate to deathboard
      FlowRouter.go(`/dashboard/${instance.gameCode}`);
    }
  },
  'click #goto-dashboard'(event, instance) {
    FlowRouter.go(`/dashboard/${instance.gameCode}`);
  },
  'click #go-home'(event) {
    FlowRouter.go('/');
  }
});

