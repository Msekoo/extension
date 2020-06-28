/*
 * @Author: your name
 * @Date: 2020-04-16 16:53:22
 * @LastEditTime: 2020-04-17 16:09:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/FRONT-END/typescript/ts/ts-react-app/src/setupProxy.js
 */
import proxy from 'http-proxy-middleware';

export default function(app) {
    app.use(proxy('/api/**/*.action', {
        target: 'http://localhost:4000',
        pathRewrite(path) {
            return path.replace('/api', '/').replace('.action', '.json');
        }
    }));
};