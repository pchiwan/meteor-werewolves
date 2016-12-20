import views from './views';

function mergeFind(view, options) {
  if (options && options.find) {
    return Object.assign(view.find, options.find);
  }
  return view.find;  
}

function mergeOptions(view, options) {
  if (options && options.options) {
    return Object.assign(view.options, options.options);
  }
  return view.options;
}

/**
 * Gets the count of documents for given view / collection
 */
export function count(view, options) {
  return find(view, options).count();
}

/**
 * Gets a cursor and fetches its documents for given view / collection
 */
export function fetch(view, options) {
  return find(view, options).fetch();
}

/**
 * Gets a cursor for given view / collection
 */
export function find(view, options) {
  return view
    .collection()
    .find(mergeFind(view, options), mergeOptions(view, options));
}

/**
 * Gets a cursor's first occurrence for given view / collection
 */
export function findFirst(view, options) {
  return find(view, options).fetch()[0];
}

/**
 * Gets a single element for given view / collection
 */
export function findOne(view, options) {
  return view
    .collection()
    .findOne(mergeFind(view, options), mergeOptions(view, options));
}
