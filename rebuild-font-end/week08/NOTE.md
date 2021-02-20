* computeCSS在`startTag`,对于:empty 、:nth-last-child()、 :last-child、:only-child无法在这一步中直接计算出来

* ::first-line无法像::first-letter一样支持block、float一类的属性，因为会背离原有定义，造成一些bug， 甚至问题无限循环。

* ::first-line改变字体，文字会逐个实施first-line属性样式，first-line满了后，超出部分脱离first-line，不会挂上first-line属性

* 标签Tag -> 源代码、 元素Element -> 语义、 盒Box -> 表现

> IFC：inline formatting context   BFC：block formatting context

* 行模型，行中的inline-box如果无文字内容，它的基线位置会偏移到盒底，一般会加vertical-align去设置基线位置，一般取(top、middle、bottom)

* 行模型中，以最高inline-box的基线为对齐方式，行高也是以最高元素为准(该子元素的行高超过这一行的行高的情况下)

* 如果一个元素是BFC，内部子元素不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

* block-level 表示可以被放入bfc

* block-container 表示可以容纳bfc

* block-box = block-level + block-container

* block-box 的overflow如果是visibale， block的bfc会和父级的合并

* block 和 inline-block 是block-container

* `flex` `table` `grid` `block` 是block-level-box

* 含正常流就会产生bfc,flex-item也会产生bfc

> 大家请记住下面这个表现原则：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。
block-level 表示可以被放入 bfc
block-container 表示可以容纳 bfc
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并
