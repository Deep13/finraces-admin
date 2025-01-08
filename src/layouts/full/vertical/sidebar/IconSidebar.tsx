
import  {  useContext } from "react";
import { Icon } from "@iconify/react";
import Miniicons from "./MiniSidebar";
import SimpleBar from "simplebar-react";
import { Button, HR, Tooltip } from "flowbite-react";
import { Link, useNavigate } from "react-router";
import { CustomizerContext } from "src/context/CustomizerContext";

export const IconSidebar = () => {
  //selectedIconId, setSelectedIconId,
  const {  setIsCollapse, isCollapse } =
    useContext(CustomizerContext) || {};
  
  const navigate=useNavigate()

  // // Handle icon click
  const handleClick = (url: any) => {
    // setSelectedIconId(id);
    navigate(url)
    // setIsCollapse("full-sidebar");
  };

  return (
    <>
      <div className="minisidebar-icon dark:bg-dark">
        <div className="barnd-logo">
          <Link
            to="#"
            className="nav-link"
            onClick={() => {
              if (isCollapse === "full-sidebar") {
                setIsCollapse("mini-sidebar");
              } else {
                setIsCollapse("full-sidebar");
              }
            }}
          >
            <Icon
              icon="solar:hamburger-menu-line-duotone"
              height={24}
              className="text-black dark:text-white dark:hover:text-primary"
            />
          </Link>
        </div>
        {isCollapse=="mini-sidebar"?
        <SimpleBar className="miniicons ">
          {Miniicons.map((links, index) => (
            <Tooltip
              key={links.id}
              content={links.tooltip}
              placement="right"
              className="flowbite-tooltip"
            >
              <Button
                key={index}
                className={`h-12 w-12 hover:text-primary text-darklink dark:text-white/70 hover:bg-primary rounded-tw flex justify-center items-center mx-auto mb-2
                   text-black bg-transparent hover:bg-primary hover:text-white dark:hover:text-white
                    `}
                type="button"
                onClick={() => handleClick(links.url)}
              >
                <Icon icon={links.icon} height={24} className="dark:bg-blue " />
              </Button>

              {/* {index > 0 &&
                (index + 1) % 3 === 0 &&
                index + 1 !== Miniicons.length && <HR className="my-3"></HR>} */}
            </Tooltip>
          ))}
        </SimpleBar>:
        <SimpleBar></SimpleBar>}
      </div>
    </>
  );
};
