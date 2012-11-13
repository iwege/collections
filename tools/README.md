# 便携式书签修改版 
====================

* 出处：[小工具 - 便携式书签 by hutia](http://bbs.blueidea.com/thread-3085921-1-1.html)
* 更新记录 
  * [2012.11.08]修改于经典论坛的hutia版本。该修改版本实现了在线修改和导出。使得copy代码更加容易方便。
* 代码简析：
  * Javascript当中的outerHTML会导致回车不见，所以使用了textContent去获取style,script,textContent的内容。内容更新方面也是将Textarea里面的内容更改为innerHTML，这样才能保存具体的格式。其他的核心代码还是hutia的代码。

