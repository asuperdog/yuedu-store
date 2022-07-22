<template>
  <div style="width: 600px">
    <el-form :rules="rules" :model="item" ref="item" label-width="100px" class="demo-form" status-icon>
      <el-form-item label="图书类目" prop="cid">
        <el-cascader v-model="item.cid" :props="props" :show-all-levels="false" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="图书名称" prop="title">
        <el-input v-model.lazy="item.title"></el-input>
      </el-form-item>
      <el-form-item label="图书作者" prop="author">
        <el-input v-model.lazy="item.author"></el-input>
      </el-form-item>
      <el-form-item label="图书价格" prop="price">
        <el-input v-model.number.trim="item.price" placeholder="无需小数点 (单位: 分)"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="num">
        <el-input v-model.number.trim="item.num"></el-input>
      </el-form-item>
      <el-form-item label="ＩＳＢＮ" prop="barcode">
        <el-input v-model.number.trim="item.barcode"></el-input>
      </el-form-item>
      <el-form-item label="图书简介" prop="sellPoint">
        <el-input v-model.lazy="item.sellPoint" placeholder="出版社 / 备注"></el-input>
      </el-form-item>
      <el-form-item label="图书封面">
        <el-input v-model.lazy="item.image" placeholder="上传后自动填写"></el-input>
        <el-upload class="upload-demo" ref="upload" name="uploadFile" action="//api.superdog.tech:8082/rest/pic/upload"
          :on-success="handleSuccess" :on-remove="handleRemove" :on-error="handleError" :data="item" :limit="1"
          accept=".jpg" :before-upload="beforeUpload" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传单个 1 MB 以内的 JPG 文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('item')" :disabled="btnDisabled">确认提交</el-button>
        <el-button @click="resetForm('item')">重置表单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      let self = this
      return {
        btnDisabled: false,
        item: {
          cid: '',
          num: '',
          image: '',
          title: '',
          price: '',
          author: '',
          barcode: '',
          sellPoint: ''
        },
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            setTimeout(() => {
              if (node.level == 0) {
                self.getCatList(node, resolve, true)
              } else if (node.level >= 1) {
                self.getCatList(node, resolve)
              }
            }, 500)
          }
        },
        rules: {
          cid: [{
            required: true,
            trigger: 'change',
            message: '请设置图书类目'
          }],
          title: [{
            required: true,
            trigger: 'blur',
            message: '请输入图书名称'
          }, {
            min: 1,
            max: 50,
            trigger: 'change',
            message: '长度在 1 - 50 个字符'
          }],
          author: [{
            required: true,
            trigger: 'blur',
            message: '请输入图书作者'
          }, {
            min: 1,
            max: 50,
            trigger: 'change',
            message: '长度在 1 - 50 个字符'
          }],
          price: [{
            required: true,
            trigger: 'blur',
            message: '请输入图书价格'
          }, {
            min: 1,
            type: 'integer',
            trigger: 'blur',
            message: '请输入正确的图书价格'
          }],
          num: [{
            required: true,
            trigger: 'blur',
            message: '请输入库存数量'
          }, {
            min: 0,
            max: 999,
            type: 'integer',
            trigger: 'blur',
            message: '长度在 0 - 999 的整数'
          }],
          barcode: [{
            required: true,
            trigger: 'blur',
            message: '请输入图书 ISBN'
          }, {
            trigger: 'blur',
            pattern: /^978\d{10}$/,
            message: '请输入正确的图书 ISBN'
          }]
        }
      }
    },
    mounted() {
      var access = window.sessionStorage.getItem('account')
      if (!access) {
        this.$message({
          message: '请先登录系统!',
          type: 'warning'
        })
        this.$router.push('/login')
      }
    },
    methods: {
      getCatList(node, resolve, isFirst) {
        let params = {}
        if (node && node.data) {
          params.id = node.value
        }
        this.$axios({
          method: 'get',
          params: params,
          url: '//api.superdog.tech:8082/rest/item/cat'
        }).then(res => {
          if (isFirst) {
            const parent = res.data.map((value, i) => ({
              value: value.id,
              label: value.name,
              leaf: !value.isParent
            }))
            resolve(parent)
          } else {
            const children = res.data.map((value, i) => ({
              value: value.id,
              label: value.name,
              leaf: !value.isParent
            }))
            resolve(children)
          }
        }).catch(error => {
          this.btnDisabled = false
          this.$message({
            type: 'error',
            message: '获取分类失败!'
          })
        })
      },
      addItem(item) {
        this.btnDisabled = true
        this.$axios({
          method: 'post',
          data: this.$qs.stringify(this.item),
          url: '//api.superdog.tech:8082/rest/addItem'
        }).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }
          this.btnDisabled = false
        }).catch(error => {
          this.btnDisabled = false
          this.$message({
            type: 'error',
            message: '添加失败!'
          })
        })
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isJPG) {
          this.$message.error('上传的图片只能是 JPG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传的图片大小不能超过 1 MB!')
        }
        return isJPG && isLt1M
      },
      handleRemove() {
        this.item.image = ''
      },
      handleSuccess(file) {
        this.item.image = file.url
      },
      handleError() {
        this.$message.error('图片上传失败!')
      },
      submitUpload() {
        this.$refs.upload.submit()
      },
      submitForm(form, item) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.item.cid = (this.item.cid).pop()
            this.addItem(item)
            // console.log(this.item)
          } else {
            return false
          }
        })
      },
      resetForm(form) {
        this.$refs[form].resetFields()
      }
    }
  }
</script>

<style>
</style>
