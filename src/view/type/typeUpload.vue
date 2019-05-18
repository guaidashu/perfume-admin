<template>
    <div>
        <div class="main_container">
            <Form :model="form" ref="formCustom" :rules="formRule">
                <FormItem label="类型名称" prop="name">
                    <Input type="text" v-model="form.name"></Input>
                </FormItem>
            </Form>
            <div style="width: 89px; margin: 0 auto;">
                <Button type="primary" size="large" @click="uploadType">确认上传</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import { uploadType } from '../../api/goods'

    export default {
        name: 'typeUpload',
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入类型名'))
                } else {
                    callback()
                }
            };
            return {
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
            uploadType () {
                uploadType(this.form).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.$Message.success('上传成功')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .main_container {
        width: 500px;
        margin: 0 auto;
    }
</style>
