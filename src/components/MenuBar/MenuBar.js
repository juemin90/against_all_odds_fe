export default {
  data: {
    name: 'menu_bar',
  },
  counted: {
    activePage() {
      return this.$store.active_page;
    },
  },
  created() {
    console.log('menu');
  },
  methods: {
    selectMenu(e) {
      this.$router.push(e);
    },
  },
};
