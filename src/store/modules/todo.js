
const state = {
	currentCategoryIndex: 0, //array index
	showFinished: true,
	filter: '',
	todo: [{
			name: "Study",
			data: [{
					name: "Learn Vue",
					isFinished: false
				}, {
					name: "Review React222 good good study day day up",
					isFinished: true,
					finishDate: 1497271329887
			}]
		},
		{
			name: "Play",
			data: [{
				name: "Play War3",
				isFinished: false
			}]
		}
	]
}
const getters = {
	getCategories: (state) => state.todo.map((s) => {return { name: s.name, count: s.data.length } }),
	getTodos: (state) => {
		return state.todo[state.currentCategoryIndex].data.filter((todo)=>{
			return (todo.name.toUpperCase().indexOf(state.filter.toUpperCase()) > -1) && (state.showFinished || !todo.isFinished)
	})},
	getCurrentCategoryName: (state) => state.todo[state.currentCategoryIndex].name,
	getShowFinished: (state) => state.showFinished
}

const mutations = {
	addCategory(state, name){
		state.todo.push({
			name,
			data: []
		})
	},

	deleteCategory(state, index){
		state.todo.splice(index, 1)
	},

	addTodo(state, name){
		state.todo[state.currentCategoryIndex].data.push({
			name,
			isFinished: false
		})
	},

	toggleFinished(state, order) {
		let isFinished = state.todo[state.currentCategoryIndex].data[order].isFinished
		state.todo[state.currentCategoryIndex].data[order].isFinished = !isFinished
		state.todo[state.currentCategoryIndex].data[order].finishDate = new Date().getTime()
	},

	setFilter(state, keywords){
		state.filter = keywords
	},

	toggleShowFinished(state){
		state.showFinished = !state.showFinished
	},

	setCurrentCategory(state, index){
		state.currentCategoryIndex = index
	}
}

export default {
  state,
  getters,
  mutations
}