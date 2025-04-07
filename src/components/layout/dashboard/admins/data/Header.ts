import { FiHome, FiSettings } from "react-icons/fi";

import { GiCardboardBoxClosed } from "react-icons/gi";

import { FaRegNewspaper } from "react-icons/fa";

import { GrTransaction } from "react-icons/gr";

import { TbReportAnalytics } from "react-icons/tb";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/admins",
  },

  {
    icon: GiCardboardBoxClosed,
    label: "Project",
    href: "/dashboard/admins/project",
    subItems: [{ label: "Daftar Project", href: "/dashboard/admins/project" }],
  },

  {
    icon: GrTransaction,
    label: "Transaction",
    href: "/dashboard/admins/transaction",
    subItems: [
      {
        label: "Daftar Transaksi",
        href: "/dashboard/admins/transaction",
      },

      {
        label: "Sudah Dibayar",
        href: "/dashboard/admins/transaction/paid",
      },

      {
        label: "Belum Dibayar",
        href: "/dashboard/admins/transaction/unpaid",
      },

      {
        label: "Dibatalkan",
        href: "/dashboard/admins/transaction/cancelled",
      },
    ],
  },

  {
    icon: FaRegNewspaper,
    label: "Article",
    href: "/dashboard/admins/article",
    subItems: [{ label: "Daftar Article", href: "/dashboard/admins/article" }],
  },

  {
    icon: TbReportAnalytics,
    label: "Rekap",
    href: "/dashboard/admins/rekap",
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/admins/settings",
    subItems: [
      { label: "Profile", href: "/dashboard/admins/settings/profile" },
      { label: "Security", href: "/dashboard/admins/settings/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
