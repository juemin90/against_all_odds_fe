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
        sortable: true,
      }, {
        title: '客队胜概率',
        key: 'away_win',
        sortable: true,
      }, {
        title: '大球概率',
        key: 'high_goal',
        sortable: true,
      }, {
        title: '小球概率',
        key: 'low_goal',
        sortable: true,
      }, {
        title: '标本数量',
        key: 'sample_number',
        sortable: true,
      }],
      games_data: [],
    };
  },
  created() {
    this.getHalfPredicts();
  },
  methods: {
    rowClassName(row) {
      const {
        home_win, away_win, high_goal, low_goal,
      } = row;
      const max_value = Math.max(home_win, away_win, high_goal, low_goal);
      let class_name = '';
      if (max_value > 90) class_name = 'very high';
      else if (max_value > 80) class_name = 'mid_high';
      else if (max_value > 70) class_name = 'mid';
      else if (max_value > 60) class_name = 'normal';
      else class_name = 'low';
      return class_name;
    },
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
