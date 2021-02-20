// const { addCSSRules, computeCSS } = require('./cssParse');
// const { layout } = require("./layout.js");

const EOF = Symbol("EOF"); // EOF: End Of File 标识文件结束


let currentToken = null;
let currentAttribute = null;
let stack;
let currentTextNode = null;



function emit(token) { 
    // if (token.type !== 'text')
    //     console.log("emit -> token", token)
    let top = stack[stack.length - 1];

    if (token.type === "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;

        // 存储元素属性
        for (let p in token) {
            if (p !== "type" && p!=="tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }

        // computeCSS(element, stack);

        top.children.push(element);
        element.parent = top;

        if (!token.isSelfClosing)
            stack.push(element);
        
        currentTextNode = null;
    } else if (token.type === "endTag") {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end doesn't match!");
        } else {
            // 遇到style标签时，执行添加所有css规则的操作
            // if (top.tagName === "style") {
            //     // addCSSRules(top.children[0].content);
            // }
            // layout(top);
            stack.pop();
        }
        currentTextNode = null;
    } else if (token.type === "text") {
        if (currentTextNode === null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}
 
function data(c) {
    if (c === "<") {
        return tagOpen;
    } else if (c === EOF) {
        emit({
            type: "EOF"
        })
        return;
    } else {
        emit({
            type: "text",
            content: c
        }) 
        return data;
    }
}

function tagOpen(c) { 
    if (c === "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    } else if (c === "EOF" ) {
        emit({
            type: "EOF"
        })
        return;
    } else { 
        emit({
            type: "text",
            content: "<"
        })
        return data(c);
    }
}
 
function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    } else if (c === ">") {
        return data;
    } else if (c === "EOF" ) {
        emit({
            type: "EOF"
        })
        return;
    } else { 
         
    } 
}
// in script
function scriptData(c) {
    if (c === '<') {
        return scriptDataLessThanSign;
    } else {
        emit({
            type: "text",
            content: c
        });
        return scriptData;
    }
}
// in script received <
function scriptDataLessThanSign(c) {
    if (c === '/') {
        return scriptDataEndTagOpen;
    } else {
        emit({
            type: "text",
            content: "<"
        });
        return scriptData(c);
    }
}
// in script received </
function scriptDataEndTagOpen(c) {
    if (c === 's') {
        return scriptDataEndTagNameS;
    } else {
        emit({
            type: "text",
            content: "</"
        })
        return scriptData(c);
    }
}
// in script received </s
function scriptDataEndTagNameS(c) {
    if (c === 'c') {
        return scriptDataEndTagNameC;
    } else {
        emit({
            type: "text",
            content: "</s"
        })
        return scriptData(c);
    }
}
// in script received </sc
function scriptDataEndTagNameC(c) {
    if (c === 'r') {
        return scriptDataEndTagNameR;
    } else {
        emit({
            type: "text",
            content: "</sc"
        });
        return scriptData(c);
    }
}
// in script received </scr
function scriptDataEndTagNameR(c) {
    if (c === 'i') {
        return scriptDataEndTagNameI;
    } else {
        emit({
            type: "text",
            content: "</scr"
        });
        return scriptData(c);
    }
}
// in script received </scri
function scriptDataEndTagNameI(c) {
    if (c === 'p') {
        return scriptDataEndTagNameP;
    } else {
        emit({
            type: "text",
            content: "</scri"
        });
        return scriptData(c);
    }
}
// in script received </scrip
function scriptDataEndTagNameP(c) {
    if (c === 't') {
        return scriptDataEndTag;
    } else {
        emit({
            type: "text",
            content: "</scrip"
        })
        return scriptData(c);
    }
}
// in script received </script
let spaces = 0
function scriptDataEndTag(c) {
    if (c === ' ') {
        spaces++;
        return scriptDataEndTag;
    } else if (c === '>') {
        emit({
            type: 'endTag',
            tagName: 'script'
        })
        return data;
    } else {
        emit({
            type: "text",
            content: "</script" + new Array(spaces).fill(' ').join('')
        })
        return scriptData(c);
    }
}

function tagName(c) { 
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === ">") {
        emit(currentToken);    
        return data;
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}
 
function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/" || c === ">" || c === EOF) {
        return afterAttributeName(c);
    } else if (c === "=") {
        currentAttribute = {
            name: c,
            value: ""
        }
        return attributeName;
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName(c) { 
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
        return afterAttributeName(c);
    } else if (c === "=") {
        return beforeAttributeValue;
    } else if (c === "\u0000") {
        
    } else if (c === "\"" || c === "\'" || c === "<") {
        
    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c) { 
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
 }

function beforeAttributeValue(c) { 
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
        return beforeAttributeValue;
    } else if (c === "\"") {
        return doubleQuotedAttributeValue;
    } else if (c === "\'") {
        return singleQuotedAttributeValue;
    } else if (c === ">") {
        // emit(currentToken)
        // return data;
    } else {
        return unquotedAttributeValue(c);
    }
 }

function doubleQuotedAttributeValue(c) { 
    if (c === "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === "\u00000") {
        
    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
 }

function singleQuotedAttributeValue(c) {
    if (c === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === "\u00000") {
        
    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) { 
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else {
        return beforeAttributeName(c);
    }
}

function unquotedAttributeValue(c) { 
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === "\u0000") {
        
    } else if (c === "\"" || c === "\'" || c === "<" || c === "=" || c === "`") {
        
    } else {
        currentAttribute.value += c;
        return unquotedAttributeValue;
    }
}

function selfClosingStartTag(c) {
    if (c === ">") {
        currentToken.isSelfClosing = true;
        emit(currentToken)
        return data;
    } else {
        return beforeAttributeName(c);
    }
}

export function parseHTML(html) {
    let state = data;
    stack = [{ type: "document", children: [] }];
    for (let c of html) {
        state = state(c);
        if (stack[stack.length - 1].tagName === "script" && state === data) {
            state = scriptData;
        }
    }
    state = state(EOF);
    return stack[0];
}