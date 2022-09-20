<template>
	<div ref="animation" style="width: 100%; height: 100%"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Lottie, {
	AnimationConfig,
	AnimationDirection,
	AnimationItem,
} from 'lottie-web';
import { useProp } from './props';
import { isObject } from 'igu/lib/core/basic';

const animation = ref<Element>();

const anim = ref<AnimationItem>();

const props = defineProps(useProp);

const emit = defineEmits<{
	(e: 'complete'): void;
	(e: 'loopComplete'): void;
	(e: 'enterFrame'): void;
	(e: 'segmentStart'): void;
	(e: 'stopped'): void;
}>();

const play = (): void => {
	if (anim.value) anim.value.play();
};

const stop = (): void => {
	if (anim.value) anim.value.stop();
};

const pause = (): void => {
	if (anim.value) anim.value.pause();
};

const setSpeed = (speed: number): void => {
	if (anim.value) anim.value.setSpeed(speed);
};

const setDirection = (direction: AnimationDirection) => {
	if (anim.value) anim.value.setDirection(direction);
};

const getDuration = (inFrames: boolean): number => {
	if (anim.value) return anim.value.getDuration(inFrames);
	return 0;
};

const goToAndStop = (position: number, isFrame: boolean): void => {
	if (anim.value) {
		anim.value.goToAndStop(position, isFrame);
		emit('stopped');
	}
};

const goToAndPlay = (position: number, isFrame: boolean): void => {
	if (anim.value) anim.value.goToAndPlay(position, isFrame);
};

const destroy = (): void => {
	if (anim.value) anim.value.destroy();
};

const init = (container: Element) => {
	const lottieCongfig: { [k: string]: any } = {
		container,
		renderer: 'svg',
		loop: props.loop,
		autoplay: props.autoPlay,
	};
	if (isObject(props.dataSource)) {
		lottieCongfig.animationData = JSON.parse(
			JSON.stringify(props.dataSource),
		);
	} else {
		lottieCongfig.path = props.dataSource;
	}

	anim.value = Lottie.loadAnimation(lottieCongfig as AnimationConfig);
	anim.value.setSpeed(props.speed);
	anim.value.addEventListener('loopComplete', () => {
		emit('loopComplete');
	});
	anim.value.addEventListener('complete', () => {
		emit('complete');
	});
	anim.value.addEventListener('enterFrame', () => {
		emit('enterFrame');
	});
	anim.value.addEventListener('segmentStart', () => {
		emit('segmentStart');
	});
};

onMounted(() => {
	if (animation.value) init(animation.value);
});

onBeforeUnmount(() => {
	destroy();
});

onBeforeUnmount(() => {
	if (anim.value) anim.value.destroy();
});

defineExpose({
	play,
	pause,
	stop,
	setSpeed,
	setDirection,
	getDuration,
	goToAndStop,
	goToAndPlay,
	destroy,
});
</script>
