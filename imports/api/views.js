import { Meteor } from 'meteor/meteor';
import { Players } from '/imports/api/players.js';
import { Games } from '/imports/api/games.js';

export const dashboard_players = {
  name: 'dashboard_players',
  collection: () => Players,
  find: {},
  options: {}
};

export const dashboard_games = {
  name: 'dashboard_games',
  collection: () => Games,
  find: {},
  options: {}
};

export const playerboard_players = {
  name: 'playerboard_players',
  collection: () => Players,
  find: {},
  options: {}
};

export const playerboard_games = {
  name: 'playerboard_games',
  collection: () => Games,
  find: {},
  options: {}
};

export const players = {
  name: 'players',
  collection: () => Players,
  find: {},
  options: {}
}

export default views = {
  dashboard_games,
  dashboard_players,
  playerboard_games,
  playerboard_players,
  players
};
