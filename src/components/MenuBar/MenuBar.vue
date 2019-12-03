<template>
  <Menu mode="horizontal" active-name="activePage" @on-select="selectMenu">
    <MenuItem name="games">
      <Icon type="ios-paper" />
      游戏列表
    </MenuItem>
    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-stats" />
        预测
      </template>
      <MenuItem name="half_predict">半场预测</MenuItem>
    </Submenu>
  </Menu>
</template>

<script src="./MenuBar.js"></script>
