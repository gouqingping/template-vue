<!--
 * @Autor        : GGos
 * @Description  : LottieWEB
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-09 11:48:00
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-09 11:48:00
-->

# LottieWEB

用来控制动画播放的道具

## 按需引入

```JavaScript
import { createApp } from "vue";
import App from "./App.vue";
import LottieWEB from '_common/containers/LottieWEB';
import error from '@assets/error.json';

const app = createApp(App);
app.use(LottieWEB);
app.mount("#app");
```

## 代码演示

-   通过 `dataSource` 来加载动画播放的 json

包括导入的动画数据或从资源文件夹导入文件的 require 语句 （.json）

```vue demo
<template>
	<LottieWEB :dataSource="error"></LottieWEB>
</template>
```

-   通过 `loop` 控制动画播放样式，连续循环 `loop` 为 `false`、 动画只播放次数
    `loop` 为数字 、 动画在停止前播放 N 次（传递一个整数）

```vue demo
<template>
	<LottieWEB :dataSource="error" :loop="false"></LottieWEB>
</template>
```

-   通过 `autoPlay` 控制动画自动播放样式

```vue demo
<template>
	<LottieWEB :dataSource="error" autoPlay></LottieWEB>
</template>
```

-   通过 `speed` 控制动画播放的速度

```vue demo
<template>
	<LottieWEB :dataSource="error" :speed="1"></LottieWEB>
</template>
```

## API

### 参数

| 参数       | 说明                 | 类型               | 可选值 | 必填  | 默认值  |
| ---------- | -------------------- | ------------------ | ------ | ----- | ------- |
| dataSource | 加载动画播放的 json  | `object`           | `-`    | `yes` | `-`     |
| loop       | 控制动画播放样式     | `Boolean`/`Number` | `-`    | `-`   | `false` |
| autoPlay   | 控制动画是否自动播放 | `Boolean`          | `-`    | `-`   | `true`  |
| speed      | 控制动画播放的速度   | `Number`           | `-`    | `-`   | `1`     |
