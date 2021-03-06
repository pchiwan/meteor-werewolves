# NOTES

## Install Meteor packages
### Bootstrap
```
meteor add twbs:bootstrap
```

### Fontawesome
```
meteor add fortawesome:fontawesome
``` 

### User accounts
```
meteor add accounts-password
meteor add ian:accounts-ui-bootstrap-3
```

### Routing 
```
meteor add kadira:flow-router
meteor add kadira:blaze-layout
```

### Loading SCSS
```
meteor remove standard-minifier-css
meteor add seba:minifiers-autoprefixer
meteor add fourseven:scss
```

### Bootstrap modal
```
meteor add peppelg:bootstrap-3-modal
```

## Deploy application to Digital Ocean's droplet

Currently using kadira's [Meteor Up `mup`](https://github.com/kadirahq/meteor-up) to deploy the application with the command: 
```
mup deploy
```

Check instructions [here](https://github.com/kadirahq/meteor-up#server-configuration).