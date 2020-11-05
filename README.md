# Engadgement Tracker


## Demo


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

  check the [engagement-tracker react-scripts](https://github.com/facebook/engagement-tracker) doc for more information.

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

Thanks to [hanyuei's template](https://github.com/hanyuei/react-material-admin-template).

## License

MIT
