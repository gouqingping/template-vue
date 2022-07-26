/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-09-26 15:47:22
 * @LastEditors  : Pat
 * @LastEditTime : 2022-05-09 10:58:33
 */
import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Login from '../src/view/Login/index.vue';
const wrapper = mount(Login);
test('输入用户信息', async () => {
	const vm = wrapper.vm;
	vm.ues.username = 'asdasda';
	vm.ues.password = 'asdasda';
});

test('用户登录', async () => {
	await wrapper.find('button.Login').trigger('click');
	expect(wrapper.vm.iLogin);
});
