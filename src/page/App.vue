<template>
  <div class="app-body">
    <h1>INI DIBUAT MENGGUNAKAN VUE JS</h1>
  </div>
</template>
<script>
export default {
  name: "App",

  data() {
    return {
      unsplash: {}
    };
  },

  created() {
    this.getRandomImages();
  },

  methods: {
    async getRandomImages() {
      try {
        const response = await this.$axios.get(
          "https://api.unsplash.com/photos/random?orientation=landscape&query=Nature"
        );

        this.unsplash = response.data;
        console.log("ini data", this.unsplash);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
