# 对象与组件

* 对象: Properties、Methods、Inherit
* 组件: Properties、Methods、Inherit、Attribut、Config & state、Event、Lifecycle、Children

# Attribute & Property

* Attribute 强调描述性 、Property 强调从属关系
* Attribute可在标记语言和js中更改，Property只能在js中设置
*
> Attribute:
    class、
    style(键值对)、
    href、
    value
  Property:
    className、
    style(对象)、
    href(resolve过的结果,通过getAttribute获取的跟html中一致)、
    value(设置过一次后，attribute不会再变,会失效,只会改变property)

# 如何设计组件状态

|Markup set| Js set| JS Change| User Input Change|  |
|:---:|:---:|:---:|:---:|:---:|
| no | yes | yes| ? |property|
| yes | yes | yes| ? |attribute|
| no | no | no | yes |state|
| no | yes | no | no |config|
