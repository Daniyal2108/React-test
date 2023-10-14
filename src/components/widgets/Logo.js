import logo from "../../images/global/logo.png";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <img
      className={`${props.className} ${classes.logo}`}
      src={logo}
      alt="logo"
    />
  );
};

export default Logo;
