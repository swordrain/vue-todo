<template>
	<mu-appbar :title="title" :class="{'collapse': drawerOpened}" class="header">
  		<mu-icon-button icon="menu" @click="toggleDrawer" slot="left"/>
  		<!-- <mu-flat-button label="expand_more" slot="right"/>
  		<mu-flat-button href="333" label="expand_more" slot="right"/>
  		<mu-icon-button icon="expand_more" slot="right"/> -->
  		<mu-text-field v-model="keywords" icon="search" slot="right" @input="filter" hintText="key words"/>
  		<mu-icon-menu icon="more_vert" slot="right" :value="theme" @change="changeTheme">
      		
      		<mu-menu-item :key="theme.value" v-for="theme in themes" :title="theme.name" :value="theme.value" />
    	</mu-icon-menu>
	</mu-appbar>
</template>


<script>
	import light from '!raw-loader!muse-ui/dist/theme-light.css'
	import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
	import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
	import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
	export default {
		data: function(){
			return {
				keywords: "",
				labelClass: 'drop-down-label',
				targetOrigin: {vertical: 'bottom',horizontal: 'right'},
				theme: "default",
				themes: [{
						name:"Default",
						value: "default"
					},{
						name:"Light",
						value: "light",
						light

					},{
						name:"Dark",
						value: "dark",
						dark

					},{
						name:"Carbon",
						value: "carbon",
						carbon
					},{
						name:"Teal",
						value: "teal",
						teal
					}
				]
			}
		},
		props: ['title', 'drawerOpened'],
		methods: {
			toggleDrawer: function() {
				this.$emit('toggleDrawer');
			},
			changeTheme: function(theme){
				this.theme = theme
      			const styleEl = this.getThemeStyle()

      			for(let t of this.themes){
      				if(t.value === theme){
      					styleEl.innerHTML = t[theme]|| ''
      					break;
      				}
      			}

			},
			filter(){
				this.$store.commit("setFilter", this.keywords);
			},
			getThemeStyle () {
		      	const themeId = 'muse-theme'
		      	let styleEl = document.getElementById(themeId)
		      	if (styleEl) return styleEl
		      	styleEl = document.createElement('style')
		      	styleEl.id = themeId
		      	document.body.appendChild(styleEl)
		      	return styleEl
		    }
		}
	}
</script>

<style scoped>
.collapse {
	padding-left: 256px;
}
.header {
	transition: all .45s cubic-bezier(.23,1,.32,1);
}

</style>