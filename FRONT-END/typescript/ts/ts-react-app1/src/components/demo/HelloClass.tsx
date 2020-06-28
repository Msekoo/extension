// 实现一个类组件
import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import { thisExpression } from '@babel/types';

interface Greeting {
    name: string;
    firstName?: string;
    lastName?: string;
}
interface State {
    count: number
}

/**
 * @description: 类组件
 * @param {type} P: 属性类型  S: 状态类型
 * @return: 
 */
class HelloClass extends Component<Greeting, State>{
    state: State = {
        count: 0
    }
    static defaultProps = {
        firstName: '',
        lastName: ''
    }
    addCount() {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return (
            <>
                <p>你点击了{this.state.count}</p>
                <Button onClick={this.addCount.bind(this)}>Hello {this.props.name}</Button>
            </>
        )
    }
}

export default HelloClass