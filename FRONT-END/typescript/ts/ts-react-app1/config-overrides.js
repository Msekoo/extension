/*
 * @Author: your name
 * @Date: 2020-04-15 17:15:21
 * @LastEditTime: 2020-04-17 16:32:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/FRONT-END/typescript/ts/ts-react-app1/config-overrides.js
 */
import { override, fixBabelImports } from 'customize-cra'

export default override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirctory: 'es',
        style: 'css'
    })
);