<template>
	<view class="content">
		<test v-if="flag" :title="title" @myEven="getNum"></test>
		<button type="primary" @click="checkTest">切换Test组件</button>
		这是子组件传递过来的数据{{num}}
		<test-a></test-a>
		<test-b></test-b>
		<uni-calendar :insert="true" :lunar="true" :start-date="'2019-3-2'" :end-date="'2023-5-20'" @change="change" />
	</view>
</template>

<script>
	import test from '../../components/test.vue'
	import testA from '../../components/a.vue'
	import testB from '../../components/b.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				num: 0,
				flag: true
			}
		},
		onLoad(options) {
			console.log('页面加载了', options)
		},
		onShow() {
			console.log('页面显示了')
		},
		onReady() {
			console.log('页面初次渲染完成了')
		},
		onHide() {
			console.log('页面隐藏了')
		},
		methods: {
			checkTest() {
				this.flag = !this.flag
			},
			getNum(num) {
				console.log(num)
				this.num = num
			},
			change(e) {
				console.log('触发了change', e)
			}
		},
		components: {
			test,
			"test-a": testA,
			"test-b": testB
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>