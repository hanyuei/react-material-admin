
React Ui-Material Admin Template
================================

Thanks to [rafaelhz's template](https://github.com/rafaelhz/react-material-admin-template).
This repo use the latest react (16.x) & material-ui (3.x) version and create-react-app to rewrite the template.

This is a simple responsive admin template using [React](https://facebook.github.io/react/) and [Material-UI](http://www.material-ui.com/) components.

This is the very first version, feel free to use for any app. Contributions are always welcome!

Demo
----

Installation / Running
----------------------

*for dev*

```sh

git clone <repository-url>

# change into the new directory
npm install

npm start # will run the app

# Visit the app at http://localhost:3000

```

*for test*

```
npm run test
```



*for Production*

```sh
npm run build

cd build

# start a static server serving ./build dir, eg node serve/http-server or serve in express using express.static
serve -s build

```

Docs
--------------

- compile & build & test

  check the [create-react-app react-scripts](https://github.com/facebook/create-react-app) doc for more information.

- material-ui 

  https://material-ui.com

  if you are using some material-ui 0.x version, you could check this docs for migration [migration-from-v0-x](https://material-ui.com/guides/migration-v0x/#migration-from-v0-x)

- css

  material-ui is using [jss](https://github.com/cssinjs/jss) css-in-js for styling solution.

- react-router

  now switch to version 4.x, it's a complete rewrite from the previous react-router version.
  https://reacttraining.com/react-router/web/example/basic


License
-------
MIT


