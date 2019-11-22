<template>
  <div id="user">
    <section class="user-info">
      <img class="avatar" :src="user.avatar" :alt="user.username" />
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <router-link class="item" :to="`/detail/${blog.id}`" v-for="blog in blogs" :key="blog.id">
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :current-page="page"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style lang="less" src="./template.less"></style>
