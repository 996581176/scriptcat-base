## 说明
支持后台脚本和定时脚本

## 安装依赖

```bash
yarn
```

## 配置文件

`meta.json`文件配置脚本注释头的方式，字段值可以是字符串或字符串类型数组。支持设置用户配置项。

```json
{
  "name": "screeps-chinese-pack",
  "namespace": "http://tampermonkey.net/",
  "version": "1.3",
  "description": "用于汉化 screeps.com 网站的油猴脚本",
  "author": "NorthEgg",
  "match": "https://screeps.com/*",
  "grant": "none",
  "crontab": "30 9,11,15,19 * * *",
  "license": "MIT",
  "UserConfig": {
    "group1": {
      "configA": {
        "title": "配置A",
        "description": "这是一个文本类型的配置",
        "type": "text",
        "default": "默认值",
        "min": 2,
        "max": 18,
        "password": true
      },
      "configB": {
        "title": "配置B",
        "description": "这是一个选择框的配置",
        "type": "checkbox",
        "default": true
      },
      "configC": {
        "title": "配置C",
        "description": "这是一个列表选择的配置",
        "type": "select",
        "default": 1,
        "values": [1, 2, 3, 4, 5]
      },
      "configD": {
        "title": "配置D",
        "description": "这是一个动态列表选择的配置",
        "type": "select",
        "bind": "$cookies"
      },
      "configE": {
        "title": "配置E",
        "description": "这是一个多选列表的配置",
        "type": "mult-select",
        "default": [1],
        "values": [1, 2, 3, 4, 5]
      },
      "configF": {
        "title": "配置F",
        "description": "这是一个动态多选列表的配置",
        "type": "mult-select",
        "bind": "$cookies"
      },
      "configG": {
        "title": "配置G",
        "description": "这是一个数字的配置",
        "type": "number",
        "default": 1,
        "min": 10,
        "max": 16,
        "unit": "分"
      },
      "configH": {
        "title": "配置H",
        "description": "这是一个长文本类型的配置",
        "type": "textarea",
        "default": "默认值"
      }
    },
    "group2": {
      "configX": {
        "title": "配置X",
        "description": "这是一个文本类型的配置",
        "default": "默认值"
      }
    }
  }
}
```

## 目录结构

### plugin 

plugin 目录为插件目录，src为插件源码，lib为编译后的插件，本仓库包含的插件已经预编译好。

### src

src目录为脚本目录，入口文件为`main.ts`

### npm脚本

`start`：parcel 开发服务

`build`：parcel 构建

`watch`：parcel文件监听

`buildPlugin`：编译插件目录下所有插件
