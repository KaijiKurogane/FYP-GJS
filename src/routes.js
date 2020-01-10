import React from "react";

//const untuk import screen

const Dashboard = React.lazy(
  () => import("./screens/AdminDashboard")
);
const Inventory = React.lazy(
  () => import("./screens/AdminInventory")
);
const ParticipantList = React.lazy(() =>
  import("./screens/AdminParticipantList")
);
const POS = React.lazy(
  () => import("./screens/AdminPOS")
);
const routes = [
  { 
    path: "/", 
    exact: true, 
    name: "Home" 
  },
  { 
    path: "/Dashboard",
    name: "Dashboard", 
    component: Dashboard 
  },
  { 
    path: "/Inventory", 
    name: "Inventory", 
    component: Inventory 
  },
  {
    path: "/ParticipantList",
    name: "ParticipantList",
    component: ParticipantList
  },
  { 
    path: "/POS", 
    name: "POS", 
    component: POS 
  },
];

export default routes;