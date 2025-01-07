
import { Icon } from "@iconify/react";
import { Button } from "flowbite-react";
import SimpleBar from "simplebar-react";
import { Link } from "react-router";
import CardBox from "src/components/shared/CardBox";
import { useEffect,useState } from "react";
import { getRaceList,getTicketCount,getTotalRacesCount,getTotalUsersCount,getUsers } from "src/utils/api";


const ColorBoxes = () => {
  const [totalRaces, setTotalRaces] = useState(0);
    const [activeRaces, setActiveRaces] = useState(0);
    const [upcomingRaces, setUpcomingRaces] = useState(0); // State to store total races
    const [loading, setLoading] = useState(true); // State for loading
    const [totalUsers,setTotalUsers]=useState(0);
    const [totalTickets,setTotalTickets]=useState(0);
    // useEffect(() => {
    //   // Fetch race list on component mount
    //   getRaceList(
    //      // Status can be dynamic
    //     (data:any) => {
    //       setActiveRaces(data?.length || 0); // Update total races
    //       console.log(data.length)
    //       setLoading(false);
    //     },
    //     (error:any) => {
    //       console.error("Error fetching races:", error);
    //       setLoading(false);
    //     },
    //     "running",
    //   );
    //   getRaceList(
    //      // Status can be dynamic
    //     (data:any) => {
    //       setUpcomingRaces(data?.length || 0); // Update total races
    //       setLoading(false);
    //     },
    //     (error:any) => {
    //       console.error("Error fetching races:", error);
    //       setLoading(false);
    //     },
    //     "scheduled",
    //   );
    // }, []);
    // useEffect(() => {
    //   setTotalRaces(activeRaces + upcomingRaces);
    //   getTotalRacesCount(()=>{},()=>{});
    //   getUsers(()=>{},()=>{});
    // }, [activeRaces, upcomingRaces]);
    
    useEffect(()=>{
      getTotalUsersCount(
        (data:any)=>{setTotalUsers(data)},
      ()=>{})
      getTotalRacesCount(
        (data:any)=>{
        setTotalRaces(data);
      },
    ()=>{}),
    getTotalRacesCount(
    (data:any)=>{  
      setUpcomingRaces(data);
    },
  ()=>{},
  "scheduled"),
  getTotalRacesCount(
    (data:any)=>{  
      setActiveRaces(data);
    },
  ()=>{},
  "running")
  getTicketCount(
    (data:any)=>{setTotalTickets(data)},
  ()=>{},
  "open"
)
  
    },[])
    const ColorboxData = [
      {
        bg: "primary-gradient",
        // icon: "solar:dollar-minimalistic-linear",
        icon:"solar:user-circle-outline",
        color: "bg-primary",
        title: "Total Users",
        price: totalUsers,
        link: "/userManagement",
      },
      // {
      //   bg: "warning-gradient",
      //   // icon: "solar:recive-twice-square-linear",
      //   icon:"mdi:users-check-outline",
      //   color: "bg-warning",
      //   title: "Active Users",
      //   price: "148",
      //   link: "/apps/contacts",
      // },
      {
        bg: "secondary-gradient",
        // icon: "ic:outline-backpack",
        icon:"ph:flag-checkered-fill",
        color: "bg-secondary",
        title: "Total Races",
        price: totalRaces,
        link: "/raceManagement",
      },
      {
        bg: "warning-gradient",
        // icon: "ic:baseline-sync-problem",
        icon:"tabler:flag-check",
        color: "bg-error",
        title: "Active Races",
        price: activeRaces,
        link: "/raceManagement",
      },
      {
        bg: "error-gradient",
        // icon: "ic:baseline-sync-problem",
        icon:"fluent:flag-clock-28-regular",
        color: "bg-error",
        title: "Upcoming Races",
        price: upcomingRaces,
        link: "/raceManagement",
      },
      {
        bg: "success-gradient",
        // icon: "ic:outline-forest",
        icon:"solar:ticker-star-outline",
        color: "bg-success",
        title: "Open Tickets ",
        price: totalTickets,
        link: "/tickets",
      },
    ];
  return (
    <>
      <CardBox>
        <div className="overflow-x-auto" >
        {/* Simplebar not working during resizing */}
          <div className="custom-scrollbar" > 
            <div className="flex  gap-30">
              {ColorboxData.map((item, index) => (
                <div className="lg:basis-1/5 md:basis-1/4 basis-full lg:shrink shrink-0" key={index}>
                  <div
                    className={`text-center px-5 py-30 rounded-tw ${item.bg}`}
                  >
                    <span
                      className={`h-12 w-12 mx-auto flex items-center justify-center  rounded-tw ${item.color}`}
                    >
                      <Icon
                        icon={item.icon}
                        className="text-white"
                        height={24}
                      />
                    </span>
                    <p className="text-ld font-normal mt-4 mb-2">
                      {item.title}
                    </p>
                    <h4 className="text-22">{item.price}</h4>
                    <Button
                      as={Link}
                      to={item.link}
                      
                     className="w-fit mx-auto mt-5 bg-white hover:bg-dark text-ld font-semibold hover:text-white shadow-sm py-1 px-1 dark:bg-darkgray dark:hover:bg-dark"
                      size="xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default ColorBoxes;
