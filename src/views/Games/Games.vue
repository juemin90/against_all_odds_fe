<template>
  <div>
    <Card>
      <Row>
      <DatePicker :value="date" @on-change="changeDate" />
      </Row>
    </Card>
    <Card>
      <Table :columns="games_columns" :data="games_data" :loading="loading" >
      </Table>
    </Card>
    <Card>
    <Page :total="total" :current="current_page" :page-size="size"
    @on-change="changePage"
    @on-page-size-change="changePageSize"
    size="small"
    show-sizer />
    </Card>
  </div>
</template>
<script src="./Games.js"></script>
