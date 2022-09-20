<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-08-19 17:40:48
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-09 19:01:02
-->
<template>
	<div class="custom-banner">
		<Carousel autoplay arrows>
			<template #prevArrow>
				<div class="custom-slick-arrow" style="left: 10px; z-index: 1">
					<LeftCircleOutlined />
				</div>
			</template>
			<template #nextArrow>
				<div class="custom-slick-arrow" style="right: 10px">
					<RightCircleOutlined />
				</div>
			</template>
			<div
				v-for="item of dataSource"
				:key="item.name"
				class="custom-item"
				@click="toPath(item)"
			>
				<template v-if="item?.image">
					<LottieWEB
						v-if="isObject(item?.image) || isJson(item?.image)"
						class="custom-item--image"
						:dataSource="item?.image"
					></LottieWEB>
					<EImage
						v-else
						:src="item.image"
						class="custom-item--image"
					></EImage>
				</template>
				<div v-if="item?.name || item?.describe" class="custom-content">
					<div class="custom-content--main">
						<div class="custom-content--main__text">
							<ETypography
								:level="2"
								:title="item?.name || ''"
								:content="item?.describe || ''"
								:ellipsis="ellipsis"
								color="#999"
							></ETypography>
						</div>
						<EButton type="danger">查看详情</EButton>
					</div>
				</div>
			</div>
		</Carousel>
		<div class="custom-banner--information">
			<div class="custom-banner--information-content">
				<div class="custom-banner--information--title">
					<SoundFilled class="icon-style" />
					<span>平台动态</span>
				</div>
				<div class="custom-banner--information--main">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import './scss/index.scss';
import { Carousel } from 'ant-design-vue';
import {
	LeftCircleOutlined,
	RightCircleOutlined,
	SoundFilled,
} from '@elgis/ui-component/lib/EIcon';
import LottieWEB from '_common/containers/LottieWEB';
import { isObject } from 'igu/lib/core/basic';
import ETypography from '@elgis/ui-component/lib/ETypography';
import EImage from '@elgis/ui-component/lib/EImage';
import EButton from '@elgis/ui-component/lib/EButton';
import { PropType } from 'vue';
import { DataSourceInter } from './core/type';
const ellipsis = {
	rows: 2,
	expandable: false,
};
const isJson = (data: string) => data && data.match(/[^.]+$/)[0] == 'json';
const toPath = ({ url, jumpWay }: { [k: string]: any }) => {
	switch (jumpWay) {
		case '_self':
			open(url, '_self');
			break;

		case '_blank':
			open(url, '_blank');
			break;

		case '_top':
			window.open(
				url,
				'_blank',
				'scrollbars=yes,resizable=1,modal=true,alwaysRaised=yes',
			);
			break;
	}
};
defineProps({
	dataSource: {
		type: Array as PropType<DataSourceInter[]>,
		require: true,
	},
});
</script>
