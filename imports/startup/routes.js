import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  action: () => {
    BlazeLayout.render('layout', { main: 'home' });
  }
});

FlowRouter.route('/creategame', {
  action: () => {
    BlazeLayout.render('layout', { main: 'creategame' });
  }
});

FlowRouter.route('/dashboard/:gamecode', {
  action: () => {
    BlazeLayout.render('layout', { main: 'dashboard' });
  }
});

FlowRouter.route('/gameover/:gamecode', {
  action: () => {
    BlazeLayout.render('layout', { main: 'gameover' });
  }
});

FlowRouter.route('/joingame', {
  action: () => {
    BlazeLayout.render('layout', { main: 'joingame' });
  }
});

FlowRouter.route('/playerboard/:gamecode', {
  action: () => {
    BlazeLayout.render('layout', { main: 'playerboard' });
  }
});

FlowRouter.route('/waitboard/:gamecode', {
  action: () => {
    BlazeLayout.render('layout', { main: 'waitboard' });
  }
});

FlowRouter.route('/playergames', {
  action: () => {
    BlazeLayout.render('layout', { main: 'playergames' });
  }
});

FlowRouter.route('/admin', {
  action: () => {
    BlazeLayout.render('layout', { main: 'admin' });
  }
});

FlowRouter.notFound = {    
  action: function() {
    BlazeLayout.render('layout', { main: '404' });
  }
};
