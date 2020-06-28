import React from 'react';
import ReactDom from 'react-dom';
import Hello from './components/demo/Hello';
import HelloClass from './components/demo/HelloClass';
import HelloHOC from './components/demo/HelloHOC';
import HelloHooks from './components/demo/HelloHooks';
// import App from './components/App';
// import Root from './routers';

ReactDom.render(
    // <HelloHOC name="uuuuuu" loading={false}/>,
    <HelloHooks name="uuuuuu" />,
    // <App />,
    // <Root />,
    document.querySelector('#root')
)