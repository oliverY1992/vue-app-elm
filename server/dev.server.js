import koa from 'koa';
import createDevMiddleware from 'koa-webpack-dev-middleware';
import createHotMiddleware from 'koa-webpack-hot-middleware';
import webpack from 'webpack';
import devConfig from '../webpack/dev.conf';
import apiRouter from './api.router';

const compiler = webpack(devConfig);
const devMiddleware = createDevMiddleware(compiler, {
    publicPath:devConfig.output.publicPath,
    stats:{
        colors:true
    },
    noInfo:true
});
const hotMiddleware = createHotMiddleware(compiler);
const app = koa();

app
    .use(devMiddleware)
    .use(hotMiddleware)
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(function *(next) {
        const html = renderPage();
        this.body = html;
    })

app.listen(2333);
function renderPage() {
    return (
        `<!doctype html>
        <html>
            <head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </head>
            <body>
                <div id="app"></div>
                <script src="/main.bundle.js"></script>
            </body>
        </html>`
    )
}
