import React from "react";
const textColourStyle = {
  color: "black",
};

const Card = ({ dataa }) => {
  let start, end;
  if (dataa.timeFrom < 12) {
    start = "AM";
  } else if (dataa.timeFrom >= 12) {
    start = "PM";
  }
  if (dataa.timeTo < 12) {
    end = "AM";
  } else if (dataa.timeTo >= 12) {
    end = "PM";
  }
  return (
    <div
      style={{
        width: "100%",
        padding: "15px",
      }}
      className="col-md-4"
    >
      <div
        className="card"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        }}
      >
        <div className="card-body">
          <h3 style={textColourStyle}>{dataa.facility}</h3>

          <h3 style={textColourStyle}>{dataa.date}</h3>
          <h3 style={textColourStyle}>
            {dataa.timeFrom} {start}-{dataa.timeTo} {end}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Card;
