/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-08 09:57:03
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-07 13:11:37
 */
/* eslint-disable no-unused-vars */

type PublicProps<T, U = object> = Readonly<T> & U;

// 当前 vue props
export type Props = PublicProps<object>;
