# meteor-werewolves
A Werewolves game web app developed with Meteor

## Set up proxy
SET HTTP_PROXY=http://websurfing1-tin1.esi.adp.com:8080

SET HTTPS_PROXY=http://websurfing1-tin1.esi.adp.com:8080

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
```
mupx deploy
```

Application URL: http://werewolves.carrotcake.io
