#Vue练习
###主要用到的技术
* vue.2
* vuex 2
* vue-router2
* webpack2
* sass

###引用
[VueDemo_Sell_Eleme](https://github.com/SimonZhangITer/VueDemo_Sell_Eleme)
###不同

1. 原作者利用一个Vue实例作为eventHub来处理组件间的交互，小弟引入了vuex
2. 原文的列表只能通过左侧导航控制，不能滑动，对此进行了处理，自己写了个小插件[v-scroll-list]((https://github.com/OliverY1992/v-scroll-list)
3. 没有使用vue-cli和webpack-dev-server，用koa写了一个测试服务器，支持热替换，下一步更好测试SSR

###运行
* `npm run devServer //运行测试服务器`
* `npm run build //打包`