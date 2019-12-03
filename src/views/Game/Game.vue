<template>
  <Form>
    <Card>
    {{ game.home_team }} vs {{ game.away_team }}
    半场比分{{ game.half_home_score }} : {{ game.half_away_score }}
    全场比分{{ game.final_home_score }} : {{ game.final_away_score }}
    </Card>
    <Card>
    <RadioGroup v-model="odds_type" type="button" @on-change="changeOddsType">
        <Radio label="让球"></Radio>
        <Radio label="大小"></Radio>
    </RadioGroup>
    </Card>
    <Card>
      <div id="echart" style="width: 1200px; height:700px;"></div>
    </Card>
  </Form>
</template>
<script src="./Game.js"></script>
