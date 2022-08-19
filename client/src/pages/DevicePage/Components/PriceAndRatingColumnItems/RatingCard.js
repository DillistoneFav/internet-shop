import React, { useState } from "react";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/Button";
import classes from "../../DevicePage.module.css";
import { Rate } from "antd";
import { addRating } from "../../../../http/deviceAPI";

const RatingCard = ({user, id}) => {

    const [starsCount, setStarsCount] = useState(0);

    const postRating = (rate) => {
        addRating({
          starsCount,
          deviceId: id,
        }).then((res) => {
          setStarsCount(res);
        });
      };

    return (
        <Card
            className={`${classes.cartCard} d-flex flex-column justify-content-between pt-2 pb-3 mt-3`}
          >
            <span className={classes.rateSpan}>Rate this item!</span>
            <Rate
              Count={starsCount}
              onChange={(event) => setStarsCount(event)}
            />
            <Button
              variant="outline-primary"
              className={classes.cartButton}
              onClick={() => {
                user.isAuth
                  ? postRating(starsCount)
                  : alert("please login first!");
              }}
            >
              Submit!
            </Button>
          </Card>
    );
};

export default RatingCard;