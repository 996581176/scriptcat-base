import { Optimizer } from "@parcel/plugin";

import type { ConfigResultWithFilePath } from "@parcel/types/lib/index";

type MyConfig = {
  [key: string]: string | string[] | UserConfig;
  UserConfig: UserConfig;
};

type UserConfig = {
  /** 配置组 */
  [key: string]: {
    /** 配置组中的配置项 */
    [key: string]: {
      /** 配置的标题 */
      title: string;
      /** 配置的描述内容 */
      description?: string;
      /** 选项类型,如果不填写会根据数据自动识别 */
      type?:
        | "text"
        | "checkbox"
        | "select"
        | "mult-select"
        | "number"
        | "textarea";
      /** 配置的默认值 */
      default?: string | boolean;
      /** 文本最短2个字符 */
      min?: number;
      /** 文本最长18个字符 */
      max?: number;
      /** 设置为密码 */
      password?: boolean;
      values?: number[];
      /** 动态显示绑定的values,值是以$开头的key,value需要是一个数组 */
      bind?: string;
      /** 表示单位 */
      unit?: string;
    };
  };
};

export default new Optimizer({
  async loadConfig({ config }) {
    const { contents } =
      (await config.getConfig<MyConfig>([process.cwd() + "\\meta.json"])) ||
      ({} as Partial<ConfigResultWithFilePath<MyConfig>>);
    return contents;
  },
  async optimize({ contents, map, config }) {
    if (config) {
      let strArr: string[] = [];
      let userConfigArr: string[] = [];
      strArr.push("// ==UserScript==");
      Object.entries(config).forEach(([key, value]) => {
        if (key === "UserConfig") {
          // 用户配置
          userConfigArr = handleUserScript(value as UserConfig);
          userConfigArr.unshift("/* ==UserConfig==");
          userConfigArr.push("==/UserConfig== */");
        } else {
          // 描述文档
          if (Array.isArray(value)) {
            value.forEach((item) => {
              strArr.push(`// @${key}${generateSpace(14 - key.length)}${item}`);
            });
          } else {
            strArr.push(`// @${key}${generateSpace(14 - key.length)}${value}`);
          }
        }
      });
      strArr.push("// ==/UserScript==\n\n");
      if (
        Object.keys(config).includes("@crontab") ||
        Object.keys(config).includes("@background")
      ) {
        // 后台/定时任务
        contents = `${userConfigArr.join(
          "\n"
        )}\nreturn new Promise((resolve, reject) => {\n${contents}resolve();\n});`;
      } else {
        // 普通脚本
        contents = `${userConfigArr.join(
          "\n"
        )}\n(function () {\n${contents}})();`;
      }
      contents = strArr.join("\n") + contents;
    }
    return {
      contents,
      map,
    };
  },
});

/** 生成空格 */
function generateSpace(length: number) {
  let str = "";
  for (let index = 0; index < length; index++) {
    str += " ";
  }
  return str;
}

/** 处理用户配置脚本 */
function handleUserScript(data: UserConfig) {
  const arr: string[] = [];
  Object.entries(data).forEach(([key, value]) => {
    // 配置组
    arr.push(`${key}:`);
    Object.entries(value).forEach(([key, value]) => {
      // 配置组中的配置项
      arr.push(`    ${key}:`);
      Object.entries(value).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          arr.push(`        ${key}: [${value.join(",")}]`);
        } else {
          arr.push(`        ${key}: ${value}`);
        }
      });
    });
  });
  return arr;
}
