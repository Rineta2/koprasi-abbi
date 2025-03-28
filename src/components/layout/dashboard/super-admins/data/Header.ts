import { FiHome, FiSettings } from "react-icons/fi";

import { RiAdminFill } from "react-icons/ri";

import { GrArticle, GrTransaction } from "react-icons/gr";

import { FiLayout } from "react-icons/fi";

import { GoProject } from "react-icons/go";

import { TbReportAnalytics } from "react-icons/tb";

import { IoMdContact } from "react-icons/io";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/super-admins",
  },

  {
    icon: FiLayout,
    label: "Layout 1",
    href: "/dashboard/super-admins/layout-1",
    subItems: [
      { label: "Home", href: "/dashboard/super-admins/layout/home" },

      {
        label: "Partner",
        href: "/dashboard/super-admins/layout/partner",
      },

      {
        label: "About",
        href: "/dashboard/super-admins/layout/about",
      },

      {
        label: "Legalitasi Company",
        href: "/dashboard/super-admins/layout/legalitasi-company",
      },

      {
        label: "Trend Bisnis",
        href: "/dashboard/super-admins/layout/trend-bisnis",
      },

      {
        label: "Insplensiasi",
        href: "/dashboard/super-admins/layout/insplensiasi",
      },

      {
        label: "Assets",
        href: "/dashboard/super-admins/layout/assets",
      },

      {
        label: "Data Blockchain",
        href: "/dashboard/super-admins/layout/data-blockchain",
      },

      {
        label: "Impian Anda",
        href: "/dashboard/super-admins/layout/impian-anda",
      },

      {
        label: "Pendaftaran Anggota",
        href: "/dashboard/super-admins/layout/pendaftaran-anggota",
      },
    ],
  },

  {
    icon: FiLayout,
    label: "Layout 2",
    href: "/dashboard/super-admins/layout-2",
    subItems: [
      {
        label: "Prize Pool",
        href: "/dashboard/super-admins/layout/prize-pool",
      },

      {
        label: "Bonus Sponsor",
        href: "/dashboard/super-admins/layout/bonus-sponsor",
      },

      {
        label: "Program AFFILIATE",
        href: "/dashboard/super-admins/layout/program-affiliate",
      },

      {
        label: "Reward",
        href: "/dashboard/super-admins/layout/reward",
      },

      {
        label: "Potensi Sponsor",
        href: "/dashboard/super-admins/layout/potensi-sponsor",
      },

      {
        label: "Sisa Hasil Usaha",
        href: "/dashboard/super-admins/layout/sisa-hasil-usaha",
      },

      {
        label: "PROGRAM AFFILIATE KOPERASI ABBI",
        href: "/dashboard/super-admins/layout/program-affiliate-koperasi-abbi",
      },

      {
        label: "Testimonials",
        href: "/dashboard/super-admins/layout/testimonials",
      },
    ],
  },

  {
    icon: GoProject,
    label: "Product",
    href: "/dashboard/super-admins/product",
    subItems: [
      {
        label: "Product",
        href: "/dashboard/super-admins/product",
      },

      {
        label: "Status",
        href: "/dashboard/super-admins/product/status",
      },

      {
        label: "Category",
        href: "/dashboard/super-admins/product/category",
      },

      {
        label: "Tags",
        href: "/dashboard/super-admins/product/tags",
      },
    ],
  },

  {
    icon: GrArticle,
    label: "Article",
    href: "/dashboard/super-admins/article",
  },

  {
    icon: GrTransaction,
    label: "Transaction",
    href: "/dashboard/super-admins/transaction",
    subItems: [
      {
        label: "Daftar Transaksi",
        href: "/dashboard/super-admins/transaction",
      },

      {
        label: "Sudah Dibayar",
        href: "/dashboard/super-admins/transaction/paid",
      },

      {
        label: "Belum Dibayar",
        href: "/dashboard/super-admins/transaction/unpaid",
      },

      {
        label: "Dibatalkan",
        href: "/dashboard/super-admins/transaction/cancelled",
      },
    ],
  },

  {
    icon: TbReportAnalytics,
    label: "Rekap",
    href: "/dashboard/super-admins/rekap",
    subItems: [{ label: "Rekap", href: "/dashboard/super-admins/rekap" }],
  },

  {
    icon: IoMdContact,
    label: "Contact",
    href: "/dashboard/super-admins/contact",
  },

  {
    icon: RiAdminFill,
    label: "Accounts",
    href: "/dashboard/super-admins/accounts",
    subItems: [
      { label: "Admins", href: "/dashboard/super-admins/accounts/admins" },
      { label: "User", href: "/dashboard/super-admins/accounts/user" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/super-admins/settings",
    subItems: [
      { label: "Profile", href: "/dashboard/super-admins/settings/profile" },
      { label: "Security", href: "/dashboard/super-admins/settings/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
