import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    // access: ['admin'],
    items: [
      {
        title: "Staff Members",
        url: "/staff",
        items: [],
        icon: Icons.User
      },
      {
        title: "Email Subscriptions",
        url: "/mail-subscribe",
        items: [],
        icon: Icons.BellIcon
      },
      {
        title: "Mail Campaigns",
        url: "/campaigns",
        items: [],
        icon: Icons.Inbox
      },
      {
        title: "News",
        icon: Icons.Newspaper,
        items: [
          {
            title: "Categories",
            url: "/news/category",
            // access: ['super_admin']
          },
          {
            title: "Articles",
            url: "/news/articles",
            // access: ['super_admin']
          },
          {
            title: "Add Article",
            url: "/news/new",
            // access: ['super_admin']
          },
        ],
      },
      {
        title: "Website Pages",
        icon: Icons.BuildingIcon,
        items: [
          {
            title: "Groups/Folders",
            url: '/website/folders',
            // access: ['super_admin']
          },
          {
            title: "Pages List",
            url: "/website/pages",
            // access: ['super_admin']
          },
          {
            title: "Add Page",
            url: "/website/add",
            // access: ['super_admin']
          },
        ],
      },
    ],
  },
];
