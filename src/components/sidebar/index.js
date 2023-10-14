import classes from "./style.module.css";
import Logo from "../widgets/Logo";
import Container from "../layout/Container";
import SidebarSection from "../layout/SidebarSection";
import customerTab from "../../images/sidebar/customers icon.svg";
import Tab from "./Tab";
import { BsJustify } from "react-icons/bs";
import { useState } from "react";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <SidebarSection>
      <Container className={classes.sideBarContainer}>
        <Logo />
        <BsJustify
          onClick={() => {
            setToggle(!toggle);
          }}
          className={classes.hamburger}
        />

        <Tab
          name="CUSTOMERS"
          toggle={toggle}
          icon={customerTab}
          alt="customer-tab"
        />
      </Container>
    </SidebarSection>
  );
};

export default Sidebar;
