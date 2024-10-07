import React, { useEffect } from "react";
// import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function SideBar() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  const location = useLocation();
  return (
    <div className="h-fit md:h-screen p-5 border shadow-sm">
      <div className="flex flex-row items-center">
        <img src={"/logo.svg"} alt="logo" width={40} height={25} />
        <span className="text-blue-800 font-bold text-xl">Finan Smart</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link to={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center
                    text-gray-500 font-medium
                    mb-2
                    p-4 cursor-pointer rounded-full
                    hover:text-primary hover:bg-blue-100
                    ${
                      location.pathname == menu.path &&
                      "text-primary bg-blue-100"
                    }
                    `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div
        className="p-5 flex gap-2
            items-center"
      >
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideBar;
