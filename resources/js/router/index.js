import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import StudentLayout from '../layouts/StudentLayout.vue'
import { useAuthStore } from '../store/auth'
import AdminGenerateTest from '@/views/Admin/GenerateTest.vue'
import ViewTestList from '../views/Admin/ViewTestList.vue'
import UserManager from '../views/Admin/UserManager.vue'
import TestJax from '../views/TestJax.vue'
const routes = [
    {
    path: '/testjax',
    component: TestJax,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresGuest: false }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'Admin' },
    children: [
        { path: 'users', component: UserManager },
        { path: '', name: 'AdminHome', component: Home },
        { path: 'generate-test', name: 'AdminGenerateTest', component: AdminGenerateTest },
        { path: 'tests', component: ViewTestList },
    ]
  },
  {
    path: '/student',
    component: StudentLayout,
    meta: { requiresAuth: true, role: 'Student' },
    children: [
        { path: '', name: 'StudentHome', component: Home }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (auth.token && !auth.user) {
    try {
      await auth.fetchUser()
    } catch (error) {
      auth.logout()
    }
  }
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    return next('/')
  }
  if (to.meta.role && auth.role !== to.meta.role) {
    return next('/')
  }

  return next()
})

export default router
