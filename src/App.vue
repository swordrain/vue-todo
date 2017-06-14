
<template>
  <div>
    <todo-header :title="currentCategoryName" @toggleDrawer="toggleDrawer" :drawerOpened="drawerOpened"></todo-header>
    <todo-drawer :drawerOpened="drawerOpened" title="Category"></todo-drawer>
    <todo-list :drawerOpened="drawerOpened"></todo-list>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import TodoList from './components/TodoList.vue'
export default {
  name: 'app',
  data: function(){
    return {
      drawerOpened: true,
    }
  },
  components: {
    todoHeader: Header,
    todoDrawer: Drawer,
    todoList: TodoList
  },
  computed: {
    currentCategoryName: function(){
      return `Vue TODO - ${this.$store.getters.getCurrentCategoryName}`
    },
  },
  methods: {
    toggleDrawer: function() {
      this.drawerOpened = !this.drawerOpened
    }
  }
}
</script>

<style>

</style>
