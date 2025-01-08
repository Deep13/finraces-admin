
import { useEffect } from "react";
import { Flowbite } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Development from "./animation/Development";
import LoginReg from "./login/LoginReg";
import customTheme from "src/utils/theme/custom-theme";
import Footer from "./footer/Footer";
import Ticket from "./ticket/Ticket";
import AllFeatures from "./features/AllFeatures";
import ClientReviews from "./reviews/ClientReviews";
import ProductDemos from "./productdemos/demos";
import LpHeader from "./header/Header"
import LpBanners from "./banner/banner"
const Landingpage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <div className="landingpage">
          <LpHeader />
          <LpBanners />
          <ProductDemos />
          <Development />
          <ClientReviews />
          <AllFeatures />
          <Ticket />
          <LoginReg />
          <Footer />
        </div>
      </Flowbite>
    </>
  );
};

export default Landingpage;
