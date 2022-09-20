<!--
 * @Autor        : GGos
 * @Description  : IView
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-07 14:36:39
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 11:00:35
-->
<template>
	<IView :src="state?.route?.iViewPath || currentRoute.query.replace"></IView>
</template>
<script lang="ts" setup>
import { state } from '@config/store';
import { useRouter } from 'vue-router';
import IView from '_common/components/IVeiw';
const { currentRoute } = useRouter();
</script>
