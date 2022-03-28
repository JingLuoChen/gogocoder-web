<template>
    <div class="login">
        <div class="logo-b">
            <img src="../../assets/logo.png" alt="">
        </div>
        <Card class="card-style">
            <div>
                <h1>用户登陆</h1>
                <div>
                    <div style="margin-top: 20px;">
                        微信扫码关注公众号
                        <br>
                        在公众号点击「登录验证」获取登陆验证码
                    </div>
                    <div class="gogocoder-style">
                        <img src="../../assets/gogocoder.jpg" alt="">
                    </div>
                </div>
                <div>
                    <div style="margin-bottom: 10px;">
                        <Input v-model="numValue" placeholder="请输入账号" style="width: 200px; margin-bottom: 10px;"/>
                        <Input v-model="numValue" placeholder="请输入验证码（6位）" style="width: 200px" maxlength="6"/>
                    </div>
                    <Button type="primary" @click="login" style="width: 200px;font-weight: 800;">登陆</Button>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            numValue: ''
        }
    },
    methods: {
        login() {
            this.$router.push({name: 'home'});
        }
    }
}
</script>

<style scoped>
.login {
    background: #e9ecef;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.logo-b {
    position: absolute;
    top: 20px;
    left: 20px;
    height: 60px;
}
.logo-b img {
    width: 100%;
    height: 100%;
}
.card-style {
    text-align: center;
    border: 1px solid transparent;
    padding: 20px;
    background: #fff;
    width: 90%;
    max-width: 460px;
    font-weight: 800;
}
.logo-style {
    width: 100%;
    height: 100px;
}
.logo-style img {
    width: 100%;
    height: 100%;
}
.gogocoder-style img {
    width: 200px;
    height: 200px;
}
</style>
