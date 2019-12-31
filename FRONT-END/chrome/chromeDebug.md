## **copy（...）**

在 `console` 里 `copy` 任何你能拿到的资源。例如 `copy($_)` 或 `copy($0)`。



## `Store as global` (存储为一个全局变量)

将数据转化为一个全局变量，只需要 **右击** 它，并选择 “`Store as global variable`”   (保存为全局变量) 选项。

第一次使用的话，它会创建一个名为 `temp1` 的变量，第二次创建 `temp2`，第三次 ...。通过使用这些变量来操作对应的数据，不用再担心影响到他们原来的值。



## 保存堆栈信息( `Stack trace` )

 **如何准确的描述问题**，这时候 `console` 打印出来的堆栈跟踪信息可以通过(save as...)保存为一个文件，而不只是截图。



## 直接Copy HTML

右击或者点击在 `HTML` 元素边上的省略号 (...) 就可以将它 `copy` 到剪贴板中，但：古老的`[ctrl] + [c]`大法依旧可用



## 切换 `DevTools` 窗口的展示布局

一般我在使用 `DevTools` 时， `dock` 的展示窗口都在底部 .这时就可以通过 `DevTools` 的下拉菜单，或者命令菜单...或者使用一个快捷键 `ctrl + shift + D` (`⌘ + shift + D` Mac) 来实现位置的切换（通常是从 `开始的位置` 到 `右边位置`， 但是如果一开始就是 `右边的位置` 那么会切换到 `左边的位置`）:



## 切换 `DevTools` 的面板

- 按下 `ctrl + [` 和 `ctrl + ]` 可以从当前面板的分别向左和向右切换面板。
- 按下 `ctrl + 1` 到 ``ctrl + 9`可以直接转到编号`1`...`9`的面板(`ctrl + 1`转到元素面板，`ctrl + 4` 转到 网络信息面板等等)

第二组快捷键默认被禁用了。你可以通过`DevTools`>>`Settings`>>`Preferences`>>`*Appearance*` 打开这个选项。



## elements， logs， sources & network 中的查找

`DevTools` 中的前4个主要的面板，每一个都支持 `[ctrl] + [f]` 快捷方式，你可以使用对应的查询方式来查找信息:

- 在 `Elements` 面板中 - 通过 `string` ，选择器 或者 `XPath` 来查找
- 而在 `Console`， `Network` 以及 `Source` 面板 - 通过区分大小写，或者可以被视为表达式的 `strings`， 来查找
- 

![img](https://user-gold-cdn.xitu.io/2019/1/22/168747e72320ff3a?imageView2/0/w/1280/h/960/ignore-error/1)



# 使用 Command

- 在 `Chrome` 的调试打开的情况下 按下 [ `Ctrl]` + `[Shift]` + `[P]` (Mac： `[⌘]` + `[Shift]`+ `[P]` )
- 或者使用 `DevTools` 的 `dropdown` 按钮下的这个选项

**截屏：**打开 `Commands` 菜单并输入`screen`，有截全屏和部分截屏模式

**快速切换面板：**打开 `Commands` 菜单并输入`layout`

**快速切换主题：**打开 `Commands` 菜单并输入`theme`



# 代码块的使用

进入到 `Sources` 面板，在导航栏里选中 `Snippets` 这栏，点击 `New snippet(新建一个代码块)` ，然后输入你的代码之后保存。

通过右击菜单或者快捷键： `[ctrl] + [enter]` 来运行它。

在 `DevTools` 中预设了一组代码块后，不必通过 `Sources` 来运行它们。使用 `Command Menu` (ctrl+p)是最快的方式。只需在它的输入框中输入 `!` ，就可以根据名字来筛选预设代码块



# console 中的 '$'

**$0：**在 `Chrome` 的 `Elements` 面板中， `$0` 是对我们当前选中的 `html` 节点的引用。

理所当然，`$1` 是对上一次我们选择的节点的引用，`$2` 是对在那之前选择的节点的引用，等等。一直到 `$4`，你可以尝试一些相关操作(例如: `$1.appendChild($0)`)

**$和$$：** `$` 在 `console` 中是串函数 `document.querySelector` 的别名。

​               `$$` 不仅执行 `document.QuerySelectorAll` 并且它返回：一个节点的 **数组** ，而不是一个 `Node list`

本质上来说 `Array.from(document.querySelectorAll('div')) === $$('div')` ，但是`document.querySelectorAll('div')` 和 `$$('div')` 哪一种方式更加优雅呢？

**$_：**`$_` 是对上次执行的结果的 **引用** 

**$i：**在 `Dev Tools` 里面使用 `npm` 插件，有时你只是想玩玩新出的 `npm` 包，现在不用再大费周章去建一个项目测试了，只需要在 [Chrome插件:Console Importer](https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related) 的帮助之下，快速的在 `console` 中引入和测试一些 `npm` 库。

运行 `$i('lodash')` 或者 `$i('moment')` 几秒钟后，你就可以获取到 `lodash / momentjs` 了。



# 异步的 console

console 默认就被 async 包裹，可直接使用 `await`



## 断点调试

**条件断点：**

- 右击行号，选择 `Add conditional breakpoint...(添加条件断点)；
- 或者右击一个已经设置的断点并且选择 `Edit breakpoint(编辑断点)`；
- 然后输入一个执行结果为 `true` 或者 `false` 的表达式（它的值其实不需要完全为 `true` 或者 `false` 尽管那个弹出框的描述是这样说的）。

