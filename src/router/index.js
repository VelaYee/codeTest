import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

// 重写push/replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 代表滚动条在最上方（最小是0）
    return { y: 0 };
  },
});

// 全局守卫：前置守卫（在路由跳转间进行判断）
// to: 即将要进入的目标
// from: 当前导航正要离开的路由
// 可选参数next:是一个函数，放行函数 next()放行 next('/home')放行至指定路径 next(false)中断当前导航
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //   用户已登录
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      // 已登录的用户查看用户名
      if (name) {
        next();
      } else {
        //   没有用户信息,派发action让仓库存储用户信息再跳转 由于token存在 表示已经登录 这样在每个路由下进行刷新都可以获取到用户信息了
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token过期了 获取不到用户信息 重新登录
          // 派发action 清除token
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    let toPath = to.path;
    // console.log(toPath.indexOf("/trade"));
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //记录下想要去的路由 在登录后直接跳转到想去的页面
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
