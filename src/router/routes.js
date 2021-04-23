const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/get-thumbnail" },
      { path: "get-thumbnail", component: () => import("pages/GetThumbnail.vue"), name: "获取N站视频高清封面" },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
