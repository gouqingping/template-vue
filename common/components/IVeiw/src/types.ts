/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-08 09:57:03
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-06 19:08:47
 */
/* eslint-disable no-unused-vars */

import { UseProps } from './props';

type PublicProps<T, U = UseProps> = Readonly<T> & U;

// 当前 vue props
export type Props = PublicProps<UseProps>;
