// import { mapState, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import axios from 'axios';
import Vue from 'vue';
import { Table, Page, DatePicker } from 'view-design';
import api from '../../constants/api';

Vue.component('Table', Table);
Vue.component('Page', Page);
Vue.component('DataPicker', DatePicker);

export default {
  name: 'games',
  data() {
    return {
      loading: false,
      date: moment().subtract(1).format('YYYY-MM-DD'),
      total: 0,
      current_page: 1,
      size: 10,
      games_columns: [{
        title: '时间',
        key: 'time',
      }, {
        title: '赛事',
        key: 'game_name',
      }, {
        title: '球队',
        key: 'teams',
      }, {
        title: '上半场比分',
        key: 'half_time_scores',
      }, {
        title: '全场比分',
        key: 'final_time_scores',
      }],
      games_data: [],
    };
  },
  created() {
    this.getGames();
  },
  methods: {
    changeDate(date) {
      this.date = date;
      this.getGames();
    },
    changePage(current_page) {
      this.current_page = current_page;
      this.getGames();
    },
    changePageSize(size) {
      this.size = size;
      this.getGames();
    },
    getParams() {
      const params = {};
      if (this.date) params.date = this.date;
      if (this.current_page) params.current_page = this.current_page;
      if (this.size) params.size = this.size;
      return params;
    },
    getGames() {
      this.loading = true;
      const params = this.getParams();
      console.log('params', params);
      axios.get(api.GET_GAMES, { params }).then((res) => {
        this.loading = false;
        const { data, page } = res.data.data;
        this.setGamesData(data);
        this.setPageData(page);
      }).catch((e) => {
        this.$store.state.error = e.message;
        this.loading = false;
      });
    },
    setGamesData(data) {
      this.games_data = data.map(item => ({
        time: `${item.date} ${item.time}`,
        game_name: item.game_name,
        teams: `${item.home_team} vs ${item.away_team}`,
        half_time_scores: `${item.half_home_score} : ${item.half_away_score}`,
        final_time_scores: `${item.final_home_score} : ${item.final_away_score}`,
      }));
    },
    setPageData(page) {
      this.total = page.total;
    },
  },
  computed: {
    games() {
      return this.$store.state.games;
    },
    error() {
      return this.$store.state.error;
    },
  },
};
