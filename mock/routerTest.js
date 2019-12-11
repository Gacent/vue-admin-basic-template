const path = [
  // 测试用
  {
    path: '/test',
    component: 'Layout',
    redirect: '/test/test1',
    meta: { title: 'Test', icon: 'dashboard' },
    children: [{
      path: 'test1',
      name: 'Test1',
      component: 'test/test1',
      meta: { title: 'Test1', icon: 'dashboard' }
    }, {
      path: 'test2',
      name: 'Test2',
      component: 'test/test2',
      meta: { title: 'Test2', icon: 'dashboard' }
    }]
  }
]
export default [
  {
    url: '/router/testList',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: path
      }
    }
  }
]
