import { Accounts } from 'meteor/accounts-base';
import '../imports/ui/home.js';
import '../imports/ui/newgame.js';

Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY' 
});

/** Route definition */

Router.route('/', function() {
  this.render('home');
});

Router.route('/newgame', function() {
    this.render('newgame');
});
