<template>
	<footer>
		<div class="power" v-show="!store.playerState" style="line-height: 125%;">
			<!-- 站点备案 -->
			<div class="start">
				{{ siteDateStatistics(new Date('2023/1/16')) }}
				<!-- 本站已勉强运行 {{ diffDays }} 天 -->
			</div>
			<a href="https://beian.miit.gov.cn" target="_blank">
				© {{ new Date().getFullYear() }} 陇ICP备2024012599号
			</a>
			<!-- 以下信息请不要修改哦 -->
			<span class="hidden">
				&amp;&nbsp;Made&nbsp;by
				<a :href="config.github" target="_blank">
					{{ config.author }}
				</a>
			</span>
		</div>
		<div class="lrc" v-show="store.playerState">
			<music-one theme="filled" size="18" fill="#efefef" />
			<span class="lrc-text">
				{{ store.getPlayerLrc ? store.getPlayerLrc : "这句没有歌词" }}
			</span>
			<music-one theme="filled" size="18" fill="#efefef" />
		</div>
	</footer>
</template>

<script setup>
import {
	MusicOne
} from "@icon-park/vue-next";
import {
	mainStore
} from "@/store";
import config from "@/../package.json";
import { siteDateStatistics } from "@/utils/getTime.js";
// var days = 1000 * 60 * 60 * 24;
// // var years = days * 365;
// var today = new Date();
// var todayYear = today.getFullYear();
// var todayMonth = today.getMonth() + 1;
// var todayDate = today.getDate();
// var t1 = Date.UTC(2023, 1, 16);
// var t2 = Date.UTC(todayYear, todayMonth, todayDate);
// var diff = t2 - t1;
// var diffDays = Math.floor((diff / days));
const store = mainStore();
</script>

<style lang="scss" scoped>
footer {
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	height: 46px;
	line-height: 46px;
	text-align: center;
	backdrop-filter: blur(10px);
	background: rgb(0 0 0 / 25%);
	z-index: 0;
	animation: fade;
	-webkit-animation: fade 0.5s;

	@media (max-width: 720px) {
		font-size: 0.85rem;
	}

	@media (max-width: 480px) {
		.hidden {
			display: none;
		}
	}

	.power {
		animation: fade;
		-webkit-animation: fade 0.3s;

		.start {
			font-size: 0.75rem;
			line-height: .625rem;
			padding: .3125rem 0;
		}
	}

	.lrc {
		padding: 0 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		animation: fade;
		-webkit-animation: fade 0.3s;

		.lrc-text {
			margin: 0 8px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			word-break: break-all;
		}

		.i-icon {
			width: 18px;
			height: 18px;
			display: inherit;
		}
	}
}
</style>
