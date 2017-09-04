import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.registerHelper('printDate', date => date.toISOString().slice(0,10));