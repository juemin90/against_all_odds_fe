<template>
<div>
<Form>
<Row>
</Row>
<Row>
<Card>
  <Table :columns="games_columns" :data="games_data"
  :loading="loading" :row-class-name="rowClassName" >
  </Table>
</Card>
</Row>
</Form>
</div>
</template>
<script src="./HalfPredict.js"></script>
