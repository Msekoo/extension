/*
 * @Author: your name
 * @Date: 2020-04-29 21:27:26
 * @LastEditTime: 2020-04-29 21:28:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /geek/week03/convert.js
 */

function covertStringToNumber(string, x){
    if(arguments.length < 2)
        x = 10;
    let chars = string.split('');
    let number = 0;
    
    let i = 0
    while(i< chars.length && chars[i] !== '.'){
        number = number * 10;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
    }
    if(chars[i] === '.'){
        i++;
    }
    let fraction = 0;
    while(i < chars.length){
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
    }
    return number;
}
//截断， 传数 0
function covertNumberToString(string, x){
   let integer = Math.floor(number);
   let fraction = number - integer;
   let string = '';
    while(integer > 0){
        string += String(integer % x) + string;
        integer = Math.floor(integer / x);
    }
    return string;
}