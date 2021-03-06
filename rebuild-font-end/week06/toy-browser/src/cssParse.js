const css = require('css');
// TODO 复合选择器
// 加入一个新的函数，addCSSRules,这里我们把css规则暂存到一个数组里
let rules = [];
// css样式规则收集函数
function addCSSRules(text) {
    let ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}
// 判断元素和选择器是否匹配
function match(element, selector) {
    if (!selector || !element.attributes)
        return false;
    
    if (selector.charAt(0) === "#") {
        let attr = element.attributes.filter(attr => attr.name === "id")[0];
        if (attr && attr.value === selector.replace("#", ""))
            return true;
    } else if (selector.charAt(0) === ".") {
        let attr = element.attributes.filter(attr => attr.name === "class");
        let selectorAttr = selector.replace(".", "")
        for (let i = 0; i < attr.length; i++){
            if (attr[i] && attr[i].value === selectorAttr)
                return true;
        }
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }
    return false; 
}
// 确定选择器的优先级，第一项可作为行内样式优先级，级别最高
function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectors = selector.split(" ");
    for (let part of selectors) {
        if (part.charAt(0) === "#") {
            p[1] += 1;
        } else if (part.charAt(0) === ".") {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}
// 优先级比较，数组每项优先级递减
function compareSP(sp1, sp2){
    if (sp1[0] - sp2[0])
        return sp1[0] - sp2[0];
    if (sp1[1] - sp2[1])
        return sp1[1] - sp2[1];
    if (sp1[2] - sp2[2])
        return sp1[2] - sp2[2];
    return sp1[3] - sp2[3];
}
// 给元素添加匹配样式
function computeCSS(element, stack) {
    let elements = stack.slice().reverse();
    if (!element.computedStyle)
        element.computedStyle = {};
    
    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(" ").reverse();
         // 匹配元素和复杂选择器的最后一项是否匹配
        if (!match(element, selectorParts[0]))
            continue;
        let matched = false;
        let j = 1;
        for (let i = 0; i < elements.length; i++){
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length)
            matched = true;
        
        if (matched) {
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property])
                    computedStyle[declaration.property] = {}
                
                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                } else if (compareSP(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
            }
            console.log("element", element.computedStyle);
        }
    }
}

module.exports = {
    addCSSRules,
    computeCSS
}