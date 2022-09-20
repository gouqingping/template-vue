<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-08-19 17:40:48
 * @LastEditors  : Pat
 * @LastEditTime : 2022-08-22 15:30:40
-->

# Header

顶部布局，自带默认样式，其下可嵌套右边信息

### 参数说明 （Props）

| 参数 | 说明     | 类型       | 必填 | 可选值 | 默认值 |
| :--- | :------- | :--------- | :--- | :----- | :----- |
| name | 系统名称 | string     | yes  | -      | -      |
| navs | 右边菜单 | MenuType[] | -    | -      | -      |

#### MenuType

| 参数 | 说明     | 类型   | 必填 | 可选值 | 默认值 |
| :--- | :------- | :----- | :--- | :----- | :----- |
| name | 菜单名称 | string | yes  | -      | -      |
| key  | 路由地址 | string | yes  | -      | -      |

### 引用

```javascript
import Header from '@components/Header';
```

### 组件调用

```html
// 组件模式调用
<header name="门户"></header>
```
