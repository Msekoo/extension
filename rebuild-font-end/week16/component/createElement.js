import { enableGesture } from './gesture';

// 设计组件体系，声明语言和编程语言的交界 attribute和property可以区分开来
function createElement(Cls, attributes, ...children) {
    
    let o;

    if(typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }

    for(let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }

    let visit = (children) => {
        for (let child of children) {
            if (typeof child === 'object' && child instanceof Array) {
                visit(child);
                continue;
            }
            if(typeof child === "string") 
                child = new Text(child);
    
            o.appendChild(child);
        }
    }
    visit(children);
    return o;
}


class Text {
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);

        if (name.match(/^on([\s\S]+)$/)) {
            let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase());
            this.addEventListener(eventName, value);
        }

        if (name === "enableGesture") {
            enableGesture(this.root);
        }
    }

    appendChild(child){
        this.children.push(child);
    }

    addEventListener() {
        this.root.addEventListener(...arguments);
    }
    
    get style() {
        return this.root.style;
    }

    mountTo(parent){
        parent.appendChild(this.root);

        for(let child of this.children){
            child.mountTo(this.root);
        }
    }
}



export {
    createElement,
    Text,
    Wrapper
}