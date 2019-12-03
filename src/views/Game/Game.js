import axios from 'axios';
import api from '../../constants/api';

export default {
  name: 'game',
  data() {
    return {
      game: {},
      odds_type: '让球',
      echart_key: [],
      // echart_value: [],
      echart_data: [],
    };
  },
  created() {
    this.getGame();
  },
  mounted() {
    // this.drawChart(this.game);
  },
  methods: {
    drawChart(data) {
      const myChart = this.$echarts.init(document.getElementById('echart'));
      const options = {
        tooltip: {},
        legend: {
          data: ['大球', '小球', '大小球'],
        },
        xAxis: { data: data.odds.map(odd => odd.game_last_time) },
        yAxis: {},
        series: this.getEchartsData(data),
      };
      myChart.setOption(options);
    },
    getMarkArea(goal_events) {
      const result = goal_events.map(event => [{
        name: event.score_team,
        xAxis: event.game_last_time,
      }, {
        xAxis: event.game_last_time + 1,
      }]);
      console.log(result);
      return result;
    },
    changeOddsType(value) {
      this.odds_type = value;
      console.log(value);
      this.drawChart(this.game);
    },
    getEchartsData(data) {
      let echart_data;
      if (this.odds_type === '让球') {
        echart_data = [{
          name: '让球',
          type: 'line',
          data: data.odds.map(odd => odd.full_handicap_goal),
          markArea: { data: this.getMarkArea(data.goal_events) },
        }, {
          name: '主胜',
          type: 'line',
          data: data.odds.map(odd => odd.full_handicap_home_odd),
          markArea: { data: this.getMarkArea(data.goal_events) },
        }, {
          name: '客胜',
          type: 'line',
          data: data.odds.map(odd => odd.full_handicap_away_odd),
          markArea: { data: this.getMarkArea(data.goal_events) },
        }];
      } else if (this.odds_type === '大小') {
        echart_data = [{
          name: '大小球',
          type: 'line',
          data: data.odds.map(odd => odd.full_goal),
          markArea: { data: this.getMarkArea(data.goal_events) },
        }, {
          name: '大球',
          type: 'line',
          data: data.odds.map(odd => odd.full_goal_high_odd),
          markArea: { data: this.getMarkArea(data.goal_events) },
        }, {
          name: '小球',
          type: 'line',
          data: data.odds.map(odd => odd.full_goal_low_odd),
          markArea: { data: this.getMarkArea(data.goal_events) },
        }];
      }
      return echart_data;
    },
    getGame() {
      const { game_id } = this.$route.params;
      axios.get(`${api.GET_GAME}/${game_id}`, {}).then((res) => {
        this.game = res.data.data;
        // this.echart_key = res.data.data.odds.map(odd => odd.game_last_time);
        // this.echart_data = this.getEchartsData(res.data.data);
        this.drawChart(this.game);
      });
    },
  },
};
