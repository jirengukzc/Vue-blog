import blog from '@/api/blog'
import { mapGetters } from 'vuex'

export default {
    name: 'my',
    data() {
        return {
            blogs: [],
            page: 1,
            total: 0
        }
    },
    computed: {
        ...mapGetters(['user']) //从vuex当中拿用户信息
    },
    created() {
        this.page = parseInt(this.$route.query.page) || 1 //刷新之后仍然在刚刚浏览的页面
        blog.getBlogsByUserId(this.user.id, { page: this.page })
            .then(res => {
                console.log(res)
                this.page = res.page
                this.total = res.total
                this.blogs = res.data
            })
    },
    methods: {
        async onDelete(blogId) {
            // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     return blog.deleteBlog({ blogId })
            // }).then(() => {
            //     this.$message.success('删除成功!')
            //     this.blogs = this.blogs.filter(blog => blog.id != blogId)
            // })

            await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
            await blog.deleteBlog({ blogId })
            this.$message.success('删除成功')
            this.blogs = this.blogs.filter(blog => blog.id != blogId)//过滤掉已经删除的的id
        },
        splitDate(dataStr) {
            let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
            return {
                date: dateObj.getDate(),
                month: dateObj.getMonth() + 1,
                year: dateObj.getFullYear()
            }
        },
        handleCurrentChange(newPage) {
            blog.getBlogsByUserId(this.user.id, { page: newPage }).then(res => {
                console.log(res)
                this.blogs = res.data
                this.total = res.total
                this.page = res.page
                this.$router.push({ path: "/my", query: { page: newPage } }) //跳转到到path:'/'，然后后面网址加上page=newPage
            })
        }
    }
}