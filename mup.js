// check instructions on how to configure this file at https://github.com/kadirahq/meteor-up

module.exports = {
  // Server authentication info
  servers: {
    one: {
      host: '146.185.156.178',
      username: 'root',
      pem: '/Users/pchiwan/.ssh/id_rsa', // mup doesn't support '~' alias for home directory
      // password: 'password',
      // or leave blank to authenticate using ssh-agent
    }
  },

  meteor: {
    // Application name (No spaces)
    name: 'meteor-werewolves',

    // Location of app (local directory)
    path: '.',

    // List of servers to deploy, from the 'servers' list
    servers: {
      one: {}
    },

    // Configure environment
    env: {
      ROOT_URL: 'http://146.185.156.178',
      MONGO_URL: 'mongodb://localhost/meteor-werewolvese'
    },
    
    // Meteor Up checks if the app comes online just after the deployment
    // before mup checks that, it will wait for no. of seconds configured below
    deployCheckWaitTime: 120
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    }
  }  
};
