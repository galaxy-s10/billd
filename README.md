# billd 私有仓库

安装或者发布@billd/\*项目时，需要先配置 registry：

**yarn**

```
yarn config set @billd:registry http://registry.hsslive.cn/
```

**npm**

```
npm config set @billd:registry http://registry.hsslive.cn/
```

registry 的地址是由[verdaccio](https://verdaccio.org)搭建，地址：[http://registry.hsslive.cn/](http://registry.hsslive.cn/)可直接访问

# 发布 registry

> 只会发布 registry，不会发布远程的 github 仓库

```sh
pnpm run release:local
```

# 发布 registry 和 github

> 发布 registry 且发布远程的 github 仓库

```sh
pnpm run release
```
