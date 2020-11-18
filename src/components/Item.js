import React from "react";
import { Alert, Badge } from "react-bootstrap";

function Item({ data = {}, onClick }) {
  return (
    <div>
      <Alert
        onClick={onClick}
        variant="dark"
        style={{ cursor: "pointer", marginBottom: 4 }}
        className="d-flex align-items-center justify-content-between"
      >
        <div>
          <div className="d-flex align-items-center">
            <div style={{ fontSize: 20, fontWeight: "bold" }}>{data.title}</div>
            <Badge variant="primary" className="ml-2">
              {data.tag}
            </Badge>
          </div>
          <div
            style={{ textAlign: "left" }}
          >{`#${data.number} opened on ${data.updated_at} by ${data.user}`}</div>
        </div>
        <Badge variant={data.state === "open" ? "primary" : "danger"}>
          {data.state}
        </Badge>
      </Alert>
    </div>
  );
}

export default Item;
