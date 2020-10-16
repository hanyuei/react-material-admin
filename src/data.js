import React from "react";
import Faker from "faker";
import Assessment from "@material-ui/icons/Assessment";
//import GridOn from "@material-ui/icons/GridOn";
//import PermIdentity from "@material-ui/icons/PermIdentity";
//import Web from "@material-ui/icons/Web";
//import BorderClear from "@material-ui/icons/BorderClear";
import BorderOuter from "@material-ui/icons/BorderOuter";

const data = {
  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/dashboard" },
    { text: "GBE Zoom Summary", icon: <BorderOuter />, link: "/reports/gbezoomsummary" },
    /*
    { text: "Form Page", icon: <Web />, link: "/form" },
    
    {
      text: "A Table Page",
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
    */
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
    chronicAbsence: [
      {
        id: 1,
        title: "J. Smith",
        text: "Last engaged: 10/01/2020"
      },
      { id: 2, title: "S. Pipps", 
        text: "Last engaged: 10/20/2020" },
      {
        id: 3,
        title: "W. Slate",
        text: "Last engaged: never"
      },
    ],
    dayPeriod: [
      { name: "8:30", uv: 3700 },
      { name: "9:30", uv: 3000 },
      { name: "13:30", uv: 2000 },
      { name: "14:30", uv: 2780 },
    ],
    engagementByDay: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
  }
};

export default data;
