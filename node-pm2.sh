#!/usr/bin/env bash
###
# Author: shuisheng
# Date: 2022-04-26 01:54:48
# Description: https://github.com/galaxy-s10/sh/blob/master/pm2.sh
# Email: 2274751790@qq.com
# FilePath: /billd/node-pm2.sh
# Github: https://github.com/galaxy-s10
# LastEditTime: 2023-04-08 03:39:41
# LastEditors: shuisheng
###

# 生成头部文件快捷键：ctrl+cmd+i

# 静态部署的项目，一般流程是在jenkins里面执行build.sh进行构建，
# 构建完成后会连接ssh，执行/node/sh/frontend.sh，frontend.sh会将构建的完成资源复制到/node/xxx。
# 复制完成后，frontend.sh会执行清除buff/cache操作

# node项目，一般流程是在jenkins里面执行build.sh进行构建，
# 构建完成后会连接ssh，执行/node/sh/node.sh，node.sh会将构建的完成资源复制到/node/xxx，并且执行/node/xxx/pm2.sh。
# 最后，node.sh会执行清除buff/cache操作

# 注意:JOBNAME=$1,这个等号左右不能有空格！
JOBNAME=$1      #约定$1为任务名
ENV=$2          #约定$2为环境
WORKSPACE=$3    #约定$3为Jenkins工作区
PORT=$4         #约定$4为端口号
TAG=$5          #约定$5为git标签
PUBLICDIR=/node #约定公共目录为/node

echo 删除node_modules:
rm -rf node_modules

echo 查看node版本:
node -v

echo 查看npm版本:
npm -v

echo 设置npm淘宝镜像:
npm config set registry https://registry.npm.taobao.org/

echo 查看当前npm镜像:
npm get registry

if ! type pnpm >/dev/null 2>&1; then
  echo 'pnpm未安装,先全局安装pnpm'
  npm i pnpm -g
else
  echo 'pnpm已安装'
fi

echo 查看pnpm版本:
pnpm -v

echo 设置pnpm淘宝镜像:
pnpm config set registry https://registry.npm.taobao.org/
pnpm config set @billd:registry https://registry.hsslive.cn/

echo 查看当前pnpm镜像:
pnpm config get registry
pnpm config get @billd:registry

if ! type pm2 >/dev/null 2>&1; then
  echo 'pm2未安装,先全局安装pm2'
  npm install pm2 -g
  pm2 update
else
  echo 'pm2已安装'
fi

echo 查看pm2版本:
pm2 -v

# 注意：要先进入项目所在的目录，然后再执行pm2命令!!!
# 否则的话约等于在其他目录执行npm run dev,如果所在的目录没有package.json文件就会报错！
if [ $ENV != 'null' ]; then
  echo 当前环境:$ENV
  cd $PUBLICDIR/$JOBNAME/$ENV
else
  echo 当前环境是null
  cd $PUBLICDIR/$JOBNAME
fi

echo 开始安装依赖:
pnpm install

echo 删除旧的pm2服务:
pm2 del $JOBNAME-$ENV-$PORT

# WARN，测试
# sh pm2.sh vue3-blog-serve beta workspace 3300 v0.0.1
# sh pm2.sh vue3-blog-serve prod workspace 3200 v0.0.1

echo 使用pm2维护:
# pm2 start ./src/index.ts --name $JOBNAME-$ENV --interpreter ./node_modules/.bin/nodemon

# npx cross-env NODE_APP_RELEASE_PROJECT_NAME=JOBNAME NODE_APP_RELEASE_PROJECT_ENV=prod NODE_APP_RELEASE_PROJECT_PORT=3200 pm2 start ./dist/index.js --name vue3-blog-server-beta-3200
# npx cross-env NODE_APP_RELEASE_PROJECT_NAME=JOBNAME NODE_APP_RELEASE_PROJECT_ENV=beta NODE_APP_RELEASE_PROJECT_PORT=3300 pm2 start ./dist/index.js --name vue3-blog-server-beta-3300
npx cross-env NODE_APP_RELEASE_PROJECT_NAME=$JOBNAME NODE_APP_RELEASE_PROJECT_ENV=$ENV NODE_APP_RELEASE_PROJECT_PORT=$PORT pm2 start

# yarn和pnpm都能用
# npx cross-env NODE_APP_RELEASE_PROJECT_NAME=$JOBNAME NODE_APP_RELEASE_PROJECT_ENV=$ENV NODE_APP_RELEASE_PROJECT_PORT=$PORT pm2 start ./src/index.ts --name $JOBNAME-$ENV-$PORT --interpreter ./node_modules/.bin/ts-node --interpreter-args '-P tsconfig.json'

# 在使用yarn时，下面的命令报错：[PM2][ERROR] Script not found: /Users/huangshuisheng/Desktop/hss/github/vue3-blog-server/ts-node
# cross-env NODE_APP_RELEASE_PROJECT_NAME=$JOBNAME NODE_APP_RELEASE_PROJECT_ENV=$ENV NODE_APP_RELEASE_PROJECT_PORT=$PORT pm2 start --name $JOBNAME-$ENV-$PORT ts-node -- -P tsconfig.json ./src/index.ts

# 在使用yarn时，下面的命令生效（和上面的命令相比只是差了一个npx）
# npx cross-env NODE_APP_RELEASE_PROJECT_NAME=$JOBNAME NODE_APP_RELEASE_PROJECT_ENV=$ENV NODE_APP_RELEASE_PROJECT_PORT=$PORT pm2 start --name $JOBNAME-$ENV-$PORT ts-node -- -P tsconfig.json ./src/index.ts

# 写死测试1，yarn和pnpm都能用
# npx cross-env NODE_APP_RELEASE_PROJECT_NAME=JOBNAME NODE_APP_RELEASE_PROJECT_ENV=beta NODE_APP_RELEASE_PROJECT_PORT=3300 pm2 start --name JOBNAME-beta-3300 --interpreter ./node_modules/.bin/ts-node --interpreter-args '-P tsconfig.json' ./src/index.ts

# 写死测试2，yarn和pnpm都能用
# npx cross-env NODE_APP_RELEASE_PROJECT_NAME=JOBNAME NODE_APP_RELEASE_PROJECT_ENV=beta NODE_APP_RELEASE_PROJECT_PORT=3300 pm2 start ./src/index.ts --name JOBNAME-beta-3300 --interpreter ./node_modules/.bin/ts-node --interpreter-args '-P tsconfig.json'
