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
另: 由于没有使用Html Webpack Plugin,而是用Copy Webpack Plugin来移动HTML(为了不使单页面的朋友),会在开发中出现app.css读取失败的报错,实际上我们在打包的时候才会把css文件分离出js,开发模式中css样式是在js中的,生产环境中无碍,强迫症患者请自行书写HTML Webpack plugin解决
