import { Accounts } from 'meteor/accounts-base';
import '../imports/ui/pages/creategame.js';
import '../imports/ui/pages/dashboard.js';
import '../imports/ui/pages/home.js';
import '../imports/ui/pages/joingame.js';
import '../imports/ui/pages/playerboard.js';
import '../imports/ui/pages/waitboard.js';
import '../imports/ui/pages/404.html';

import '../imports/startup/routes.js';

import '../imports/ui/helpers/game.js';

Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY' 
});