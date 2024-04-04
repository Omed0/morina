import classes from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <span className={classes.loader}></span>
    </div>
  );
};

export default Spinner;
