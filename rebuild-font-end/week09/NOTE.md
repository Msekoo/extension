* data uri + svg 生成矢量图

> <!ENTITY quot "&#34;"> "\u0022"
<!ENTITY amp "&#38;#38;"> "\u0026"
<!ENTITY lt "&#38;#60;"> "\u003C"
<!ENTITY gt "&#62;"> "\u003E"

* &lt; = <  
* &amp; = &
* &quot; = "
* &#161; = ¡
* &gt; = >
* html实现多空格不合并， 使用样式white-space: pre-wrap;

## 导航类操作

* parentNode
* childNodes 会实时变化
* firstChild
* lastChild
* lastChild
* nextSibling

## 修改操作

* appendChild
* insertBefore
* removeChild
* replaceCHild
* 插入时，自动会从另一棵树中拆除

## 高级操作

* compareDocumentPosition 是一个用于比较两个节点中关系的函数
* contains检查一个节点是否是包含另一个节点的函数
* isEqualNode检查两个节点是否完全相同
* isSameNode检查两个节点是否是同一个节点，实际上在js中可以用“====”
* cloneNode复制一个节点，如果传参书true，则会连同子元素做深拷贝

## DOM
* DOM API: 1、DOM TREE 2、事件 3、range