在这个表达式中你可以使用任何这段代码可以获取到的值（当前行的作用域），如果条件成立，这个断点就会暂停代码的执行。

**忍者打印：**

- 每一个条件都必须经过判断 - 当应用执行到这一行的时候进行判断；
- 并且如果条件返回的是 `falsy` 的值(这里的 `falsy`并非是笔误，`falsy` 指的是被判定为 `false` 的值，例如 `undefined` )，它并不会暂停

与其在你的源码的不同地方去添加 `console.log` / `console.table` / `console.time` 等等，不如你直接使用条件判断来将它们“连接”到 `Source` 面板中。 这样的话，它们会一直执行，并且当你不再需要它们的时候，在 `Breakpoints section` 会清晰的列出它们。点两下鼠标你就可以把所有的都移除，就像一堆忍者一样突然消失！

![img](https://user-gold-cdn.xitu.io/2018/12/17/167b955a1f0311fc?imageslim)



# 自定义格式转换器

大多数的情况下，我们习惯使用 `DevTools` 的 `console` 默认对 `object` 的转换，但有时候我们想用与众不同的方式来处理。 那我们就可以自定义输出对象的函数，它通常被称为 `Custom Formatter` 

> 请注意: 在我们写一个之前，需要在 `DevTools` 进行设置 (在 `DevTools` 的 `⋮` 下拉框找到设置，或者按下 `F1` ) 中把对应的设置打开。

`formatter` 长什么样呢？ 它是一个对象，最多包含三个方法：

- `header` : 处理如何展示在 `console` 的日志中的主要部分。
- `hasbody` : 如果你想显示一个用来展开对象的 `▶` 箭头，返回 `true`
- `body` : 定义将会被显示在展开部分的内容中。

一个基础的自定义 `formatter`

![img](https://user-gold-cdn.xitu.io/2018/12/14/167abc4fbd4b892f?imageView2/0/w/1280/h/960/ignore-error/1)

`header` 方法返回了一个 [JsonML](http://www.jsonml.org/) (注： `JsonML` : `JSON Markup Language` - `JSON` 标记语言) 数组，由这些组成：

1. 标签名
2. 属性对象
3. 内容 (文本值或者其他元素)

现有好几种 `custom formatter` 可供选择，例如：你可以在这个 [immutable-devtools ](https://github.com/andrewdavey/immutable-devtools) 仓库中找到对于 [Immutable.js](https://facebook.github.io/immutable-js/)  结构的完美展示。同样可以自己造一个。

一般来说，每当你遇到结构不寻常的对象时，或大量的日志(最好避免这样的情况，但是有时候很有用)而你想从中做区分时，你可以采用 `custom formatter` 来处理。

一个很实用的窍门：直接将你不关心，不需要区别对待的对象过滤出来，直接在 `header` 方法里面 `return null`。让 `DevTools` 使用默认的格式化方式来处理这些值。

这是一个关于 `console` 的蠢萌例子：它叫做 `console.clown()` :将打印对象进行转换，而且在对象前面加上一个 `emoji` 表情 。



# 对象&方法

**`queryObjects` （对象查询）方法：**

假如我们有这样一段代码，我们在里面定义了一些对象。

如何知道在 **特定的时刻** + **特定的执行上下文** 有哪些对象呢？

`DevTools` 里的 `queryObjects` 函数可以展示这些信息。

用法：queryObjects(该对象)

![img](https://user-gold-cdn.xitu.io/2018/12/18/167c07a88ed68f7f?imageslim)

**`monitor` （镜像）方法：**

`monitor` 是 `DevTools` 的一个方法， 它能够让你 `“潜入”` 到任何 `_function calls(方法的调用)` 中：每当一个 `被潜入` 的方法运行的时候，`console 控制台` 会把它的实例打印出来，包含 **函数名** 以及 **调用它的参数** 。

用于监听某一个方法被调用的情况

![img](https://user-gold-cdn.xitu.io/2018/12/18/167c07a88ddad8cb?imageslim)

**`monitorEvents` （镜像事件）方法：**

使用  `monitorEvents()` 侦听特定类型的事件。

使用  `unmonitorEvents()` 停止侦听。

![img](https://user-gold-cdn.xitu.io/2018/12/20/167c99eb0734d2f9?imageslim)

**`getEventListeners()`：** 

获取 DOM 元素的侦听器，返回值是一个对象，其包含每个注册的事件类型（例如，`click` 或 `keydown`）数组。



**查看在 DOM 元素上注册的事件侦听器：**

默认情况下，Elements Inspector 中的 *Event Listeners* 面板显示附加到页面的所有事件：

![Event listeners 面板](https://developers.google.cn/web/tools/chrome-devtools/console/images/events-eventlisteners_panel.png?hl=zh-cn)

