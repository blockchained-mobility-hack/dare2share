



export const sendPassengerRequest = data => fetch('http://localhost:4200/join', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const sendDriverConfirmation= data => fetch('http://localhost:4200/join', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const checkInPassenger = data => fetch('http://localhost:4200/check-in', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
