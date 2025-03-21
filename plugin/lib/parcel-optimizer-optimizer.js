"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = require("@parcel/plugin");
exports.default = new plugin_1.Optimizer({
    loadConfig: function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var contents;
            var config = _b.config;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, config.getConfig([process.cwd() + "\\meta.json"])];
                    case 1:
                        contents = ((_c.sent()) ||
                            {}).contents;
                        return [2, contents];
                }
            });
        });
    },
    optimize: function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var strArr_1, userConfigArr_1;
            var contents = _b.contents, map = _b.map, config = _b.config;
            return __generator(this, function (_c) {
                if (config) {
                    strArr_1 = [];
                    userConfigArr_1 = [];
                    strArr_1.push("// ==UserScript==");
                    Object.entries(config).forEach(function (_a) {
                        var _b = __read(_a, 2), key = _b[0], value = _b[1];
                        if (key === "UserConfig") {
                            userConfigArr_1 = handleUserScript(value);
                            userConfigArr_1.unshift("/* ==UserConfig==");
                            userConfigArr_1.push("==/UserConfig== */");
                        }
                        else {
                            if (Array.isArray(value)) {
                                value.forEach(function (item) {
                                    strArr_1.push("// @".concat(key).concat(generateSpace(14 - key.length)).concat(item));
                                });
                            }
                            else {
                                strArr_1.push("// @".concat(key).concat(generateSpace(14 - key.length)).concat(value));
                            }
                        }
                    });
                    strArr_1.push("// ==/UserScript==\n\n");
                    if (Object.keys(config).includes("crontab") ||
                        Object.keys(config).includes("background")) {
                        contents = "".concat(userConfigArr_1.join("\n"), "\nreturn new Promise(async (resolve, reject) => {\n").concat(contents, "resolve();\n});");
                    }
                    else {
                        contents = "".concat(userConfigArr_1.join("\n"), "\n(function () {\n").concat(contents, "})();");
                    }
                    contents = strArr_1.join("\n") + contents;
                }
                return [2, {
                        contents: contents,
                        map: map,
                    }];
            });
        });
    },
});
function generateSpace(length) {
    var str = "";
    for (var index = 0; index < length; index++) {
        str += " ";
    }
    return str;
}
function handleUserScript(data) {
    var arr = [];
    Object.entries(data).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        arr.push("".concat(key, ":"));
        Object.entries(value).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            arr.push("    ".concat(key, ":"));
            Object.entries(value).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                if (Array.isArray(value)) {
                    arr.push("        ".concat(key, ": [").concat(value.join(","), "]"));
                }
                else {
                    arr.push("        ".concat(key, ": ").concat(value));
                }
            });
        });
    });
    return arr;
}
