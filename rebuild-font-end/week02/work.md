<!--
 * @Author: your name
 * @Date: 2020-04-22 21:49:04
 * @LastEditTime: 2020-04-26 22:22:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work bench/geek/week02/work.md
 -->
## s随堂练习 ##

* 编写带括号的四则运算产生式
```

// 可递归
<Number> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

<DecimalNumber> ::= "0" |  (("1" | "2" | ..... | "9") <Number>* )
<DecimalNumber> ::= /0|[1-9][0-9]*/ // 正则文法

<PrimaryExpression> ::= <DecimalNumber> |
    "(" <LogicalExpression> ")"

<MultiplicativeExpression> ::= <PrimaryExpression> |
    <MultiplicativeExpression> "*" <PrimaryExpression> |
    <MultiplicativeExpression> "/" <PrimaryExpression>

<AdditiveExpression> ::= <MultiplicativeExpression> |
    <AdditiveExpression> "+" <MultiplicativeExpression> |
    <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> ::= <AdditiveExpression> |
    <LogicalExpression> "||" <AdditiveExpression> |
    <LogicalExpression> "&&" <AdditiveExpression>

```

* 尽可能寻找你知道的计算机语言，尝试把它们分类
```

类型划分|强|弱
:-:|:-:|:-:
动态|Python|js、PHP
静态|Java|(C、C++)

```

## 课后作业 ##

* 写一个正则表达式 匹配所有 Number 直接量
```

DecimalLiteral ::
DecimalIntegerLiteral . DecimalDigitsopt ExponentPartopt
. DecimalDigits ExponentPartopt
DecimalIntegerLiteral ExponentPartopt

DecimalIntegerLiteral: /0|[1-9]\d*/
DecimalDigits: /\d+/
ExponentPart:  /[eE][\+\-]?\d+/

/** 分成两种情况，ExponentPart相同，通过｜连接前面的部分
  * 1）DecimalIntegerLiteral . DecimalDigitsopt ExponentPartopt 和
  *    DecimalIntegerLiteral ExponentPartopt
  * 2）. DecimalDigits ExponentPartopt
  */

// DecimalLiteral
/^(\.\d+|(0|[1-9]\d*)\.?\d*)([eE][\+\-]?\d+)?$/

// HexIntegerLiteral
/^0[xX][0-9a-fA-F]+$/

// OctalIntegerLiteral
/^0[oO][0-7]+$/

// BinaryIntegerLiteral
/^0[bB][01]+$/

// NumericLiteral
/^(\.\d+|(0|[1-9]\d*)\.?\d*)([eE][\+\-]?\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/

```

* 写一个 UTF-8 Encoding 的函数
```

function UTF8_Encoding(str) {
    let charArr = [];
    for (let i = 0; i< str.length; i++) {
        charArr = charArr.concat(unicodeToUTF8(str[i].codePointAt()));
    }
    return new Uint8Array(charArr).buffer;
}

/**
* @description: unicode码转为utf码，根据字节数划分情况
* @param {type} unicode码
* @return: utf码数组
*/    
function unicodeToUTF8(code) {
    if (code >= 0x00 && code <= 0x7f) {
        return [code];
    } else if (code <= 0x7ff) {
        // 110xxxxx 10xxxxxx
        return [
            (code >> 6) | 0b11000000,
            code & 0b111111 | 0b10000000
        ];
    } else if (code <= 0xffff) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        return [
            (code >> 12) | 0b11100000,
            code >> 6 & 0b111111 | 0b10000000,
            code & 0b111111 | 0b10000000
        ];
    } else if (code <= 0x10ffff) {
        // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        return [
            code >> 18 | 0b11110000,
            code >> 12 & 0b111111 | 0b10000000,
            code >> 6 & 0b111111 | 0b10000000,
            code & 0b111111 | 0b10000000,
        ];
    }
}

```

* 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
```

/(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*/

```