git init
npm init -y
npm i nodemon babel-cli babel-preset-env babel-preset-stage-3 --save-dev
touch .babelrc > {"presets": ["env", "stage-3"]}
touch .gitignore
package.json > "start": "nodemon --exec babel-node index.js"
npm i eslint --save-dev
eslint --init
-Use a popular style guide
-Airbnb
-No react
-Javascript

--Windows--
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-airbnb

--Linux--
bash (
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)

npm install --save apollo-server-express graphql-tools graphql express body-parser
