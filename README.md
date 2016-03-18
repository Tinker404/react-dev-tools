## React + Webpack 工具
	
### 使用的技术
##### 工具类
+ Webpack
+ Babel
+ Less
+ Browsersync

### 如何使用
下载此项目后
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
另: 由于没有使用Html Webpack Plugin,而是用Copy Webpack Plugin来移动HTML,在APP文件夹中的HTML会引入了app.css文件,导致在DEV中报错,但是生产环境中无碍,强迫症患者请自行书写HTML Webpack plugin解决
