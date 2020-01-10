export default {
  items: [
    // {
    //   title: true,
    //   name: "Public & Participant",
    //   wrapper: {
    //     element: "",
    //     attributes: {}
    //   },
    //   class: "text-center"
    // },
    {
      title: true,
      name: "Administrator",
      wrapper: {
        element: "",
        attributes: {}
      },
      class: "text-center"
    },
    {
      name: "Dashboard",
      url: "/Dashboard",
      icon: "icon-grid"
    },
    {
      name: "Inventory",
      url: "/Inventory",
      icon: "icon-basket"
    },
    {
      name: "Participant List",
      url: "/ParticipantList",
      icon: "icon-list"
    },
    // {
    //   name: "Point Of Sale",
    //   url: "/POS",
    //   icon: "icon-handbag"
    // },
    {
      name: "GJS Facebook",
      url: "https://www.facebook.com/JungleSchoolGombak/",
      icon: "icon-social-facebook ",
      class: "mt-auto",
      variant: "primary",
      attributes: { target: "_blank", rel: "noopener" }
    },
    {
      name: "GJS Instagram",
      url: "https://www.instagram.com/jungleschoolgombak/?hl=en",
      icon: "icon-social-instagram",
      variant: "primary",
      attributes: { target: "_blank", rel: "noopener" }
    }
  ]
};
