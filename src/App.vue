<template>
  <v-app>
    
    <v-app-bar app color="grey lighten-5" dark>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Banner />
      <router-view/>
      <SideDetailsBar />
    </v-content>
  </v-app>
</template>

<script>
import SideDetailsBar from './components/SideDetailsBar'
import Banner from './components/Banner'

export default {
  name: 'App',

  components: {
    SideDetailsBar,
    Banner
  },

  data: () => ({
    //
  }),
};
</script>