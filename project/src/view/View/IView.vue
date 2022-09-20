<!--
 * @Autor        : GGos
 * @Description  : IView
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-07 14:36:39
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-09 15:48:48
-->
<template>
	<IView :src="currentRoute.query.replace" class="view"></IView>
</template>
<script lang="ts" setup>
// import { state } from '@store';
import { useRouter } from 'vue-router';
import IView from '_common/components/IVeiw';
const { currentRoute } = useRouter();
//  state?.route?.iViewPath || currentRoute.query.replace
</script>
<style lang="scss" scoped>
.view {
	height: calc(100vh - var(--default-header-height) - var(--default-spacing));
}
</style>
