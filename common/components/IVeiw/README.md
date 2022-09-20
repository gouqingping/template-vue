<!--
 * @Autor        : GGos
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-06 18:17:19
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-07 13:07:01
-->

# IView

## 按需引入

```JavaScript
import { createApp } from "vue";
import App from "./App.vue";
import IView from '_common/containers/IView';

const app = createApp(App);
app.use(IView);
app.mount("#app");
```

## 代码演示

```vue demo
<template>
	<IView :src="'http://amap.com'" />
</template>
```

## API

### 参数

| 参数 | 说明     | 类型     | 可选值 | 必填  | 默认值 |
| ---- | -------- | -------- | ------ | ----- | ------ |
| src  | 模版地址 | `string` | `-`    | `yes` | `-`    |
