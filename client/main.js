import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/helpers/game.js';
import '/imports/ui/helpers/player.js';
import '/imports/ui/pages/creategame/creategame.js';
import '/imports/ui/pages/dashboard/dashboard.js';
import '/imports/ui/pages/gameover/gameover.js';
import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/joingame/joingame.js';
import '/imports/ui/pages//playerboard/playerboard.js';
import '/imports/ui/pages/waitboard/waitboard.js';
import '/imports/ui/pages/404.html';
import '/imports/startup/routes.js';

import '/imports/ui/common.scss';
import '/imports/ui/responsive.scss';

Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY' 
});

Template.layout.helpers({
  username() {
    return !!Meteor.user() ? Meteor.user().username : '';
  }
});