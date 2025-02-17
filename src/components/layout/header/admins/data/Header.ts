import { FiHome, FiSettings } from "react-icons/fi";

import { RiAdminFill } from "react-icons/ri";

import { MdFeaturedPlayList } from "react-icons/md";

import { GrArticle } from "react-icons/gr";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/admins/dashboard",
  },

  {
    icon: RiAdminFill,
    label: "Layout",
    href: "/admins/dashboard/layout",
    subItems: [
      { label: "Home", href: "/admins/dashboard/layout/home" },
      { label: "About", href: "/admins/dashboard/layout/about" },
      { label: "Skills", href: "/admins/dashboard/layout/skills" },
      { label: "Achievements", href: "/admins/dashboard/layout/achievements" },
    ],
  },

  {
    icon: MdFeaturedPlayList,
    label: "Portofolio",
    href: "/admins/dashboard/portofolio",
    subItems: [
      { label: "Daftar Portofolio", href: "/admins/dashboard/portofolio" },
    ],
  },

  {
    icon: GrArticle,
    label: "Article",
    href: "/admins/dashboard/article",
    subItems: [
      { label: "Daftar Article", href: "/admins/dashboard/article" },
      { label: "Daftar Category", href: "/admins/dashboard/article/category" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/admins/settings",
    subItems: [
      { label: "Profile", href: "/admins/settings/profile" },
      { label: "Security", href: "/admins/settings/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
