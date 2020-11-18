import React, { useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";

const dropdownState = [
  {
    key: "open",
    title: "Open",
  },
  { key: "closed", title: "Closed" },
  { key: "all", title: "All" },
];

const Filter = ({ onClick, openCount, closeCount }) => {
  const [innerState, setInnerState] = useState("open");
  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <Dropdown className="mr-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {dropdownState.map((v) => (
              <Dropdown.Item
                key={v.key}
                eventKey={v.key}
                onClick={() => {
                  onClick(v.key);
                  setInnerState(v.key);
                }}
              >
                {v.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div>{innerState}</div>
      </div>
      <div className="d-flex justify-content-start mb-4">
        <Badge size variant="primary">
          {`${openCount} Open`}
        </Badge>
        <Badge
          className="ml-2"
          variant="danger"
        >{`${closeCount} closed`}</Badge>
      </div>
    </>
  );
};

export default Filter;
