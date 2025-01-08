import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Badge, Dropdown } from "flowbite-react";
import * as profileData from "./Data";
import SimpleBar from "simplebar-react";
import { Link } from "react-router";
import { getUserDetails } from "src/utils/api";
import defaultProfileImg from "/src/assets/default.jpg";
import { AuthContext } from "src/context/AuthContext";


const Profile = () => {
  const context =useContext(AuthContext);
  const {setIsLoggedIn}=context
  const [userDetails, setUserDetails] = useState({
    userName: "Guest",
    email: "guest@example.com",
    photo: defaultProfileImg,
  });
  const [loading, setLoading] = useState(true);

  const handleLogout:React.MouseEventHandler<HTMLDivElement>=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userDetails')
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false);
  }

  useEffect(() => {
    // Fetch user details on component mount
    
    getUserDetails(
      (data:any) => {
        setUserDetails({
          userName: data.firstName || "Unknown",
          email: data.email || "No Email",
          photo: data?.photo?.path || defaultProfileImg,
        });
        setLoading(false);
      },
      (error:any) => {
        console.error("Failed to fetch user details:", error);
        setLoading(false);
      }
    );
  }, []);
  console.log(userDetails.photo)
  return (
    <div className="relative">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] pb-4 rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex items-center gap-1">
            <span className="h-10 w-10 hover:text-primary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              <img
                src={userDetails.photo}
                alt="profile"
                height="35"
                width="35"
                className="rounded-full"
              />
            </span>
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="hover:text-primary dark:text-primary group-hover/menu:text-primary"
              height={12}
            />
          </div>
        )}
      >
        <div className="px-6">
          <div className="flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3">
            <img
              src={userDetails.photo}
              alt="profile"
              height="56"
              width="56"
              className="rounded-full"
            />
            <div>
              {loading ? (
                <h5 className="text-15 font-semibold">Loading...</h5>
              ) : (
                <>
                  {/* <h5 className="text-15 font-semibold">
                    {userDetails.userName} <span className="text-success">Pro</span>
                  </h5> */}
                  <p className="text-sm text-ld opacity-80">{userDetails.email}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
        
            
          {/* {profileData.profileDD.map((items, index) => (
            <div key={index} className="px-6 mb-2">
              <Dropdown.Item
                as={Link}
                to={items.url}
                className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md"
              >
                <div className="flex items-center w-full">
                  <div className="flex gap-3 w-full">
                    <h5 className="text-15 font-normal group-hover/link:text-primary">
                      {items.title}
                    </h5>
                    {items.url === "/apps/invoice" ? (
                      <Badge color={"lightprimary"}>4</Badge>
                    ) : null}
                  </div>
                </div>
              </Dropdown.Item>
            </div>
          ))} */}
          <div className="px-6 mb-2 custom-srollbar">
              <Dropdown.Item
                as={Link}
                to={"/login"}
                className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md"
              >
                <div className="flex items-center w-full" onClick={handleLogout}>
                  <div className="flex gap-3 w-full">
                    <h5 className="text-15 font-normal group-hover/link:text-primary">
                      {"Sign Out"}
                    </h5>
                    {/* {items.url === "/apps/invoice" ? (
                      <Badge color={"lightprimary"}>4</Badge>
                    ) : null} */}
                  </div>
                </div>
              </Dropdown.Item>
            </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
