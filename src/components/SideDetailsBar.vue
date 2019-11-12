<template>
  
    <aside  v-if="showSideScreen" class="side-screen">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeSidebar">&times;</a>
      <v-row>  
      </v-row>  
        <v-container>
          <v-card class="mx-auto"  max-width="350">
            <v-card-title>
              <span class="title font-weight-light">{{characterDetail.name}}</span>
              <v-spacer></v-spacer>
              <v-avatar color="indigo">
                  <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-card-title>
            <v-card-text color="#26c6da">
              <v-row align="center" class="mx-0">
                <span class="title font-weight-light">Aliases : {{characterDetail.aliases.join()}}</span> 
              </v-row>
              <v-row align="center" class="mx-0">
                <span class="title font-weight-light">Born : {{characterDetail.born}}</span> 
                <span class="title font-weight-light">Died : {{characterDetail.died}}</span> 
              </v-row>
              <v-row align="center" class="mx-0">  
                <span class="title font-weight-light">Titles : {{characterDetail.titles.join()}}</span> 
              </v-row>
              <v-row align="center" class="mx-0">
                <span class="title font-weight-light">Father : {{characterDetail.father}}</span> 
              </v-row>
              <v-row align="center" class="mx-0">
                <span class="title font-weight-light">Mother : {{characterDetail.mother}} </span>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  data () {
    return {
      drawer: true,
    }
  },
  methods: {
    ...mapActions(['fetchDetails','toggleSideBar']),
    closeSidebar: function () {
      this.toggleSideBar()
    }
  },
  computed: {
    ...mapGetters(['characterDetail','showSideScreen']),
  },
}
</script>
<style scoped>
.side-screen {
  position: fixed;
  right: 10px;
  top: 150px;
  width: 450px;
  height: 70vh;
  border: 1px solid lightgrey;
  background-color: rgb(245, 250, 255);
  padding: 5px;
  box-shadow: 3px 3px 3px lightgrey;
  overflow: auto;
  padding-bottom: 80px;
}
.closebtn {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 40px;
  margin-left: 5px;
  color: #070707;
}
</style>
