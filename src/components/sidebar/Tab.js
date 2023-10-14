import classes from "./style.module.css";
import Image from "../UI/Image";

const Tab = (props) => {
  return (
    <div className={`${classes.tab} ${props.toggle && classes.toggle} `}>
      <Image src={props.icon} alt={props.altText} />
      <h3>{props.name}</h3>
    </div>
  );
};

export default Tab;
