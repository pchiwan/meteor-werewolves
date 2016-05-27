# meteor-werewolves
A Werewolves game web app developed with Meteor

## Set up proxy
SET HTTP_PROXY=http://websurfing1-tin1.esi.adp.com:8080

SET HTTPS_PROXY=http://websurfing1-tin1.esi.adp.com:8080

## Install Meteor packages
### Add Bootstrap
```
meteor add twbs:bootstrap
```

### Add Fontawesome
```
meteor add fortawesome:fontawesome
``` 

### Add user accounts
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

## Deploy application to Digital Ocean's droplet
```
mupx deploy
```

Application URL: http://146.185.156.178/
