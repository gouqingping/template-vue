<!--
 * @Autor        : GGos
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-07 15:21:26
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 16:33:15
-->
<template>
	<Header :name="systemName" :image="logo">
		<ESpace direction="horizontal" class="web-portal-header--horizontal">
			<template v-if="navs.length > 0">
				<div v-for="nav in navs" :key="nav.path">
					<Dropdown v-if="nav?.children && nav?.children.length > 0">
						<span class="el-pointer" @click.prevent>
							{{ nav.name }}
						</span>
						<template #overlay>
							<Menu>
								<MenuItem
									v-for="item in nav?.children"
									:key="item.path"
								>
									<SubMenus
										v-if="
											item?.children &&
											item?.children.length > 0
										"
										:keys="item.path"
										:dataSource="item?.children"
										:name="item.name"
										@toPath="toPath"
									></SubMenus>
									<MenuItem v-else :key="item.path">
										<span
											class="el-pointer"
											@click="toPath(item)"
										>
											{{ item.name }}
										</span>
									</MenuItem>
								</MenuItem>
							</Menu>
						</template>
					</Dropdown>
					<div v-else @click="toPath(nav)">
						<span class="el-pointer">{{ nav.name }}</span>
					</div>
				</div>
			</template>
		</ESpace>
		<div class="web-use-login-btn">登录</div>
	</Header>
	<Content>
		<RouterView></RouterView>
	</Content>
	<Footer>
		<Row
			v-if="footer?.describe"
			class="web-footer--text el-flex el-flex-center"
		>
			<Col
				:span="16"
				style="margin-bottom: calc(var(--default-spacing) * 2)"
			>
				{{ footer?.describe || '' }}
			</Col>
		</Row>
		<Row
			v-if="footer?.contact || footer?.address || footer?.post"
			class="web-footer--text el-flex el-flex-center"
		>
			<Col v-if="footer?.contact" :span="8">
				联系电话: {{ footer?.contact || '' }}
			</Col>
			<Col v-if="footer?.address" :span="8">
				地址: {{ footer?.address || '' }}
			</Col>
			<Col v-if="footer?.post" :span="8">
				邮编: {{ footer?.post || '' }}
			</Col>
		</Row>
		<Row
			v-if="footer?.copyright || footer?.recordNo"
			class="web-footer--text el-flex el-flex-center"
		>
			<Col :span="16">
				{{ footer?.copyright || '' }}
				{{ footer?.recordNo || '' }}
			</Col>
		</Row>
	</Footer>
</template>
<script lang="ts" setup>
import './index.scss';
import { RouterView } from 'vue-router';
import { state } from '@store';
import Row from 'ant-design-vue/es/row';
import Col from 'ant-design-vue/es/col';
import Header from '@components/Header';
import Content from '@components/Content';
import Footer from '@components/Footer';
import ESpace from 'ant-design-vue/lib/space';
import { replacePath } from '_common/utils';
import { Dropdown, Menu, MenuItem } from 'ant-design-vue';
import SubMenus from './ISubMenu.vue';
import { useRouter } from 'vue-router';
import { AnyObject } from 'igu/lib/core/utils';

import { getSysPage, SysPage, SysFooterInterface } from '@api/core/sys';
import { onMounted, ref, Ref } from 'vue';

const logo = ref('');
const systemName = ref(state.sys.base.systemName);

const footer: Ref<SysFooterInterface> = ref<SysFooterInterface>({
	address: '',
	email: '',
	post: '',
	contact: '',
	copyright: '',
	recordNo: '',
	describe: '',
});

const router = useRouter();

const toPath = ({ path }: { [k: string]: any }) => {
	if (replacePath(path).indexOf('http') > -1) {
		router.replace({ path: '/view', query: { replace: path } });
	} else {
		router.replace({ path });
	}
};
const navs: Ref<AnyObject[]> = ref([
	{
		name: '首页',
		path: '/',
		icon: '',
		children: [],
	},
	{
		name: '高德地图',
		path: 'https://amap.com/',
		icon: '',
		children: [
			{
				name: '专题服务5',
				path: 'https://amap.com/6',
				icon: '',
			},
			{
				name: '地图服务6',
				path: 'https://amap.com/7',
				icon: '',
			},
		],
	},
	{
		name: '开发者中心',
		path: '/',
		icon: '',
		children: [],
	},
]);

onMounted(() => {
	getSysPage().then(({ foot, header }: SysPage) => {
		logo.value = header?.image
			? `${state?.sys?.image?.REQUEST_URL || ''}${header?.image}`
			: '';
		systemName.value = header?.name || '';
		footer.value = foot || ({} as SysFooterInterface);
	});
});
</script>
