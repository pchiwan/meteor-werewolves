import { Template } from 'meteor/templating';
import enums from '/imports/helpers/enums.js';

Template.registerHelper('playerIsAlive', status => !!status ? status === enums.playerStatus.Alive : false);
Template.registerHelper('playerIsDead', status => !!status ? status === enums.playerStatus.Dead : false);