<template>
    <div class="face">
        <div class="filter-box">
            <div class="box-left">
                <div class="flex">
                    <Select class="select-style" v-model="obj.companyId" size="large" filterable clearable placeholder="公司" @on-change="changeCompany">
                        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
                    </Select>
                    <Select class="select-style" v-model="obj.depId" size="large" filterable clearable placeholder="部门">
                        <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.depName }}</Option>
                    </Select>
                    <Select class="select-style" v-model="obj.nature" size="large" filterable clearable placeholder="性质">
                        <Option v-for="item in naturesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select class="select-style" v-model="obj.jobId" size="large" filterable clearable placeholder="岗位">
                        <Option v-for="item in jobsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <DatePicker class="date-box" :value="time" type="daterange" placeholder="选择时间范围" style="width: 200px; height: 36px;" @on-change="handleChange"></DatePicker>
                    <Button type="primary" size="large" @click="query">查询</Button>
                </div>
            </div>
        </div>
        <div class="table-box">
            <Table stripe size="large" :columns="columns" :data="dataList" :border="false" :loading="loading">
                <template slot-scope="{ row }" slot="questionName">
                    <div style="margin: 5px 0;">
                        <a :href="row.url" target="_blank">{{ row.title }}</a>
                    </div>
                </template>
                <template slot-scope="{ row }" slot="createTime">
                    <strong>{{ row.createTime | conversionDate }}</strong>
                </template>
                <template slot-scope="{ row }" slot="companyName">
                    <strong>{{ row.companyName }}</strong>
                </template>
                <template slot-scope="{ row }" slot="depName">
                    <strong>{{ row.depName }}</strong>
                </template>
                <template slot-scope="{ row }" slot="jobsName">
                    <strong>{{ row.jobsName }}</strong>
                </template>
                <template slot-scope="{ row }" slot="natureName">
                    <strong>{{ row.natureName }}</strong>
                </template>
            </Table>
            <div style="margin-top: 10px; text-align: right;">
                <Page :total="total" :page-size="obj.pageSize" :current="obj.page" show-total @on-change="changePage"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAllCompany, getByCompany, getJobs, getNatures, queryCollections} from '../../service/api'
    export default {
        data() {
            return {
                obj: {
                    companyId: '',
                    depId: '',
                    jobId: '',
                    nature: '',
                    page: 1,
                    pageSize: 20,
                },
                companyList: [], // 公司列表
                departmentList: [], // 部门列表
                naturesList: [], // 岗位列表
                jobsList: [],
                columns: [
                    {
                        title: '面经',
                        width: 450,
                        slot: 'questionName'
                    },
                    {
                        title: '考察时间',
                        align: 'center',
                        slot: 'createTime'
                    },
                    {
                        title: '公司',
                        align: 'center',
                        slot: 'companyName'
                    },
                    {
                        title: '部门',
                        align: 'center',
                        slot: 'depName'
                    },
                    {
                        title: '岗位',
                        align: 'center',
                        slot: 'jobsName'
                    },
                    {
                        title: '性质',
                        align: 'center',
                        slot: 'natureName'
                    }
                ],
                time: '',
                dataList: [],
                total: 0,
                loading: false
            }
        },
        mounted() {
            this.queryCollections()
            this.getCompany()
            this.getNatures()
            this.getJobs()
        },
        methods: {
            // 获取岗位
            getNatures() {
                getNatures().then(res => {
                    console.log(res, 'res')
                    Object.keys(res.data).forEach(item => {
                        this.naturesList.push({
                            value: item,
                            label: res.data[item]
                        })
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            // 首次获取数据
            query() {
                this.obj.page = 1
                this.queryCollections()
            },
            // 查询数据
            queryCollections() {
                this.loading = true
                let para = JSON.parse(JSON.stringify(this.obj))
                para.beginTime = new Date(this.time[0]).getTime() || ''
                para.endTime = new Date(this.time[1]).getTime() || ''
                queryCollections(para).then(res => {
                    this.loading = false
                    if (res.code === 0) {
                        this.total = res.data.count
                        this.obj.page = 1
                        this.dataList = res.data.list
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
            // 改变时间
            handleChange(date) {
                this.time = date
            },
            // 分页跳转
            changePage(data) {
                this.obj.page = data
                this.loading = true
                let para = JSON.parse(JSON.stringify(this.obj))
                para.beginTime = new Date(this.time[0]).getTime() || ''
                para.endTime = new Date(this.time[1]).getTime() || ''
                queryCollections(para).then(res => {
                    this.loading = false
                    if (res.code === 0) {
                        this.total = res.data.count
                        this.dataList = res.data.list
                    }
                }).catch(err => {
                    this.loading = false
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
.face {
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
    margin-right: 20px;
    width: 200px;
    text-align: left;
}
.flex {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
}
.table-box {
    margin-top: 10px;
    clear: both;
}
.date-box {
    margin-right: 20px;
}
</style>
