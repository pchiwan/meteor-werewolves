// check instructions on how to configure this file at http://meteor-up.com/docs.html

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

  app: {
    // Application name (No spaces)
    name: 'meteor-werewolves',

    // Location of app (local directory)
    path: '../',

    // List of servers to deploy, from the 'servers' list
    servers: {
      one: {}
    },

     buildOptions: {
      serverOnly: true,
    },

    // Configure environment
    env: {
      ROOT_URL: 'http://146.185.156.178',
      MONGO_URL: 'mongodb://localhost/meteor-werewolves'
    },
    
    // Meteor Up checks if the app comes online just after the deployment
    // before mup checks that, it will wait for no. of seconds configured below
    deployCheckWaitTime: 120,

    docker: {
      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      image: 'abernix/meteord:base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    port: 27017,
    servers: {
      one: {},
    }
  }  
};
