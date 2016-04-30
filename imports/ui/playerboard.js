import { Template } from 'meteor/templating';

import './playerboard.html';

Template.playerboard.helpers({
    user() {
        console.log(Meteor.user());
        return Meteor.user();
    } 
});