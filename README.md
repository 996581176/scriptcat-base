## 安装依赖

```bash
yarn
```

## 配置文件

`meta.json`文件配置脚本注释头的方式，字段值可以是字符串或字符串类型数组。

```json
{
  "@name": "screeps-chinese-pack",
  "@namespace": "http://tampermonkey.net/",
  "@version": "1.3",
  "@description": "用于汉化 screeps.com 网站的油猴脚本",
  "@author": "NorthEgg",
  "@match": "https://screeps.com/*",
  "@grant": "none",
  "@license": "MIT"
}
```

## 目录结构

### plugin 

plugin 目录为插件目录，src为插件源码，lib为编译后的插件

### src

src目录为脚本目录，入口文件为`main.ts`

### npm脚本

`start`：parcel 开发服务

`build`：parcel 构建

`watch`：parcel文件监听

`buildPlugin`：编译插件目录下所有插件
