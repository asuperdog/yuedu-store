<template>
  <div>
    <el-table v-loading="loading" :data="books" ref="multipleTable" border style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="image" label="封面" width="80" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.image" :lazy="true" style="height: 50px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="120" sortable align="center"></el-table-column>
      <el-table-column prop="title" label="书名" width="150" align="center"></el-table-column>
      <el-table-column prop="cid" label="分类" width="80" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" width="150" align="center"></el-table-column>
      <el-table-column prop="sellPoint" label="简介" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" width="80" :formatter="formatPrice" align="center"></el-table-column>
      <el-table-column prop="num" label="库存" width="80" align="center"></el-table-column>
      <el-table-column prop="barcode" label="ISBN" width="150" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="80" :formatter="formatStatus" align="center">
      </el-table-column>
      <el-table-column prop="created" label="创建日期" width="180" align="center"></el-table-column>
      <el-table-column prop="updated" label="编辑日期" width="180" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)"
              :disabled="btnDisabled">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button size="mini" type="success" class="el-icon-upload2" @click="onBatch()" :disabled="btnDisabled"> 上架
      </el-button>
      <el-button size="mini" type="warning" class="el-icon-download" @click="offBatch()" :disabled="btnDisabled"> 下架
      </el-button>
      <el-button size="mini" type="danger" class="el-icon-delete" @click="deleleBatch()" :disabled="btnDisabled">
        批量删除</el-button>
      <el-button size="mini" @click="toggleSelection()">取消选择</el-button>
      <el-pagination background layout="total, prev, pager, next" style="float: right" :total="total"
        :current-page="currentPage" :page-size="pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :rules="rules" :model="newItem" ref="newItem" label-width="auto" status-icon>
        <el-form-item label="ＩＤ">
          <el-input v-model="newItem.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="title">
          <el-input v-model.lazy="newItem.title"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model.lazy="newItem.author"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number.trim="newItem.price"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="num">
          <el-input v-model.number.trim="newItem.num"></el-input>
        </el-form-item>
        <el-form-item label="书号" prop="barcode">
          <el-input v-model.number.trim="newItem.barcode"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="sellPoint">
          <el-input v-model.lazy="newItem.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-input v-model.lazy="newItem.image"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit('newItem')" :disabled="btnDisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        books: [],
        idSelected: [],
        total: null,
        loading: true,
        btnDisabled: false,
        pageSize: 5,
        currentPage: 1,
        newItem: {
          cid: '',
          num: '',
          image: '',
          title: '',
          price: '',
          author: '',
          barcode: '',
          sellPoint: ''
        },
        rules: {
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
            message: '请正确的输入图书价格'
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
            message: '请正确的输入图书 ISBN'
          }]
        },
        multipleSelection: [],
        dialogFormVisible: false
      }
    },
    mounted() {
      var access = window.sessionStorage.getItem('account')
      if (access) {
        this.showItem()
      } else {
        this.$message({
          type: 'warning',
          message: '请先登录系统!'
        })
        this.$router.push('/login')
      }
    },
    methods: {
      showItem() {
        this.$axios({
          method: 'post',
          url: '//api.superdog.tech:8082/rest/item',
          data: this.$qs.stringify({
            page: this.currentPage,
            rows: this.pageSize
          })
        }).then(res => {
          this.books = res.data.rows
          this.total = res.data.total
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取图书失败!'
          })
        })
      },
      editItem(item) {
        this.btnDisabled = true
        this.$axios({
          method: 'post',
          url: '//api.superdog.tech:8082/rest/editItem',
          data: this.$qs.stringify(this.newItem)
        }).then(res => {
          if (res.status == 200) {
            this.showItem()
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
          }
          this.btnDisabled = false
        }).catch(error => {
          this.btnDisabled = false
          this.$message({
            type: 'error',
            message: '编辑失败!'
          })
        })
      },
      deleteItem(ids) {
        this.btnDisabled = true
        this.$axios({
          method: 'post',
          url: '//api.superdog.tech:8082/rest/delItem',
          data: this.$qs.stringify({
            ids: ids
          })
        }).then(res => {
          this.status = res.data.status
          if (this.status == 200) {
            this.showItem()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.btnDisabled = false
        }).catch(error => {
          this.btnDisabled = false
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      },
      onShelf(ids) {
        this.btnDisabled = true
        this.$axios({
          method: 'post',
          url: '//api.superdog.tech:8082/rest/onShelf',
          data: this.$qs.stringify({
            ids: this.idSelected
          })
        }).then(res => {
          this.status = res.data.status
          if (this.status == 200) {
            this.showItem()
            this.$message({
              type: 'success',
              message: '上架成功!'
            })
          }
          this.btnDisabled = false
        }).catch(error => {
          this.btnDisabled = false
          this.$message({
            type: 'error',
            message: '上架失败!'
          })
        })
      },
      offShelf(ids) {
        this.btnDisabled = true
        this.$axios({
          method: 'post',
          url: '//api.superdog.tech:8082/rest/offShelf',
          data: this.$qs.stringify({
            ids: this.idSelected
          })
        }).then(res => {
          this.status = res.data.status
          if (this.status == 200) {
            this.showItem()
            this.$message({
              type: 'success',
              message: '下架成功!'
            })
          }
          this.btnDisabled = false
        }).catch(error => {
          this.btnDisabled = false
          this.$message({
            type: 'error',
            message: '下架失败!'
          })
        })
      },

      formatPrice: function(row, column) {
        return ((row.price) / 100).toFixed(2)
      },
      formatStatus: function(row, column) {
        return row.status == '1' ? "上架" : row.status == '2' ? "下架" : "未知"
      },

      onBatch() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'info',
            message: '请至少选中一本图书'
          })
        } else {
          this.$confirm('此操作将上架选中图书, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.onShelf(this.idSelected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消上架'
            })
          })
        }
      },
      offBatch() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'info',
            message: '请至少选中一本图书'
          })
        } else {
          this.$confirm('此操作将下架选中图书, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.offShelf(this.idSelected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下架'
            })
          })
        }
      },
      deleleBatch() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'info',
            message: '请至少选中一本图书'
          })
        } else {
          this.$confirm('此操作将永久删除选中图书, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteItem(this.idSelected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.idSelected = [] // 每次点击需清空原本数组的内容
        this.multipleSelection.map(item => { // 遍历数组，把id存进自定义的数组里
          this.idSelected.push(item.id)
        })
        this.idSelected = this.idSelected.join(',')
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        this.currentPage = val
        this.loading = true
        this.showItem()
      },
      handleEdit(index, row) {
        // 将数据的index传递过来用于实现数据的回显
        delete row.images
        delete row.status
        delete row.created
        delete row.updated
        this.newItem = JSON.parse(JSON.stringify(row))
        // 设置对话框的可见
        this.dialogFormVisible = true
      },
      handleDelete(index, id) {
        this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteItem(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      updateSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.editItem(this.newItem)
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'warning',
              message: '请正确输入信息!'
            })
            return false
          }
        })
      }
    }
  }
</script>

<style>
</style>
