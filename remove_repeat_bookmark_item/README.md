# 简单的解析并移除Chrome 书签当中的重复项（试验版）
=========================================
* 通过dom来解析 netscape的bookmark标准。
* 在console里面输出netscape的bookmark标准格式，保存为一个html文件既可导入
* 注意：netscape的bookmark标准要求缩进严格，所以增加了很多格式化的东西保证最终输出是可用的。
* 只能简单的移除同目录下面相同路径的条目。