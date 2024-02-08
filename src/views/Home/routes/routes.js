import { check_apps } from "@/permissoes";
export default {
  path: "/Home/",
  component: () => import("@/views/Home/Main.vue"),
  children: [
    { path: "", redirect: { name: "escola" } },
    {
      path: "dashboard",
      name: "dashboard",
      component: () => import("@/views/Home/childrens/Dashboard.vue"),
    },
    {
      path: "escola",
      name: "escola",
      component: () => import("@/views/Home/childrens/Escola/Escola.vue"),
    },
    {
      path: "etapa",
      name: "etapa",
      component: () => import("@/views/Home/childrens/Etapa/Etapa.vue"),
    },
    {
      path: "semana",
      name: "semana",
      component: () => import("@/views/Home/childrens/Semana/Semana.vue"),
    },
    {
      path: "professor",
      name: "professor",
      component: () => import("@/views/Home/childrens/Professor/Professor.vue"),
    },
    {
      path: "aluno",
      name: "aluno",
      component: () => import("@/views/Home/childrens/Aluno/Aluno.vue"),
    },
    {
      path: "video",
      name: "video",
      component: () => import("@/views/Home/childrens/Video/Video.vue"),
    },
    {
      path: "usuarios",
      name: "usuarios",
      beforeEnter(to, from, next) {
        if (check_apps()) return next();

        next({ path: from.path });
      },
      component: () => import("@/views/Home/childrens/Usuarios/Usuarios.vue"),
    },
  ],
};
