//  Profile Data
interface MiniiconsType {
  id: number;
  icon: string;
  tooltip: string;
  url:string;
}

const Miniicons: MiniiconsType[] = [
  {
    id: 1,
    icon: "solar:screencast-2-line-duotone",
    tooltip: "Home",
    url: "/",
  },
  {
    id: 2,
    icon: "solar:shield-user-outline",
    tooltip: "User Management",
    url: "/userManagement",
  },
  {
    id: 3,
    icon: "ph:flag-checkered-fill",
    tooltip: "Race Management",
    url: "/raceManagement",
  },
  {
    id: 4,
    icon: "solar:ticker-star-outline",
    tooltip: "Tickets",
    url:  "/tickets",
  },
  {
    id: 5,
    icon: "material-symbols:leaderboard-outline",
    tooltip: "Leaderboard",
    url: "/leaderboard"
  },
  // {
  //   id: 5,
  //   icon: "solar:chart-line-duotone",
  //   tooltip: "Charts",
  // },
  // {
  //   id: 6,
  //   icon: "solar:widget-6-line-duotone",
  //   tooltip: "Forms",
  // },

  // {
  //   id: 7,
  //   icon: "solar:text-underline-cross-broken",
  //   tooltip: "Headless UI",
  // },

  // {
  //   id: 8,
  //   icon: "solar:lock-keyhole-line-duotone",
  //   tooltip: "Authentiction Pages",
  // },
  // {
  //   id: 9,
  //   icon: "solar:mirror-left-line-duotone",
  //   tooltip: "Docs & Others",
  // },
];

export default Miniicons;
