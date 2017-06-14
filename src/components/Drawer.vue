<template>
	<div>
		<mu-drawer :open="drawerOpened">
	      	<mu-appbar :title="title">
	      		<mu-icon-button @click="addCategory" icon="add" slot="right"/>


	      	</mu-appbar>
	      	<mu-list>
	      		<template v-for="(category, index) in categories">
	    			<mu-list-item @click="setCategoryIndex(index)" :class="{'active':isCurrentCategory(index)}" :title="category|combineCount">
	    				<mu-icon-button @click="deleteCategory($event,index)" icon="delete" slot="right"/>
	    			</mu-list-item>
	    			<mu-divider/>
	    		</template>
	    	</mu-list>
	    </mu-drawer>
	    <div>
	  		<mu-dialog :open="dialogAdd" title="New Category">
	    		<mu-text-field v-model="categoryname" label="New Category Name" labelFloat fullWidth/><br/>
	    		<mu-flat-button label="OK" slot="actions" primary @click="closeAdd" :disabled="categoryname.length===0"/>
	  		</mu-dialog>
		</div>
		<div>
	  		<mu-dialog :open="dialogDelete" title="Delete Category">
	  		Do you want to delete this category?
	    		<mu-flat-button label="OK" slot="actions" primary @click="closeDelete(true)"/>
	    		<mu-flat-button label="Cancel" slot="actions" primary @click="closeDelete(false)"/>
	  		</mu-dialog>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['title', 'drawerOpened'],
		data: function(){
			return {
				dialogAdd: false,
				dialogDelete: false,
				categoryname: "",
				indexTobeDelete: undefined
			}
		},
		computed: {
			categories: function(){
				return this.$store.getters.getCategories
			},
			
		},
		filters: {
			combineCount: function(category){
				return category.name + "(" + category.count + ")"
			}
		},
		methods: {
			setCategoryIndex: function(index){
				this.$store.commit("setCurrentCategory", index)
			},
			isCurrentCategory: function(index) {
				return this.$store.state.todo.currentCategoryIndex === index
			},
			addCategory: function(){
				this.dialogAdd = true
			},
			closeAdd: function(){
				this.dialogAdd = false
				this.$store.commit("addCategory", this.categoryname)
			},
			deleteCategory: function(e, index){
				
				e.cancelBubble = true
				this.dialogDelete = true
				this.indexTobeDelete = index
			},
			closeDelete: function(wantToDelete){
				this.dialogDelete = false
				if(wantToDelete){
					this.$store.commit("deleteCategory", this.indexTobeDelete)
				}
			}


		}

	}
</script>
<style scoped>
.active {
	background-color: lightgray;
}
</style>