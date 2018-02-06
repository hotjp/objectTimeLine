# objectTimeLine 

[![Build Status](https://travis-ci.org/hotjp/objectTimeLine.svg?branch=master)](https://travis-ci.org/hotjp/objectTimeLine)

objectTimeLine是针对javascript中JSON对象的浏览器端自动保存修改历史的工具

项目中经常搭建B/S结构的编辑工具，包括数据可视化，页面构建工具等，当前的用户配置经常因为刷新，关闭网页或者bug导致丢失，
所以一般会增加一个历史记录工具，包括前进后退等C/S软件的功能。objectTimeLine就是针对经常变化的object对象进行快照并在locastorage或者任何你喜欢的地方备份数据
并可以提供一个自定义长度的存在内存中的快照列表（建议不要丢dom进去，注意内存占用）

