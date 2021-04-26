import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

function ReviewFilter() {
    const [activeItem, setActiveItem] = useState("all");
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };

    return (
        <>
            <span style={{ marginRight: 20 }}>Filter</span>

            <Button
                name="all"
                onClick={handleItemClick}
                color={activeItem === "all" ? "teal" : ""}
            >
                All
            </Button>
            <Button
                name="1"
                onClick={handleItemClick}
                color={activeItem === "1" ? "teal" : ""}
            >
                <Icon name="star" ></Icon>
                1
            </Button>
            <Button
                name="2"
                onClick={handleItemClick}
                color={activeItem === "2" ? "teal" : ""}
            >
                <Icon name="star" ></Icon>
                2
            </Button>
            <Button
                name="3"
                onClick={handleItemClick}
                color={activeItem === "3" ? "teal" : ""}
            >
                <Icon name="star" ></Icon>
                3
            </Button>
            <Button
                name="4"
                onClick={handleItemClick}
                color={activeItem === "4" ? "teal" : ""}
            >
                <Icon name="star" ></Icon>
                4
            </Button>
            <Button
                name="5"
                onClick={handleItemClick}
                color={activeItem === "5" ? "teal" : ""}
            >
                <Icon name="star" ></Icon>
                5
            </Button>


        </>
    );
}
export default ReviewFilter;
