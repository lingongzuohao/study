export default {
	timeNotc: [
		{
			id: 0,
			text: '0 子'
		},
		{
			id: 1,
			text: '1 丑'
		},
		{
			id: 2,
			text: '2 丑'
		},
		{
			id: 3,
			text: '3 寅'
		},
		{
			id: 4,
			text: '4 寅'
		},
		{
			id: 5,
			text: '5 卯'
		},
		{
			id: 6,
			text: '6 卯'
		},
		{
			id: 7,
			text: '7 辰'
		},
		{
			id: 8,
			text: '8 辰'
		},
		{
			id: 9,
			text: '9 巳'
		},
		{
			id: 10,
			text: '10 巳'
		},
		{
			id: 11,
			text: '11 午'
		},
		{
			id: 12,
			text: '12 午'
		},
		{
			id: 13,
			text: '13 未'
		},
		{
			id: 14,
			text: '14 未'
		},
		{
			id: 15,
			text: '15 申'
		},
		{
			id: 16,
			text: '16 申'
		},
		{
			id: 17,
			text: '17 酉'
		},
		{
			id: 18,
			text: '18 酉'
		},
		{
			id: 19,
			text: '19 戌'
		},
		{
			id: 20,
			text: '20 戌'
		},
		{
			id: 21,
			text: '21 亥'
		},
		{
			id: 22,
			text: '22 亥'
		},
		{
			id: 23,
			text: '23 子'
		},
	],
	getReparit0(num) {
		return num > 9 ? num : '0' + num
	},
	getDateString(timestamp) {
		let date = timestamp ? new Date(timestamp * 1000) : new Date()

		return `${date.getFullYear()}-${this.getReparit0(date.getMonth() + 1)}-${this.getReparit0(date.getDate())} ${this.getReparit0(date.getHours())}:${this.getReparit0(date.getMinutes())}:${this.getReparit0(date.getSeconds())}`
	}
}