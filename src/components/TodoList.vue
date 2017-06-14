<template>
<div :class="{'collapse': drawerOpened}" class="main">

<mu-paper class="todo-container" :zDepth="2">
	<mu-switch label="Show Finished" :value="showFinished" @change="toggleShowFinished"/>
	<mu-float-button icon="add" class="add-todo" @click="addTodo"/>
  <mu-content-block>
    <mu-grid-list>
	    <mu-paper key="index" class="todo-paper" v-for="todo, index in todos">

		    <h2 class="todo-title" :title="todo.name">{{todo.name}}</h2>
	      	<mu-divider/>
	      	<div class="finish-container">
	      		<mu-switch label="isFinished" class="demo-switch" @change="toggleFinished(index)" :value="todo.isFinished" />
	      		<div v-if="todo.finishDate">Finished {{todo.finishDate|finishFromNow}}</div>
	      	</div>
	    </mu-paper>
  	</mu-grid-list>
  </mu-content-block>
</mu-paper>
<mu-dialog :open="dialog" title="Create New Todo">
	<mu-text-field v-model="newTodo" label="New Todo" labelFloat fullWidth/><br/>
	<mu-flat-button label="OK" slot="actions" primary @click="closeAdd" :disabled="newTodo.length===0"/>
	</mu-dialog>
</div>


</template>

<script>
import moment from 'moment'

export default {
	props: ['drawerOpened'],
	data: function(){
		return {
			dialog: false,
			newTodo: ""
		}
	},
	computed: {
		todos: function(){
			return this.$store.getters.getTodos
		},
		showFinished: function(){
			return this.$store.getters.getShowFinished
		}
	},
	filters: {
		finishFromNow: function(time){
			return moment(time).fromNow()
		}
	},
	methods: {
		toggleFinished(index) {
			this.$store.commit("toggleFinished", index)
		},

		addTodo(){
			this.dialog = true
		},
		closeAdd(){
			this.dialog = false
			
			this.$store.commit("addTodo", this.newTodo)
			this.newTodo = ""
		},
		toggleShowFinished(){
			this.$store.commit("toggleShowFinished")
		}
	}

}

</script>

<style scoped>
.add-todo{
	position:  fixed;
	right: 20px;
	bottom: 20px;
}
.collapse {
	padding-left: 256px;
}
.main {
	transition: all .45s cubic-bezier(.23,1,.32,1);
}
.todo-container{
	margin: 20px;
	padding: 10px;
}
.todo-paper{
	width: 250px;
	height: 150px;
	margin: 15px;
	padding: 0 10px;
	position: relative;
}
.todo-title{
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.finish-container{
	margin-top: 10px;
}
</style>