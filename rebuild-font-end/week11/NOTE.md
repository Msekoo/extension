* 有限generator可以for...of循环每次返回
* 'abc'.match(/a(b)c/) 不带全局匹配g会返回多个匹配项，下标1表示第一个括号，依次类推，如果不捕获匹配括号，括号内前面加?:
> 
  'abc'.replace(/a(b)c/, function(str, $1){
      console.log(str, $1);
  })
  'abc'.replace(/a(b)c/, "$1$$1")
>
* regexp.exec()可以匹配大量字符

