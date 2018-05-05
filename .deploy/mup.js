// check instructions on how to configure this file at http://meteor-up.com/docs.html

module.exports = {
  // Server authentication info
  servers: {
    one: {
      host: '209.250.244.217',
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
      ROOT_URL: 'https://209.250.244.217',
      MONGO_URL: 'mongodb://localhost/meteor-werewolves',
      PORT: 3000
    },

    // Meteor Up checks if the app comes online just after the deployment
    // before mup checks that, it will wait for no. of seconds configured below
    deployCheckWaitTime: 120,

    docker: {
      image: 'abernix/spaceglue:node-8.9.3-builddeps',
      imagePort: 3000
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
