import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
  LuRepeat,
} from "react-icons/lu";
import { FaRegListAlt } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa6";


export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Recurring Payments",
    icon: LuRepeat,
    path: "/recurring-payments",
  },
  {
    id: "03",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "04",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "05",
    label: "Categories",
    icon: FaRegListAlt,
    path: "/categories",
  },
  {
    id: "06",
    label: "Goals",
    icon: FaBullseye,
    path: "/goals",
  },
  {
    id: "07",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
