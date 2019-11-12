<template >
  <v-container v-if="isError">
    We are sorry for the inconvience.
    It looks like the directory is crashed. 
  </v-container>

  <v-container v-else-if="isLoading" class="text-center">
    <div class="text-xs-center">
      <v-progress-circular
        indeterminate
        :size="100"
        :width="4"
        color="blue">
      </v-progress-circular>
    </div>
  </v-container>

  <v-container v-else class="flex-container"> 
    <v-toolbar flat color="grey lighten-5">
          <v-toolbar-title>Characters Table</v-toolbar-title> 
    <v-spacer></v-spacer>
  <v-text-field v-model="search" label="Search Name/Gender" class="mx-4"></v-text-field> 
  </v-toolbar>
  <table>
    <thead>
      <tr>
        <th v-for="key in headers" :key=key
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
          >
          {{  key.substr(0, 1).toUpperCase() + key.substr(1).toLowerCase()}}
          <span class="arrow" :class="sortOrder > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody v-if="allCharDetails[this.page]" >
      <tr v-for="(data,index) in sortedData" :key=index @click="getAllDetails(index)">
        <td v-for="key in headers" :key=key >
          {{ data[key] }}
        </td>
      </tr>
    </tbody>
  </table>
  
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length=50
      :total-visible=10
      @input="onPageChange"
    ></v-pagination>
  </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  name: "Characters",
  data () {
    return {
      headers: ["name","gender","born","age"],  //Static Table header to display data
      sortKey: 'name',  //Default value to sort the list
      sortOrder:'',    // Order by value, By default will sort the list on basis of name in ascending order
      page:1,
      search:"",
      color: "white",
    }
  },
  methods: {
    ...mapActions(['fetchAllChars', 'updatePageNum','fetchAgeOfCharc','getWholeData','fetchDetails','toggleIsLoading']),
    sortBy: function (key) {//Setting key and order for sorting
      if(key === this.sortKey){
        this.sortOrder === 'asc'? this.sortOrder = 'desc': this.sortOrder ='asc';
      }
      this.sortKey = key   
      this.sortedData() 
    },
    onPageChange: function () {
        this.toggleIsLoading() //Progresss loading
        this.updatePageNum(this.page) //update page number and fetch next 10 responses
        this.fetchAllChars()
    },
    getAllDetails: function(index){ 
      this.fetchDetails(index)
    }
  },
  computed: {
    ...mapGetters(['allCharDetails','isLoading','isError']),
    //Function for searching and sorting, sorting function for table columns on the basis of key
    // Searching function is on the basis of name
    sortedData: function() {
      if(this.search){
        return this.allCharDetails[this.page].filter(item => {
          return (
            item.name.toLowerCase().includes(this.search.toLowerCase()) || item.gender.toLowerCase().includes(this.search.toLowerCase() )
            )
        })
      } else  {
        var sortedCharacterData = this.allCharDetails[this.page]  //temp variable to sort the data, propery cannot be mutated in computed 
        return sortedCharacterData.sort((a,b) => {
          let modifier = 1 // Asc or decending descion
          this.sortOrder === 'desc' ? modifier =-1 : modifier
          if ( a[this.sortKey] < b[this.sortKey] ) return -1 * modifier
          else if ( a[this.sortKey] > b[this.sortKey] ) return 1 * modifier
          else return 0
        });  
      }
    }
  },
  created () {
    this.fetchAllChars()    
  }
  
  
}
</script>

<style scoped>

table {
  width: 70%;
  border-radius: 3px;
  background-color: #f9f9f9;
}

th {
  /* background-color: #7695fa;
  color: rgba(255,255,255,0.66); */
  background-color: #f9f9f9;
  color: black;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  padding: 8px 20px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  min-width: 120px;
}

table tr:nth-child(odd) {
 background-color: rgb(223, 219, 219);
}

th.active {
  color: black
}


th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid  #7695fa;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid  #7695fa;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

</style>