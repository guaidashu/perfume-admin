<template>
    <div>
        <Table :loading="loading" :data="userData.docs" :columns="userColumns">
            <template slot-scope="{row, index}" slot="action">
                <Button type="error" size="small">删除</Button>
                <Button type="primary" size="small" style="margin-left: 10px;">修改密码</Button>
            </template>
        </Table>
        <div style="width: 100%; height: 15px;"></div>
        <Page :current="userData.page" :total="userData.total" :page-size="userData.limit"
              @on-change="(p) => {this.page=p}"></Page>
    </div>
</template>

<script>
    import { getUserInfo } from '../../api/users'

    export default {
        name: 'manager',
        data () {
            return {
                userData: [],
                userColumns: [
                    {
                        title: '用户编号',
                        key: 'userId'
                    },
                    {
                        title: '用户名',
                        key: 'userName'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                page: 1,
                loading: true
            }
        },
        methods: {
            init () {
                this.getUserInfo()
            },
            getUserInfo () {
                this.loading = true
                getUserInfo({ page: this.page }).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.userData = data.result
                        this.loading = false
                    }
                })
            }
        },
        mounted () {
            this.init()
        }
    }
</script>

<style scoped>

</style>
