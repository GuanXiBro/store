import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404')
    },
    {
        path: '/front',
        name: 'Front',
        component: () => import('../views/front/Front'),
        children: [
            {path: 'home', name: 'FrontHome', component: () => import('../views/front/Home')},
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 提供一个重置路由的方法
export const resetRouter = () => {
    router.matcher = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
}

export const setRoutes = () => {
    const storeMenus = localStorage.getItem("menus");
    if (storeMenus) {


        // 获取当前的路由对象名称数组
        const currentRouteNames = router.getRoutes().map(v => v.name)
        if (!currentRouteNames.includes('ManageView')) {
            //拼装动态路由
            const manageRoute = {
                path: '/',
                name: 'ManageView',
                component: () => import('../views/ManageView'),
                redirect: "/home",
                children: [
                    {path: 'person', name: '个人信息', component: () => import('../views/PersonInfo')},
                    {path: 'password', name: '修改密码', component: () => import('../views/Password')}
                ]
            }
            const menus = JSON.parse(storeMenus)
            menus.forEach(item => {
                if (item.url) {
                    let itemMenu = {
                        path: item.url.replace("/", ""),
                        name: item.name,
                        component: () => import('../views/' + item.pagepath)
                    }
                    manageRoute.children.push(itemMenu)
                } else if (item.children.length) {
                    item.children.forEach(item => {
                        if (item.url) {
                            let itemMenu = {
                                path: item.url.replace("/", ""),
                                name: item.name,
                                component: () => import('../views/' + item.pagepath)
                            }
                            manageRoute.children.push(itemMenu)
                        }
                    })
                }
            })
            // 动态添加到现在的路由对象中去
            router.addRoute(manageRoute)
        }
    }
}
// 重置我就再set一次路由
setRoutes()

//路由守卫
router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)
    store.commit("setPath")
    // 未找到路由的情况
    if (!to.matched.length) {
        const storeMenus = localStorage.getItem("menus")
        if (storeMenus) {
            next("/404")
        } else {
            // 跳回登录页面
            next("/login")
        }
    }
// 其他的情况都放行
    next()
})

export default router
