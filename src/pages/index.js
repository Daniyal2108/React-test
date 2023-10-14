import Sidebar from "../components/sidebar";
import classes from "./style.module.css";
import Home from "../components/body/Index";

const Index = (props) => {
  return (
    <div className={classes.container}>
      <Sidebar />
      <Home />
    </div>
  );
};

export default Index;
