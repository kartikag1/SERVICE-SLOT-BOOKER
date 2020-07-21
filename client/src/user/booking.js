import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import DatePicker from "react-date-picker";
import { isAuthenticated } from "../auth/helper";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Button } from "semantic-ui-react";
import { Book, getAllBookings } from "./helper/userapicalls";
import FlashMessage from "react-flash-message";
import Card from "./Card";
import { Redirect } from "react-router-dom";

const Booking = () => {
  const [value, onChange] = useState(new Date());
  const [from, onChangeFrom] = useState("");
  const [to, onChangeTo] = useState("");
  const [service, onChangeService] = useState("");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState({});
  const [myBookings, setMyBookings] = useState([]);

  const servicesArr = [
    "Tennis Court",
    "Swimming Pool",
    "Badminton Court",
    "Gym",
    "Club House",
    "Cycle tracks",
  ];

  const options = [
    { key: 1, text: "Tennis Court", value: 1 },
    { key: 2, text: "Swimming Pool", value: 2 },
    { key: 3, text: "Badminton Court", value: 3 },
    { key: 4, text: "Gym", value: 4 },
    { key: 5, text: "Club House", value: 5 },
    { key: 6, text: "Cycle tracks", value: 6 },
  ];

  const toSetService = (event, data) => {
    event.preventDefault();
    onChangeService(data.value.toString());
  };

  const handleChangeFrom = (property) => (event) => {
    onChangeFrom(event.target.value);
  };

  const handleChangeTo = (property) => (event) => {
    onChangeTo(event.target.value);
  };

  const bookSlot = () => {
    const { user, token } = isAuthenticated();
    let x = value.toString();
    let final = x.split(" ");
    let dta = {
      date: final[2] + "-" + final[1] + "-" + final[3],
      timeFrom: from,
      timeTo: to,
      facility: service,
      user: user,
    };

    Book(dta).then((data) => {
      if (data.err == false) {
        setStatus("true");
        setDetails(data);
        alert("Congratulations! Booking Successful!");
      } else {
        setStatus("false");
        setDetails(data);
        alert("Oh! Looks like slot is already filled");
      }
    });
  };

  const Message = () => {
    if (status == "true") {
      console.log(details);
      return (
        <FlashMessage duration={3500} persistOnHover={true}>
          <div className="alert alert-success" style={{ fontWeight: "bold" }}>
            <center>
              <h3>BOOKING SUCESSFUL</h3>
              <br></br>
              <h3>{servicesArr[details.facility - 1]}</h3>
              <br></br>
              <h3>
                {details.timeFrom} - {details.timeTo}
              </h3>
            </center>
          </div>
        </FlashMessage>
      );
    } else if (status == "false") {
      return (
        <FlashMessage duration={1500} persistOnHover={true}>
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-danger">err</div>
            </div>
          </div>
        </FlashMessage>
      );
    }
  };

  const { user } = isAuthenticated();
  getAllBookings({ user: user })
    .then((data) => {
      console.log(data);
      setMyBookings(data);
    })
    .catch((err) => console.log(err));

  return (
    <Base title="Booking Page" description="Reserve a facility!">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center>
        <div
          class="card"
          style={{
            color: "black",
            padding: "20px",
          }}
        >
          <h3>Select a service</h3>
          <div class="card-body">
            <Dropdown
              placeholder="Select a service..."
              clearable
              options={options}
              search
              selection
              defaultValue="1"
              onChange={toSetService}
            />

            <h3>
              <b>
                <i> Date of reservation</i>
              </b>
            </h3>
            <DatePicker onChange={onChange} value={value} />
            <br></br>
            <br></br>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1">
                <h3>
                  <b>
                    <i>From</i>
                  </b>
                </h3>
                <input
                  style={{ width: "55px" }}
                  type="number"
                  min="0"
                  max="23"
                  value={from}
                  onChange={handleChangeFrom("from")}
                ></input>
              </div>
              <div className="col-md-1">
                <h3>
                  <b>
                    <i>To</i>
                  </b>
                </h3>
                <input
                  style={{ width: "55px" }}
                  type="number"
                  min="0"
                  max="23"
                  value={to}
                  onChange={handleChangeTo("to")}
                ></input>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
            </div>
            <br></br>
            <Button onClick={bookSlot}>
              <b>BOOK SLOT</b>
            </Button>
            <br></br>
            <br></br>
          </div>
        </div>
        <br></br>
        <h2>BOOKINGS</h2>
        <div className="row">
          {myBookings.map((b) => {
            return (
              <Card
                dataa={{
                  facility: servicesArr[b.facility - 1],
                  date: b.date,
                  timeFrom: b.timeFrom,
                  timeTo: b.timeTo,
                }}
              />
            );
          })}
        </div>
      </center>
    </Base>
  );
};

export default Booking;
