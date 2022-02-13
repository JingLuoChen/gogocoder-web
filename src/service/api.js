import { service as axios } from './request'

let baseUrl = process.env.NODE_ENV === "development" ? '/sys' : '//gogocoder.com/ggc'

// 获取所有公司名称
export function getAllCompany(params) {
    return axios.post(`${baseUrl}/company/getAll`, params)
}

// 获取公司部门
export function getByCompany(params) {
    return axios.post(`${baseUrl}/department/getByCompany`,{}, {params})
}

// 获取职位
export function getJobs(params) {
    return axios.post(`${baseUrl}/other/getJobs`, params)
}

// 获取所有科目
export function getSubjectAll(params) {
    return axios.post(`${baseUrl}/subject/getAll`, params)
}

// 根据科目编码获取子类科目
export function getSubListBySubjectId(params) {
    return axios.post(`${baseUrl}/subject/getSubListBySubjectId`, {}, {params})
}

// 首页首次进入
export function queryRecommend() {
    return axios.post(`${baseUrl}/query/recommend`)
}

// 根据参数查询数据
export function queryByParam(params) {
    return axios.post(`${baseUrl}/query/queryByParam`, {}, {params})
}

// 根据参数查询岗位
export function getNatures(params) {
    return axios.post(`${baseUrl}/other/getNatures`, params)
}

// 根据参数查询面经
export function queryCollections(params) {
    return axios.post(`${baseUrl}/query/queryCollections`, {}, {params})
}
