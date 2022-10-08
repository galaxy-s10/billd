# 私有仓库

安装@billd/\*项目时，需要先配置 registry：

**yarn**

```
yarn config set @billd:registry http://registry.hsslive.cn/
```

**npm**

```
npm config set @billd:registry http://registry.hsslive.cn/
```

registry 的地址是由[verdaccio](https://verdaccio.org)搭建，地址：[http://registry.hsslive.cn/](http://registry.hsslive.cn/)可直接访问

项目发布的地址也会是在[http://registry.hsslive.cn/](http://registry.hsslive.cn/)上，需要自行配置发布地址

## 开发

当新增或者修改扩展时，使用`lerna publish`进行发布，此时需要设置版本号，版本号的规范严格遵循`semver`规范，具体可[参考这里](https://semver.org/spec/v2.0.0.html)

# test
