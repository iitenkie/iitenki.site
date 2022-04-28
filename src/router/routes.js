const routes = [
  {
    path: "/yuyuyu-tools",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "emote-generator" },/*
      {
        path: "get-thumbnail",
        component: () => import("pages/GetThumbnail.vue"),
        name: "获取N站视频高清封面"
      },*/
      {
        path: "emote-generator",
        component: () => import("pages/EmoteGenerator.vue"),
        name: "鱼表情包生成器"
      }
    ]
  },
  {
    path: "/bot-panel",
    component: () => import("layouts/BotPanel.vue"),
    children: [
      { path: "", redirect: "image-storage" },
      {
        path: "login",
        component: () => import("pages/PanelLogin.vue"),
        name: "登录"
      },
      {
        path: "image-storage",
        component: () => import("pages/ImageStorage.vue"),
        name: "图片存储"
      }
    ]
  },
  {
    path: "/",
    component: () => import("pages/GetThumbnail.vue")
  },
  {
    path: "/yuyuyui-translating-helper",
    component: () => import("pages/YuyuyuiTranslatingHelper.vue")
  },
  {
    path: "/yushadearu-logo-generator",
    component: () => import("pages/YushadearuLogoGenerator.vue")
  },
  {
    path: "/ranking-config-maker",
    component: () => import("pages/RankingConfigMaker.vue")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
