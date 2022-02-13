<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header :style="{position: 'fixed', width: '100%', 'z-index': '1000'}">
          <Menu  mode="horizontal" theme="dark" :active-name="activeName" style="box-shadow: rgb(23 35 61) 2px 2px 10px;" @on-select="chooseMenu">
            <div class="layout-logo" @click="goHome">
              <img src="./assets/logo-w.png" alt="">
            </div>
            <div class="layout-nav">
              <Menu-item name="home">
                首页
              </Menu-item>
              <Menu-item name="face">
                面经
              </Menu-item>
              <Menu-item name="official">
                内推
              </Menu-item>
              <Menu-item name="about">
                说明
              </Menu-item>
<!--              <Menu-item name="brokeNews">-->
<!--                <Icon type="ios-keypad"></Icon>-->
<!--                爆料-->
<!--              </Menu-item>-->
<!--              <Menu-item name="resources">-->
<!--                <Icon type="ios-analytics"></Icon>-->
<!--                相关资料-->
<!--              </Menu-item>-->
<!--              <Menu-item name="knowSystem">-->
<!--                <Icon type="ios-paper"></Icon>-->
<!--                知识体系-->
<!--              </Menu-item>-->
            </div>
          </Menu>
        </Header>
        <div style="height: 60px;"></div>
        <Card :style="{border: '1px solid transparent', margin: '20px auto 0', background: '#fff', minHeight: 'calc(100% - 175px)', width: '1100px'}">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </Card>
        <Footer class="layout-footer-center">
          <div>
            <p>GoGoCoder@2022</p>
            <a href="https://beian.miit.gov.cn/">
              <span style="color: #606266; font-size: 14px; font-weight: 500;">京ICP备2021036196号</span>
            </a>
          </div>
        </Footer>
<!--        <vue-particles-->
<!--                class="particles-js"-->
<!--                color="#dedede"-->
<!--                :particleOpacity="0.7"-->
<!--                :particlesNumber="80"-->
<!--                shapeType="circle"-->
<!--                :particleSize="4"-->
<!--                linesColor="#dedede"-->
<!--                :linesWidth="1"-->
<!--                :lineLinked="true"-->
<!--                :lineOpacity="0.4"-->
<!--                :linesDistance="150"-->
<!--                :moveSpeed="3"-->
<!--                :hoverEffect="true"-->
<!--                hoverMode="grab"-->
<!--                :clickEffect="true"-->
<!--                clickMode="push"-->
<!--        >-->
<!--        </vue-particles>-->
      </Layout>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      activeName: ''
    }
  },
  mounted() {
    let name = window.location.pathname.split('/')
    this.activeName = name[1]
  },
  methods: {
    chooseMenu(name) {
      this.$router.push({name:name});
    },
    goHome() {
      this.$router.push({name: 'home'});
    }
  }
}
</script>

<style>
body, html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  position: relative
}
.ivu-layout {
  display: block !important;
  height: 100%;
  background: #fff !important;
}
.ivu-layout-header {
  padding: 0 !important;
  height: 60px !important;
  line-height: 60px !important;
}
.ivu-input-suffix i {
  line-height: 36px !important;
}
.ivu-input-with-suffix {
  height: 36px !important;
}
</style>
<style scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    height: 100%;
  }
  .layout-logo{
    height: 40px;
    max-width: 145px;
    border-radius: 3px;
    margin-right: 50px;
    float: left;
    position: relative;
    top: 10px;
    left: 20px;
    font-size: 0;
    cursor: pointer;
  }
  .layout-logo img {
    width: 100%;
    height: 100%;
  }
  .layout-nav{
    margin-left: 50px;
  }
  .layout-footer-center{
    width: 100%;
    min-width: 1100px;
    clear: both;
    text-align: center;
  }
</style>
