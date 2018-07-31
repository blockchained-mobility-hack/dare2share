export const SocketAdress = "http://localhost:4200";

export const sendPassengerRequest = data =>
  fetch(SocketAdress + "/join", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

export const sendDriverConfirmation = data =>
  fetch(SocketAdress + "/join", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

export const checkInPassenger = data =>
  fetch(SocketAdress + "/check-in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
