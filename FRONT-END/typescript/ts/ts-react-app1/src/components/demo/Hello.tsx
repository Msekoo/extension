import React from 'react';
import { Button } from 'antd';

interface Greeting {
    name: string;
    firstName: string;
    lastName: string;
}
/**
 * @description: 函数组件
 * @param {type} 属性类型
 * @return: 
 */
const Hello = (props: Greeting) => <Button>Hello {props.name}</Button>

// const Hello: React.FC<Greeting> = ({
//     name,
//     firstName,
//     lastName,
//     children
// }) => <Button>Hello {name}</Button>

Hello.defaultProps = {
    firstName: '',
    lastName: ''
}
export default Hello