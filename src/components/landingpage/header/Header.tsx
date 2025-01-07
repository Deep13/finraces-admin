
import { useState, useEffect } from "react";
import "flowbite";
import {Navbar } from "flowbite-react";
import PagesMenu from "./Pagesmenu";
import DemosMenu from "./DemosMenu";
import MobileDrawer from "./MobileDrawer";
import FrontPageMenu from "./FrontPageMenu";
import FullLogo from "src/layouts/full/shared/logo/FullLogo";
import { Link } from "react-router";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 ${
          isSticky
            ? "bg-white dark:bg-dark shadow-md "
            : "bg-white dark:bg-dark"
        }`}
      >
        <Navbar className="fluid py-6">
          <FullLogo />
          <MobileDrawer/>
          <Navbar.Collapse className="xl:block hidden">
            <DemosMenu />
            <FrontPageMenu/>
            <PagesMenu />
            <Navbar.Link as={Link} target="_blank" to="https://demos.adminmart.com/premium/react/matdash-react/docs/index.html" className="rounded-md">
              Documentation
            </Navbar.Link>
            <Navbar.Link as={Link} target="_blank" to="https://adminmart.com/support" className="rounded-md">
              Support
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/auth/auth2/login"
              className="bg-primary text-white text-sm hover:text-white dark:hover:text-white hover:bg-primaryemphasis py-2 px-5 rounded-md"
            >
              Login
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
