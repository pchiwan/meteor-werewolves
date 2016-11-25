import { Meteor } from 'meteor/meteor';
import views from './views';

export function subscribe(view, options, templateInstance) {
  const filter = {
    find: options && options.find ? Object.assign(view.find, options.find) : view.find,
    options: options && options.options ? Object.assign(view.options, options.options) : view.options
  };
  
  if (templateInstance) {
    return templateInstance.subscribe(view.name, filter);
  }
  return Meteor.subscribe(view.name, filter);
}
