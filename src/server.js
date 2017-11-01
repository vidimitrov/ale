import * as Koa from 'koa';
import * as next from 'next';
import * as Router from 'koa-router';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as request from 'request';
import { join } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { variables } from './config';

const compression = require('compression');
const koaConnect = require('koa-connect');

const dev = process.env.NODE_ENV !== 'production';
const port = _.get(process.env, 'PORT', 3000);
const app = next({ dev, dir: 'dist' });
const handle = app.getRequestHandler();
const API_HOST_URL = variables.apiHostUrl;

app.prepare()
  .then(() => {
    const server = new Koa();
    server.proxy = true;

    server.use(koaConnect(compression()));

    const router = new Router();

    router.get('/service-worker.js', async (ctx) => {
      const filePath = join(__dirname, './static/', 'service-worker.js');

      ctx.set('Content-Type', 'application/javascript')
      await app.serveStatic(ctx.req, ctx.res, filePath);
      ctx.respond = false;
    });

    router.get('/sitemaps/:id', async (ctx) => {
      const id = _.get(ctx, 'params.id', null);
      await request(`${API_HOST_URL}/sitemap-${id}.xml`).pipe(ctx.res);
      ctx.status = 200;
      ctx.respond = false;
    });

    router.get('/sitemap.xml', async (ctx) => {
      await request(`${API_HOST_URL}/sitemap.xml`).pipe(ctx.res);
      ctx.status = 200;
      ctx.respond = false;
    });

    router.get('/sitemap.xsl', async (ctx) => {
      const filePath = join(__dirname, '../dist/static/', 'sitemap.xsl');
      await app.serveStatic(ctx.req, ctx.res, filePath);
      ctx.respond = false;
    });

    router.get('/robots.txt', async (ctx) => {
      const filePath = join(__dirname, '../dist/static/', 'robots.txt');
      ctx.set('Content-Type', 'text/plain');
      await app.serveStatic(ctx.req, ctx.res, filePath);
      ctx.respond = false;
    });

    router.get('*', async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(router.routes());
    server.listen(port, () => {
      /* tslint:disable:no-console */
      console.log(`> Ready on PORT ${port}`);
    });
    server.on('error', (err) => {
      if (err) {
        throw err;
      }
    })
  });
