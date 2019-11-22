import blog from '@/api/blog'

export default {
    name: 'user',
    data() {
        return {
            blogs: [],
            user: {},
            page: 1,
            total: 0,
            userId: ''
        }
    },
    created() {
        this.userId = this.$route.params.userId
        this.page = parseInt(this.$route.query.page) || 1 //刷新之后仍然在刚刚浏览的页面
        blog.getBlogsByUserId(this.userId, { page: this.page })
            .then(res => {
                console.log(res)
                this.page = res.page
                this.total = res.total
                this.blogs = res.data
                if (res.data.length > 0) {
                    this.user = res.data[0].user
                }
            })
    },
    methods: {
        splitDate(dataStr) {
            let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
            return {
                date: dateObj.getDate(),
                month: dateObj.getMonth() + 1,
                year: dateObj.getFullYear()
            }
        },
        handleCurrentChange(newPage) {
            blog.getBlogsByUserId(this.userId, {page: newPage}).then(res=> {
                console.log(res)
                this.blogs = res.data
                this.total = res.total
                this.page = res.page
                this.$router.push({path: `/user/${this.userId}`, query: {page: newPage}}) //跳转到到path:'/'，然后后面网址加上page=newPage
            })
        }
    }
}