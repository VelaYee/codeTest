<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommed />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommed from "@/pages/Home/Recommed";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
// 1111
export default {
  name: "",
  components: {
    ListContainer,
    Recommed,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // console.log('mounted');
    this.$store.dispatch("getFloorList");
    this.$store.dispatch('getUserInfo')
  },
/*   beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  }, */
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>