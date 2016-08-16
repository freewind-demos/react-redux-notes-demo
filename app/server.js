import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  // Notice!
  // lazy must be `false` to make `webpack-hot-middleware` work
  lazy: false,

  // watch options (only lazy: false)
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },

  publicPath: webpackConfig.output.publicPath

}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(bodyParser.json());
app.use(express.static('./public'));

const messages = [];

app.get('/messages', function (req, res) {
  res.json(messages);
});

app.post('/messages', function (req, res) {
  const message = req.body;
  messages.push(message);
  res.send(201);
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});
