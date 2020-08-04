# React Material-UI Admin Template

![React-Material-Admin](https://user-images.githubusercontent.com/6997095/54126976-b748a600-4443-11e9-8109-d7428da26bc6.gif)

[![CircleCI](https://circleci.com/gh/hanyuei/react-material-admin.svg?style=svg)](https://circleci.com/gh/hanyuei/react-material-admin)

This is a simple responsive admin template using [React](https://facebook.github.io/react/) and [Material-UI](http://www.material-ui.com/) components.

using [create-react-app react-scripts](https://github.com/facebook/create-react-app) to start.

This is the very first version, feel free to use for any app. Contributions are always welcome!

## Demo

You can find a demo [here](https://hanyuei.github.io/react-material-admin).

## Installation / Running

_for dev_

```sh
git clone <repository-url>

# change into the new directory
npm install

npm start # will run the app

# Visit the app at http://localhost:3000
```

_for test_

```
npm run test
```

_for Production_

```sh
npm run build

cd build

# start a static server serving ./build dir, eg node serve/http-server or serve in express using express.static
serve -s build
```

## Docs

- compile & build & test

  check the [create-react-app react-scripts](https://github.com/facebook/create-react-app) doc for more information.

- material-ui

  https://material-ui.com

  update material-ui from v3 to v4
  [migration to v4](https://material-ui.com/zh/guides/migration-v3/)

  if you are using some material-ui 0.x version, you could check this docs for migration [migration-from-v0-x](https://material-ui.com/guides/migration-v0x/#migration-from-v0-x)

- css

  material-ui is using [jss](https://github.com/cssinjs/jss) css-in-js for styling solution.

- react-router

  now switch to version 4.x, it's a complete rewrite from the previous react-router version.
  https://reacttraining.com/react-router/web/example/basic

- eslint
  using [eslint](https://eslint.org/) for js/react code lint.
  using [prettier](https://prettier.io/) for code styling

  `npm run lint` will show the lint result.

## Others

Thanks to [rafaelhz's template](https://github.com/rafaelhz/react-material-admin-template).
This repo first use the latest react (16.x) & material-ui (3.x) version and create-react-app to rewrite the admin template.

## License

MIT
