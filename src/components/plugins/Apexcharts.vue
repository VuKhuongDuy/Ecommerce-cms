<script>
import VueApexCharts from "vue3-apexcharts";
import { useAppVariableStore } from '@/stores/app-variable';

const appVariable = useAppVariableStore();

Apex = {
	grid: {
		borderColor: 'rgba('+ appVariable.color.componentColorRgb + ', .15)'
	},
	title: {
		style: {
			color: appVariable.color.componentColor
		}
	},
	legend: {
		labels: {
			colors: appVariable.color.componentColor
		}
	},
	xaxis: {
		axisBorder: {
			show: true,
			color: 'rgba('+ appVariable.color.componentColorRgb + ', .25)',
			height: 1,
			width: '100%',
			offsetX: 0,
			offsetY: -1
		},
		axisTicks: {
			show: true,
			borderType: 'solid',
			color: 'rgba('+ appVariable.color.componentColorRgb + ', .25)',
			height: 6,
			offsetX: 0,
			offsetY: 0
		},
		labels: {
			style: {
				colors: appVariable.color.componentColor,
				fontSize: appVariable.font.size,
				fontFamily: appVariable.font.family,
				fontWeight: 400,
				cssClass: 'apexcharts-xaxis-label',
			}
		}
	},
	yaxis: {
		labels: {
			style: {
				colors: appVariable.color.componentColor,
				fontSize: appVariable.font.size,
				fontFamily: appVariable.font.family,
				fontWeight: 400,
				cssClass: 'apexcharts-xaxis-label',
			}
		}
	}
};

export default {
	props: ['height', 'options', 'series'],
  components: {
    apexchart: VueApexCharts,
  }
};
</script>

<template>
  <div>
    <apexchart
      :height="height"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>