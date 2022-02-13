<template>
    <div class="about">
        <h1>关于GoGoCoder</h1>
        <p>GoGoCoder用于汇总互联网公司技术岗考察八股文面试题目的频度🔥，涵盖前端、后端（Java、计算机网络、mysql、Redis、操作系统..）等门类，致力于节省大家扒面经的时间，帮助同学们按照目的公司、部门、岗位有效命中面试题目，让您能够在忙碌之余精准复习备战面试，拿到心仪又富贵的Offer！</p>
        <p style="font-weight: 800;">相对于各大论坛的面经讨论区，GoGoCoder能够帮助你</p>
        <ol class="about-ol">
            <li>搜罗全网的面经讨论区，有效节省收集整理的时间</li>
            <li>识别面经考查的知识点，精准定位问题考查范围</li>
            <li>梳理公司、部门、岗位的高频面试题目，局部命中面试题目</li>
            <li>从公司、部门、科目等多维度把握面试题目</li>
            <li>时刻跟进面经产出题目，着力接触新题目，强化复习老题目</li>
        </ol>
        <div class="tips">注：现阶段题源，主要来自牛客网讨论区</div>
        <p>从2021年10月11日，截至目前，GoGoCoder梳理统计情况，如下：</p>
        <Table :columns="columns" :data="data"></Table>
        <Divider />
        <h1>联系我们</h1>
        <p>有任何问题或建议，可关注公众号进行互相交流</p>
        <p>GoGoCoder , 会第一时间跟进高频面试考点信息推送！</p>
        <div class="about-img">
            <img src="../../assets/gogocoder.jpg" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '类别',
                        key: 'type'
                    },
                    {
                        title: '面经统计',
                        key: 'face'
                    },
                    {
                        title: '产出题目',
                        key: 'questions'
                    },
                    {
                        title: '频度统计',
                        key: 'count'
                    },
                    {
                        title: '涉及公司',
                        key: 'company'
                    },
                    {
                        title: '最近更新',
                        key: 'time'
                    },
                ],
                data: [{
                    type: '前端',
                    face: 320,
                    questions: 452,
                    count: 2239,
                    company: 118,
                    time: '2022-01-08'
                }, {
                    type: '后端',
                    face: 917,
                    questions: 1294,
                    count: 8713,
                    company: 217,
                    time: '2022-01-02'
                },]
            }
        }
    }
</script>
<style>
.about p {
    margin: 10px 0;

}
.about-ol {
    padding-left: 40px;
}
.about-ol li {
    margin: 5px 0;
}
.about .tips {
    margin-top: 10px;
    font-size: 8px;
}
.about-img {
    width: 150px;
    height: 150px;
}
.about-img img {
    width: 100%;
    height: 100%;
}
</style>
