import { Accounts } from 'meteor/accounts-base';
import '../imports/ui/home.js';
import '../imports/ui/creategame.js';
import '../imports/ui/dashboard.js';
import '../imports/ui/joingame.js';
import '../imports/ui/playerboard.js';

Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY' 
});

/** Route definition */

Router.route('/', function() {
  this.render('home');
});

Router.route('/creategame', function() {
    this.render('creategame');
});

Router.route('/dashboard', function() {
    this.render('dashboard');
});

Router.route('/joingame', function() {
    this.render('joingame');
});

Router.route('/playerboard', function() {
    this.render('playerboard');
});