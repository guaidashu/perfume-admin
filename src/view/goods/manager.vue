<template>
    <div>
        <Button type="primary" size="large" @click="showModal('upload')">新增商品</Button>
        <Button type="success" size="large" style="margin-left: 15px;" :loading="refreshLoading" @click="init">刷新
        </Button>
        <div style="width: 100%; height: 15px;"></div>
        <Table :data="goodsData.docs" :columns="goodsColumns" :loading="loading">
            <template slot-scope="{row, index}" slot="action">
                <Button type="error" size="small" @click="deleteGoods(row)">删除</Button>
                <Button type="primary" size="small" style="margin-left: 10px;" @click="initUpdateModal(row)">修改</Button>
            </template>
        </Table>
        <div style="width: 100%; height: 15px;"></div>
        <Page :total="goodsData.total" :page-size="goodsData.limit" :current="goodsData.page"
              @on-change="(p) => {this.page=p}"></Page>
        <Modal v-model="addGoodsModal" title="添加商品信息">
            <upload-goods @init="init" ref="uploadGoods"></upload-goods>
            <div slot="footer">
                <Button type="primary" size="large" @click="addGoods">确认新增</Button>
                <Button type="error" size="large" @click="closeModal('upload')">关闭</Button>
            </div>
        </Modal>
        <Modal v-model="updateModal" title="修改商品信息">
            <upload-goods :product-info="productInfo" @init="init" ref="updateGoods"></upload-goods>
            <div slot="footer">
                <Button type="primary" size="large" @click="uploadGoods">确认修改</Button>
                <Button type="error" size="large" @click="closeModal('update')">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import uploadGoods from './comonents/uploadGoods'
    import { deleteGoods, getGoodsInfo } from '../../api/goods'

    export default {
        components: {
            uploadGoods
        },
        name: 'manager',
        data () {
            return {
                goodsData: [],
                goodsColumns: [
                    {
                        title: '商品名',
                        key: 'productName'
                    },
                    {
                        title: '价格',
                        key: 'salePrice'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                page: 1,
                loading: true,
                refreshLoading: true,
                addGoodsModal: false,
                updateModal: false,
                productInfo: {}
            }
        },
        methods: {
            init () {
                this.getGoodsInfo()
            },
            getGoodsInfo () {
                this.loading = true
                this.refreshLoading = true
                getGoodsInfo({ page: this.page }).then(res => {
                    if (res.data.status === 0) {
                        this.goodsData = res.data.result
                        this.loading = false
                        this.refreshLoading = false
                    }
                })
            },
            deleteGoods (row) {
                if (!confirm('确认删除')) {
                    return
                }
                deleteGoods({ _id: row._id }).then(res => {
                    if (res.data.status === 0) {
                        this.$Message.success('删除成功')
                        this.init()
                    } else {
                        this.$Message.error('删除失败')
                    }
                })
            },
            showModal (flag) {
                switch (flag) {
                    case 'upload': this.addGoodsModal = true; break;
                    case 'update': this.updateModal = true; break;
                }
            },
            initUpdateModal(row) {
                this.showModal('update')
                this.productInfo = row
            },
            closeModal (flag) {
                switch (flag) {
                    case 'upload': this.addGoodsModal = false; break;
                    case 'update': this.updateModal = false; break;
                }
            },
            addGoods () {
                this.$refs.uploadGoods.addGoods()
            },
            uploadGoods() {
                this.$refs.updateGoods.uploadGoods()
            }
        },
        watch: {
            'page': 'init'
        },
        mounted () {
            this.init()
        }
    }
</script>

<style scoped>

</style>
