import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "User List",
        url: "/users",
      },
      {
        title: "Analytics",
        url: "/analytics",
      },
    ],
  },
];
