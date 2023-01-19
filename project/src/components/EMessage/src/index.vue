<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-26 17:26:37
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-12 13:19:31
-->
<template>
	<!-- 按钮 -->
	<Transition v-if="messageState" name="slide-fade">
		<div
			v-show="messageState"
			:id="id"
			class="e-info-message"
			:class="[
				position,
				animation,
				`${animation}-animation`,
				`e-msg-${type}`,
				messageClass,
			]"
			:style="customStyle"
		>
			<div class="e-info-message--centent">
				<RenderVNode
					v-if="isVNode(message)"
					:vn="message"
				></RenderVNode>
				<span v-else>{{ message }}</span>
			</div>
		</div>
	</Transition>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, Ref, watchEffect, isVNode } from 'vue';
import { RenderVNode } from '@shared';
import { useProp, UseProps } from './props';
interface AnyObject {
	[key: string]: any;
}
export default defineComponent({
	name: 'Massge',
	components: { RenderVNode },
	props: useProp,
	setup(props: UseProps) {
		const { id, duration, time, onClose }: UseProps = props;
		const messageState: Ref<boolean> = ref(true),
			messageClass: Ref<string> = ref(''),
			timeout = (callback: (time?: number) => void, duration: number) =>
				setTimeout(callback, duration);
		const customStyle: any = ref();
		watchEffect(() => {
			const { position, offset, zIndex }: AnyObject = props;
			const currentStyle: AnyObject = { zIndex };
			currentStyle[position] = `${offset}px`;
			customStyle.value = currentStyle;
		});
		if (duration) {
			nextTick(() =>
				timeout(() => {
					messageClass.value = 'msg-out';
					timeout(() => onClose(id), 700);
				}, time),
			);
		}
		return {
			messageState,
			messageClass,
			id,
			customStyle,
			isVNode,
		};
	},
});
</script>
