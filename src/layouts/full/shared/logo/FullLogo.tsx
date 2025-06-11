import LogoLight from "/src/assets/images/logos/logofinraces.svg"
// import LogoDark from "/src/assets/images/logos/darklogo.png";
// import config from "/src/context/config.ts";
import { Link } from "react-router";
// import { useState } from "react";
const FullLogo = () => {
  // const theme={if(config.activeMode=="light")};
  // const [activeMode, setActiveMode] = useState<string>(config.activeTheme);
  // console.log(activeMode);
  // const [activeMode, setActiveMode] = useState<string>(config.activeMode);
  // console.log(activeMode)
  return (
    <Link to={"/"}>
      <img src={LogoLight} alt="logo" className="block" />
    </Link>
  );
};

export default FullLogo;
