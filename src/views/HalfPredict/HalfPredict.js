import axios from 'axios';
import api from '../../constants/api';

export default {
  name: 'half_predict',
  data() {
    return {
      loading: false,
      games_columns: [{
        title: '赛事',
        key: 'game_name',
      }, {
        title: '球队',
        key: 'teams',
      }, {
        title: '状态',
        key: 'game_last_time',
      }, {
        title: '标本数量',
        key: 'sample_number',
      }, {
        title: '半场比分',
        key: 'half_score',
      }, {
        title: '主队让球',
        key: 'half_handicap_goal',
      }, {
        title: '大小球',
        key: 'half_goal',
      }, {
        title: '主队胜概率',
        key: 'home_win',
      }, {
        title: '客队胜概率',
        key: 'away_win',
      }, {
        title: '大球概率',
        key: 'high_goal',
      }, {
        title: '小球概率',
        key: 'low_goal',
      }],
      games_data: [],
    };
  },
  created() {
    this.getHalfPredicts();
  },
  methods: {
    getParams() {
      return {};
    },
    setGamesData(games) {
      this.games_data = games.map(game => ({
        game_name: game.game_name,
        teams: `${game.home_team} vs ${game.away_team}`,
        game_last_time: game.game_last_time,
        sample_number: game.sample_number,
        half_score: `${game.half_home_score} : ${game.half_away_score}`,
        half_handicap_goal: game.half_handicap_goal,
        half_goal: game.half_goal,
        home_win: game.home_win,
        away_win: game.away_win,
        high_goal: game.high_goal,
        low_goal: game.low_goal,
      }));
    },
    getHalfPredicts() {
      this.loading = true;
      const params = this.getParams();
      axios.get(api.GET_HALF_PREDICT, { params }).then((res) => {
        this.loading = false;
        const { data } = res.data;
        this.setGamesData(data);
      });
    },
  },
};
