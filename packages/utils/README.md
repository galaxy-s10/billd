# 简介

开箱即用的 utils，纯 JavaScript 实现，无依赖！

# 安装

安装@billd/\*项目时，需要先配置 registry：

**yarn**

```
yarn config set @billd:registry http://registry.hsslive.cn/
```

**npm**

```
npm config set @billd:registry http://registry.hsslive.cn/
```

安装：

```sh
npm install @billd/utils
# or
yarn add @billd/utils
```

# 文档

http://project.hsslive.cn/billd-monorepo/modules/utils.html

# 使用

> 该库尚未发布 1.0 版本，api 可能会随时发生变化，请勿用于生产环境！

```ts
import { isBrowser } from '@billd/utils';

console.log(isBrowser());
```

# 在浏览器使用

> 该库尚未发布 1.0 版本，api 可能会随时发生变化，请勿用于生产环境！

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="https://unpkg.com/@billd/utils/index.min.js"></script>
    <script>
      console.log(BilldUtils.isBrowser());
    </script>
  </body>
</html>
```
