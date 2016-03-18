## React + Webpack 工具
	
### 如何使用
clone后运行
```
npm i
npm run dev
```
访问 localhost:8080 即可进行调试,已集成HMR,不刷新页面即可看到修改的结果


如需手机调试,请运行
```
npm run phone
```


构建生产环节文件
```
npm run build
```

注: 在webpack.config.js中更改MoveFiles可以移动你要的静态资源
```
var MoveFiles = new CopyWebpackPlugin([
    {from: './app/index.html', to: './'},
    {from: './app/img', to: './img'}
])
```
另: 本工具没有使用Html Webpack Plugin,而只是用Copy Webpack Plugin来移动HTML文件
