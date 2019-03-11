import React from "react";
import Faker from "faker";
import Assessment from "@material-ui/icons/Assessment";
import GridOn from "@material-ui/icons/GridOn";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Web from "@material-ui/icons/Web";
import BorderClear from "@material-ui/icons/BorderClear";
import BorderOuter from "@material-ui/icons/BorderOuter";

const data = {
  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/dashboard" },
    { text: "Form Page", icon: <Web />, link: "/form" },
    {
      text: "Table Page",
      icon: <GridOn />,
      // link: "/table",
      subMenus: [
        {
          text: "Basic Table",
          icon: <BorderClear />,
          link: "/table/basic"
        },
        {
          text: "Data Table",
          icon: <BorderOuter />,
          link: "/table/data"
        }
      ]
    },
    { text: "Login Page", icon: <PermIdentity />, link: "/login" }
  ],
  user: {
    userName: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
    avatar: Faker.image.avatar()
  },
  tablePage: {
    items: Array.from({ length: 105 }, (item, index) => ({
      id: index,
      name: Faker.commerce.productName(),
      price: Faker.commerce.price(),
      category: Faker.commerce.productMaterial()
    }))
  },
  dashBoardPage: {
    recentProducts: [
      {
        id: 1,
        title: "Samsung TV",
        text: "Samsung 32 1080p 60Hz LED Smart HDTV."
      },
      { id: 2, title: "Playstation 4", text: "PlayStation 3 500 GB System" },
      {
        id: 3,
        title: "Apple iPhone 6",
        text: "Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G "
      },
      {
        id: 4,
        title: "Apple MacBook",
        text: "Apple MacBook Pro MD101LL/A 13.3-Inch Laptop"
      }
    ],
    monthlySales: [
      { name: "Jan", uv: 3700 },
      { name: "Feb", uv: 3000 },
      { name: "Mar", uv: 2000 },
      { name: "Apr", uv: 2780 },
      { name: "May", uv: 2000 },
      { name: "Jun", uv: 1800 },
      { name: "Jul", uv: 2600 },
      { name: "Aug", uv: 2900 },
      { name: "Sep", uv: 3500 },
      { name: "Oct", uv: 3000 },
      { name: "Nov", uv: 2400 },
      { name: "Dec", uv: 2780 }
    ],
    newOrders: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
    browserUsage: [
      { name: "Chrome", value: 800 },
      { name: "Firefox", value: 300 },
      { name: "Safari", value: 300 }
    ]
  }
};

export default data;
