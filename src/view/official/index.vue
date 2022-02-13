<template>
    <div class="official">
        <Card v-for="item in officialList" :key="item.id" class="official-card" v-on:click.native="getOfficial(item)">
            <div class="left">
                <img :src="item.image ? require(`../../assets/official/${item.image}`) : ''" alt="image"/>
            </div>
            <div class="right">
                <h3>{{ item.title }}</h3>
                <h4 style="margin-top: 10px;">{{ item.tips }}</h4>
                <h4 style="margin-top: 10px;">{{ item.type }}</h4>
            </div>
            <div style="clear: both;"></div>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                officialList: [{
                    id: 1,
                    image: 'jd.jpeg',
                    title: '京东2022管培生春招补录内推来袭',
                    href: 'https://mp.weixin.qq.com/s/LTQh2QonEHAI44NEV33OeQ',
                    type: '校招',
                    tips: '2022届本科毕业生、硕士毕业生'
                }, {
                    id: 2,
                    image: 'byteDance.jpeg',
                    title: '字节实习生闪电内推',
                    href: 'https://mp.weixin.qq.com/s/JbbtV87pX4X_ICpilUOIAA',
                    type: '日常实习',
                    tips: '投递时间2022.2.10~2022.7.31'
                }], // 内推列表
            }
        },
        mounted() {

        },
        methods: {
            getOfficial(item) {
                window.open(item.href, '_blank');
            }
        }
    }
</script>

<style scoped>
.official {
    display: flex;
}
.official-card {
    width: 400px;
    margin-right: 20px;
    cursor: pointer;
}
.official-card .left {
    width: 150px;
    float: left;
}
.official-card .left img {
    width: 100%;
    height: 100%;
}
.official-card .right {
    width: calc(100% - 150px);
    padding-left: 20px;
    float: left;
}
</style>
