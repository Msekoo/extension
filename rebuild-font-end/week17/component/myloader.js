let parser = require("./parser")

module.exports = function (source, map) {
    let tree = parser.parseHTML(source)
    // console.log('parser:\n', tree.children[1].children[0].content);

    let template = null;
    let script = null;

    for (let node of tree.children) {
        if (node.tagName === 'template') {
            template = node.children.filter(e => e.type !== "text")[0];
        }
        if (node.tagName === 'script') {
            script = node.children[0].content;
        }
    }

    let visit = (node) => {
        if (node.type === 'text') {
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for (let attribute of node.attributes) {
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node => visit(node));
        console.log("visit -> children", children)
        return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
    }
    

    let r = `
import { createElement } from './createElement.js'
export class Carousel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }
    render(){
        return ${visit(template)}
    }
    setAttribute(name, value) { 
        this.attributes.set(name, value);
    }
    mountTo(parent){
        this.render().mountTo(parent)
    }
}
    `;
    console.log(r)
    return r;
}