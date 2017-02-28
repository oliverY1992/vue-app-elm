import Router from 'koa-router';
import systemConfig from '../src/config/system';
const router = new Router();
import fs from 'fs';
import path from 'path';

let data;
try{
    const dataStr = fs.readFileSync(path.resolve(__dirname, 'data.json'));
    data = JSON.parse(dataStr);
}catch (err){
    throw err;
}

router
    .prefix(systemConfig.apiSuffix)
    .get('/goods', function *(next) {
        this.body = data['goods'];
    })
    .get('/seller', function *(next) {
        this.body = data['seller'];
    })
    .get('/comments', function *(next) {
        this.body = data['ratings'];
    })

export default router;
