import classes from "./BodySection.module.css";
import Header from "../widgets/Header";

const BodySection = (props) => {
  return (
    <section className={`${props.className} ${classes.bodySection} `}>
      <Header name={props?.headerName} />
      {props.children}
    </section>
  );
};

export default BodySection;
