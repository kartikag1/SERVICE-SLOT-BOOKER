import { API } from "../../backend";

export const Book = (v) => {
  return fetch(`${API}/book`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(v),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllBookings = (v) => {
  return fetch(`${API}/bookings`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(v),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
