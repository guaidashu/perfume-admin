<template>
    <div>
        <Button type="success" size="large" :loading="refreshLoading" @click="init">刷新
        </Button>
        <div style="width: 100%; height: 15px;"></div>
        <Table :data="typeData.docs" :columns="typeColumns" :loading="loading">
            <template slot-scope="{row, index}" slot="action">
                <Button type="error" size="small" @click="deleteType(row)">删除</Button>
                <Button type="primary" size="small" style="margin-left: 10px;" @click="showModal(row)">修改</Button>
            </template>
        </Table>
        <div style="width: 100%; height: 15px;"></div>
        <Page :current="typeData.page" :total="typeData.total" :page-size="typeData.limit"
              @on-change="(p) => {this.page=p}"></Page>
        <Modal v-model="typeModal">
            <Form :model="form" :rules="formRule">
                <FormItem label="类型名" prop="name">
                    <Input type="text" v-model="form.name"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" @click="uploadTypeInfo">确认提交</Button>
                <Button type="error" size="large" @click="closeModal">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { deleteType, getTypeData, uploadTypeInfo } from '../../api/goods'

    export default {
        name: 'typeManager',
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入类型名'))
                } else {
                    callback()
                }
            }
            return {
                typeData: [],
                typeColumns: [
                    {
                        title: '类型名',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                page: 1,
                loading: true,
                refreshLoading: true,
                typeModal: false,
                form: {
                    name: ''
                },
                formRule: {
                    name: [
                        { validator: validateName, required: true, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            init () {
                this.getTypeData()
            },
            getTypeData () {
                this.loading = true
                this.refreshLoading = true
                getTypeData({ page: this.page }).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.typeData = data.result
                        this.loading = false
                        this.refreshLoading = false
                    }
                })
            },
            showModal (row) {
                this.form = Object.assign({}, row)
                this.typeModal = true
            },
            closeModal () {
                this.typeModal = false
            },
            uploadTypeInfo () {
                uploadTypeInfo(this.form).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.$Message.success('修改成功')
                        this.closeModal()
                        this.init()
                    } else {
                        this.$Message.error(data.msg)
                    }
                })
            },
            deleteType (row) {
                if (!confirm('确认删除？')) {
                    return
                }
                deleteType({ _id: row._id }).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.$Message.success('删除成功')
                        this.init()
                    } else {
                        this.$Message.error('删除失败')
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
