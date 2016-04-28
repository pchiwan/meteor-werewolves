import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Router.route('/', function () {
  this.render('home');
});

Template.body.rendered = function(){
    Accounts._loginButtonsSession.set('dropdownVisible', true);
    $(".login-close-text").hide();      
}   