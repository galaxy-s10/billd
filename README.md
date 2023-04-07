# billd 私有仓库

项目使用了[lerna.js](https://lerna.js.org)管理，项目组织叫@billd

registry 的地址是由[verdaccio](https://verdaccio.org)搭建，地址：[https://registry.hsslive.cn/](https://registry.hsslive.cn/) 可直接访问

| 包名                                                                            | 简介                    |
| ------------------------------------------------------------------------------- | ----------------------- |
| [@billd/cli](https://registry.hsslive.cn/-/web/detail/@billd/cli)               | 拉取项目模板的脚手架    |
| [@billd/utils](https://registry.hsslive.cn/-/web/detail/@billd/utils)           | 通用 js 方法            |
| [@billd/components](https://registry.hsslive.cn/-/web/detail/@billd/components) | 通用 js 组件            |
| [@billd/hooks](https://registry.hsslive.cn/-/web/detail/@billd/hooks)           | react hooks             |
| [@billd/ui](https://registry.hsslive.cn/-/web/detail/@billd/ui)                 | vue2 组件库（暂未迁移） |

> 注意：目前虽然私有仓库的服务器是公开的，但是配置了最大用户数为 1（即只有我一个用户），其他人注册不了用户，但可以下载这个私服的包~

# 配置

安装或者发布@billd/\*项目时，需要先配置 registry：

**yarn**

```
yarn config set @billd:registry https://registry.hsslive.cn/
```

**npm**

```
npm config set @billd:registry https://registry.hsslive.cn/
# or
npm set @billd:registry https://registry.hsslive.cn/
```

**pnpm**

```
pnpm set registry https://registry.hsslive.cn/
```

# 发布

> 发布会触发 lerna-changelog 生成日志，它会读取远程仓库的 pull request 生成 changelog，该过程需要配置 [github 的 token](https://github.com/settings/tokens)，请获取了 token 后，直接在终端控制台输入：`export GITHUB_AUTH="xxxxxxxxxxxx"` 回车，然后再进行发布。

## 发布到私有服务器

> 只会发布私有服务器，不会同步到远程的 github 仓库

```sh
pnpm run release:local
```

## 发布到私有服务器 和 github

> 会发布到私有服务器，而且会同步到远程的 github 仓库

```sh
pnpm run release
```

# 取消发布某个包

```sh
# 取消这个包的0.0.1版本
npm unpublish @billd/ui@0.0.1
# 取消这个包的所有版本
npm unpublish @billd/ui -f
```
