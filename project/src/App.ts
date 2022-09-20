/*
 * @Autor        : Pat
 * @Description  : App Main
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-20 09:20:23
 * @LastEditors  : Pat
 * @LastEditTime : 2022-08-18 16:14:14
 */
import { createBlock, defineComponent, openBlock } from 'vue';
import { RouterView, useRoute } from 'vue-router';
// Initialization App main
// Vue tsx development model
export default defineComponent({
	name: 'App',
	setup() {
		return () => (
			openBlock(),
			createBlock(RouterView, {
				include: useRoute().name,
			})
		);
	},
});
