import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.middle}>
      <div className={classes.ldsDefault}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
