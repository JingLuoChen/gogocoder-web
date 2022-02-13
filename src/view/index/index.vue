<template>
    <div class="index-box">
        <div class="filter-box">
            <div class="box-left">
                <div class="flex">
                    <Select class="select-style" v-model="obj.companyId" size="large" filterable clearable placeholder="公司" @on-change="changeCompany">
                        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
                    </Select>
                    <Select class="select-style" v-model="obj.depId" size="large" filterable clearable placeholder="部门">
                        <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.depName }}</Option>
                    </Select>
                    <Select class="select-style" v-model="obj.jobId" size="large" filterable clearable placeholder="岗位">
                        <Option v-for="item in jobsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="flex">
                    <Select class="select-style" v-model="obj.subjectId" size="large" filterable clearable placeholder="科目" @on-change="changeSubject">
                        <Option v-for="item in subjectList" :value="item.id" :key="item.id">{{ item.subjectName }}</Option>
                    </Select>
                    <Select class="select-style" v-model="obj.subId" size="large" filterable clearable placeholder="子科目">
                        <Option v-for="item in subSubjectList" :value="item.id" :key="item.id">{{ item.subSubjectName }}</Option>
                    </Select>
                    <DatePicker class="date-box" :value="time" type="daterange" placeholder="选择时间范围" style="width: 200px; height: 36px;" @on-change="handleChange"></DatePicker>
                </div>
            </div>
            <div class="box-right">
                <Button type="primary" size="large" @click="query">查询</Button>
            </div>
        </div>
        <div class="table-box">
            <Table stripe size="large" :columns="columns" :data="dataList" :border="false" :loading="loading">
                <template slot-scope="{ row }" slot="questionName">
                    <div style="margin: 5px 0;">
                        <strong>{{ row.questionName }}</strong>
                    </div>
                    <div style="margin: 5px 0;">
                        <template v-for="(item, index) in row.companyList">
                            <Tag v-if="index < 10" :key="index" color="blue">{{ item }}</Tag>
                        </template>
                        <Tag v-if="row.companyList && row.companyList.length >= 10" color="blue" v-on:click.native="viewCompany(row.companyList)">...</Tag>
                    </div>
                </template>
                <template slot-scope="{ row }" slot="finalUpdateTime">
                    <strong>{{ row.finalUpdateTime | conversionDate }}</strong>
                </template>
                <template slot-scope="{ row }" slot="count">
                    <strong>{{ row.count }}</strong>
                </template>
            </Table>
            <div style="margin-top: 10px; text-align: right;">
                <Page :total="total" :page-size="pageSize" :current="current" show-total @on-change="changePage"/>
            </div>
        </div>
        <Modal title="公司" v-model="isShowCompany" class-name="vertical-center-modal">
            <div class="modal-box">
                <Tag v-for="(item, index) in tagList" :key="index" color="blue">{{ item }}</Tag>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {getAllCompany, getByCompany, getJobs, getSubjectAll, getSubListBySubjectId, queryRecommend, queryByParam} from '../../service/api'
    export default {
        data() {
            return {
                obj: {
                    companyId: '',
                    depId: '',
                    jobId: '',
                    subjectId: '',
                    subId: ''
                },
                companyList: [], // 公司列表
                departmentList: [], // 部门列表
                jobsList: [], // 性质列表
                subjectList: [], // 科目列表
                subSubjectList: [], // 子科目列表
                columns: [
                    {
                        title: '题目',
                        width: 750,
                        slot: 'questionName'
                    },
                    {
                        title: '最近面试时间',
                        align: 'center',
                        slot: 'finalUpdateTime'
                    },
                    {
                        title: '总频度',
                        align: 'center',
                        slot: 'count'
                    }
                ],
                time: '',
                dataList: [],
                cacheDataList: [],
                current: 1,
                pageSize: 20,
                total: 0,
                loading: false,
                isShowCompany: false,
                tagList: []
            }
        },
        mounted() {
            this.queryRecommend()
            this.getCompany()
            this.getJobs()
            this.getSubject()
        },
        methods: {
            // 首次获取数据
            queryRecommend() {
                this.loading = true
                queryRecommend().then(res => {
                    this.loading = false
                    if (res.code === 0) {
                        this.cacheDataList = res.data
                        this.total = res.data.length
                        this.current = 1
                        this.dataList = res.data.slice(0, this.pageSize)
                    }
                }).catch(err => {
                    this.loading = false
                    console.log(err)
                })
            },
            // 获取公司列表
            getCompany() {
                getAllCompany().then(res => {
                    if (res.code === 0) {
                        this.companyList = res.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 获取性质列表
            getJobs() {
                getJobs().then(res => {
                    if (res.code === 0) {
                        Object.keys(res.data).forEach(item => {
                            this.jobsList.push({
                                value: item,
                                label: res.data[item]
                            })
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 获取所有科目
            getSubject() {
                getSubjectAll().then(res => {
                    if (res.code === 0) {
                        this.subjectList = res.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 改变公司获取部门
            changeCompany() {
                this.obj.depId = ''
                let companyId = this.obj.companyId
                if (!this.obj.companyId) {
                    this.departmentList = []
                    return
                }
                getByCompany({companyId}).then(res => {
                    if (res.code === 0) {
                        this.departmentList = res.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 改变科目，获取子科目
            changeSubject() {
                this.obj.subId = ''
                let subjectId = this.obj.subjectId
                if (!this.obj.subjectId) {
                    this.subSubjectList = []
                    return
                }
                getSubListBySubjectId({subjectId}).then(res => {
                    if (res.code === 0) {
                        this.subSubjectList = res.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 改变时间
            handleChange(date) {
                this.time = date
            },
            // 查询数据
            query() {
                this.loading = true
                let para = JSON.parse(JSON.stringify(this.obj))
                para.startTime = new Date(this.time[0]).getTime() || 0
                para.endTime = new Date(this.time[1]).getTime() || 0
                queryByParam(para).then(res => {
                    this.loading = false
                    if (res.code === 0) {
                        this.cacheDataList = res.data
                        this.total = res.data.length
                        this.current = 1
                        this.dataList = res.data.slice(0, this.pageSize)
                    }
                }).catch(err => {
                    this.loading = false
                    console.log(err)
                })
            },
            // 分页跳转
            changePage(data) {
                let startPage = data * this.pageSize - this.pageSize
                let endPage = data * this.pageSize + this.pageSize
                this.dataList = this.cacheDataList.slice(startPage, endPage)
            },
            viewCompany(companyList) {
                this.tagList = companyList
                this.isShowCompany = true
            }
        }
    }
</script>
<style>
.index-box .ivu-page-item-jump-next:after,
.index-box .ivu-page-item-jump-prev:after {
    content: "\2022\2022\2022" !important;
}
</style>

<style scoped>
.index-box {
    margin: 0 auto;
    padding: 20px;
}
.filter-box {
    display: flex;
}
.box-left {
    width: 90%;
}
.box-right {
    width: 10%;
    text-align: right;
}
.select-style {
    width: 200px;
    text-align: left;
}
.flex {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.table-box {
    margin-top: 10px;
    clear: both;
}
.modal-box {
    max-height: 400px;
    overflow: hidden;
    overflow-y: auto;
}
</style>
