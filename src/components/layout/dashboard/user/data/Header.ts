import { FiHome, FiSettings } from "react-icons/fi";

import { GrTransaction } from "react-icons/gr";

import { RiUserCommunityFill } from "react-icons/ri";

import { GoProject } from "react-icons/go";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/user",
  },

  {
    icon: RiUserCommunityFill,
    label: "Community",
    href: "/dashboard/user/community",
  },

  {
    icon: GoProject,
    label: "Product",
    href: "/dashboard/user/product",
  },

  {
    icon: GrTransaction,
    label: "Transaksi",
    href: "/dashboard/user/transaction",
    subItems: [
      { label: "Daftar Transaksi", href: "/dashboard/user/transaction" },
      { label: "Transaksi Berbayar", href: "/dashboard/user/transaction/paid" },
      { label: "Belum Dibayar", href: "/dashboard/user/transaction/unpaid" },
      { label: "Dibatalkan", href: "/dashboard/user/transaction/cancelled" },
      { label: "Selesai", href: "/dashboard/user/transaction/completed" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/user/profile",
    subItems: [
      { label: "Profile", href: "/dashboard/user/profile" },
      { label: "Alamat", href: "/dashboard/user/profile/address" },
      { label: "Security", href: "/dashboard/user/profile/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
