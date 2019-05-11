<template>
    <div>
        <Form ref="formCustom" :model="form" :rules="formRule" :label-width="80">
            <FormItem label="商品名" prop="productName">
                <Input type="text" v-model="form.productName"></Input>
            </FormItem>
            <FormItem label="商品价格" prop="salePrice">
                <Input type="text" v-model="form.salePrice"></Input>
            </FormItem>
        </Form>
        <div style="width: 100%; height: 15px;"></div>

        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="/api/admin/goods/uploadImage"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import { addGoods } from '../../../api/goods'

    export default {
        props: ['productInfo'],
        name: 'uploadGoods',
        data () {
            const validateProductName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入商品名'))
                }
            }
            const validateSalePrice = (rule, value, callback) => {
                if (value <= 0) {
                    callback(new Error('商品价格不能小于或等于0'))
                }
            }
            return {
                form: {
                    productName: '',
                    salePrice: 0,
                    productImage: [],
                    productId: ''
                },
                formRule: {
                    productName: [
                        { validator: validateProductName, trigger: 'blur' }
                    ],
                    salePrice: [
                        { validator: validateSalePrice, trigger: 'blur' }
                    ]
                },
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name
                this.visible = true
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
            },
            handleSuccess (res, file) {
                file.url = '/api/upload/' + res.result.filePath
                file.name = res.result.fileName
                this.uploadList = this.$refs.upload.fileList
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                })
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                })
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 1
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to one pictures can be uploaded.'
                    })
                }
                return check
            },
            addGoods () {
                this.form.productImage = this.uploadList[0].response.result.filePath
                this.form.productId = this.uploadList[0].name
                addGoods(this.form).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.$Message.success('添加成功')
                        this.form = {
                            productName: '',
                            salePrice: 0,
                            productImage: [],
                            productId: ''
                        }
                        console.log(this.uploadList)
                        this.refreshPage()
                    }
                })
            },
            uploadGoods () {
                console.log('修改信息')
            },
            refreshPage () {
                this.$emit('init')
            },
            init () {
                if (this.productInfo) {
                    this.form = this.productInfo
                    this.uploadList = [
                        {
                            url: '/api/upload/' + this.form.productImage,
                            name: this.form.productImage
                        }
                    ]
                }
                console.log(this.uploadList)
            }
        },
        watch: {
            'productInfo': 'init'
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList
        }
    }
</script>

<style scoped>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
