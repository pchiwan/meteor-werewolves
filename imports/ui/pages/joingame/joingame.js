import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { playerboard_games, playerboard_players } from '/imports/api/views';
import { count, findOne } from '/imports/api/finder';
import { subscribe } from '/imports/api/subscriber';
import { gameStatus, maxPlayers } from '/imports/helpers/enums.js';
import './joingame.html';
import './joingame.scss';

const state = new ReactiveDict();

const getFilter = () => {
  return {
    find: {
      gameCode: state.get('gameCode')
    }
  };
}

Template.joingame.onCreated(function () {
  const instance = Template.instance();

  instance.autorun(() => {
    const filter = getFilter();
    const gamesHandle = subscribe(playerboard_games, filter, instance);
    const playersHandle = subscribe(playerboard_players, filter, instance);
  });

  state.set('hasErrors', false);
  state.set('errorMessage', '');
  state.set('gameCode', '');
});

Template.joingame.helpers({
  errorMessage() {
    return state.get('errorMessage');
  },
  hasErrors() {
    return state.get('hasErrors');
  },
  playerName() {
    return Meteor.user().username;
  },
  ready() {
    return Template.instance().subscriptionsReady();
  }
});

Template.joingame.events({
  'click button#join-game'(event, instance) {
    var gameCode = instance.find('#game-code').value;
    if (gameCode) {
      state.set('gameCode', gameCode);

      // check whether game code exists in the database
      var game = findOne(playerboard_games, getFilter());

      if (game) {
        // check if player is already logged in to game
        var player = findOne(playerboard_players, { find: {
          userId: Meteor.userId(),
          gameCode
        }});

        // if player is already logged in, send him to the playerboard
        if (player) {
          FlowRouter.go(`/playerboard/${game.gameCode}`);
          return false;
        }

        var total = count(playerboard_players, getFilter());

        // player is not logged in and
        // + the game is already full (current number of players = max),
        // + or the game is live
        // then kick player out
        if (game.status === gameStatus.Live || total === maxPlayers) {
          state.set('hasErrors', true);
          state.set('errorMessage', 'You can not join this game. Please use a different code.');
          return false;
        }

        // finally, if all is good register player to join game
        Meteor.call('players.create', game.gameCode);

        // and navigate to player's dashboard
        FlowRouter.go(`/playerboard/${game.gameCode}`);
      } else {
        state.set('hasErrors', true);
        state.set('errorMessage', 'This game does not exist. Please use a different code.');
      }
    }
  }
});
