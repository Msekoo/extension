import React, { Component } from 'react';
import HelloClass from './HelloClass';

interface Loading {
    loading: boolean;
}
/**
 * @description: 高阶组件 类型约束
 * @param {type}  P: 被包装组件的属性的类型
 * @return: 
 */
function HelloHOC<P>(WrappedComponent: React.ComponentType<P>) {
    return class extends Component<P & Loading> {
        render() {
            const { loading, ...props } = this.props;
            return loading ? <div>Loading...</div> : <WrappedComponent {...props as P} />
        }
    }
}

export default HelloHOC(HelloClass)