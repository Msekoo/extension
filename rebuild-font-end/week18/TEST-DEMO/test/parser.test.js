import { parseHTML } from "../src/parser.js";
import { parse } from "querystring";
let assert = require("assert")

it('parseHTML', () => {
    let doc = parseHTML("<div></div>");
    let div = doc.children[0];
    assert.equal(div.tagName, "div");
    assert.equal(div.children.length, 0);
    assert.equal(div.type, "element");
    assert.equal(div.attributes.length, 0);
});

it('parse a single element witdh text content', () => {
    let doc = parseHTML("<div>Hello</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.content, "Hello");
    assert.equal(text.type, "text");
});

it('tag mismatcht', () => {
    let doc = parseHTML("<div>a < b <</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.content, "a < b <");
    assert.equal(text.type, "text");
});

it('text with <', () => {
    try {
        let doc = parseHTML("<iv></isdv>");
    } catch (e){
        assert.equal(e.message, "Tag start end doesn't match!")
    }
});

it('with property', () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>");
    let div = doc.children[0];
    let count = 0;
    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);
});

it('tag mismatcht', () => {
    let doc = parseHTML("<div>a < b <</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.content, "a < b <");
    assert.equal(text.type, "text");
});

it('with property 2', () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
    let div = doc.children[0];
    let count = 0;
    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);
});

it('with property 3', () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>");
    let div = doc.children[0];

    let count = 0;
    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);
});

it('attribute with no value', () => {
    let doc = parseHTML("<div id />");
    let div = doc.children[0];
});

it('tag closing', () => {
    let doc = parseHTML("<div/>");
    let div = doc.children[0];
    for (let attr of div.attributes) {
        if (attr.name === "isSelfClosing") {
            assert.equal(attr.value, true);
        }
    }
});

it('tag closing', () => {
    let doc = parseHTML("<div =class />");
    let div = doc.children[0];
});


it('attribute with no value2', () => {
    let doc = parseHTML("<div id class data=ss/>");
    let div = doc.children[0];
    console.log("div", div)
    for (let attr of div.attributes) {
        if (attr.name === "isSelfClosing") {
            assert.equal(attr.value, true);
        }
    }
});

it('script', () => {
    let content = 
        `<div>abcd</div>
        <span>as</sapn>
        /script>
        <script
        <
        </
        </s
        </sc
        </scr
        </scri
        </scrip   
        </script   
        `
    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0];
    assert.equal(text.type, "text");
    assert.equal(text.content, content)
});