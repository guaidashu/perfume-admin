<template>
    <div>
        <Button type="success" size="large" :loading="refreshLoading" @click="init">刷新
        </Button>
        <div style="width: 100%; height: 15px;"></div>
        <Table :loading="loading" :data="userData.docs" :columns="userColumns">
            <template slot-scope="{row, index}" slot="action">
                <Button type="error" size="small" @click="deleteUser(row)">删除</Button>
                <Button type="primary" size="small" style="margin-left: 10px;" @click="showModal(row)">修改密码
                </Button>
            </template>
        </Table>
        <div style="width: 100%; height: 15px;"></div>
        <Page :current="userData.page" :total="userData.total" :page-size="userData.limit"
              @on-change="(p) => {this.page=p}"></Page>
        <Modal v-model="passwordModal" title="修改密码">
            <Form ref="formCustom" :model="form" :rules="formRule">
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="form.password"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="rePassword">
                    <Input type="password" v-model="form.rePassword"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" @click="changePassword">确认修改</Button>
                <Button type="error" size="large" @click="closeModal">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { changePassword, deleteUser, getUserInfo } from '../../api/users'

    export default {
        name: 'manager',
        data () {
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'))
                } else {
                    console.log('????')
                    if (this.rePassword !== '') {
                        this.$refs.formCustom.validateField('rePassword')
                    }
                    callback()
                }
            }
            const validateRePassword = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('密码不能为空'))
                } else {
                    if (value !== this.form.password) {
                        callback(new Error('两次密码不一致，请重新输入'))
                    }
                    callback()
                }
            }
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
                        title: '电话号码',
                        key: 'userPhone'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                page: 1,
                loading: true,
                refreshLoading: true,
                passwordModal: false,
                form: {
                    password: '',
                    rePassword: ''
                },
                formRule: {
                    password: [
                        { required: true, validator: validatePassword, trigger: 'blur' }
                    ],
                    rePassword: [
                        { required: true, validator: validateRePassword, trigger: 'blur' }
                    ],
                },
                userInfo: {}
            }
        },
        methods: {
            init () {
                this.getUserInfo()
            },
            getUserInfo () {
                this.refreshLoading = true
                this.loading = true
                getUserInfo({ page: this.page }).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.userData = data.result
                        this.loading = false
                        this.refreshLoading = false
                    }
                })
            },
            changePassword () {
                changePassword({ _id: this.userInfo._id, password: this.form.password }).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.$Message.success('修改成功')
                        this.closeModal()
                    }
                })
            },
            showModal (row) {
                this.passwordModal = true
                this.userInfo = row
            },
            closeModal () {
                this.passwordModal = false
            },
            deleteUser (row) {
                if (!confirm('确认删除？')) {
                    return
                }
                deleteUser({_id: row._id}).then(res => {
                    let data = res.data
                    if (data.status === 0){
                        this.$Message.success("删除成功")
                        this.init()
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
