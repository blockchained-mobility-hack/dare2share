pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;


contract RideSharing {

    address owner;
    uint16 rideSequence;

    struct checkinMessage {
        int32 start_lat; 
        int32 start_lng; 
        uint32 startTimestamp; 
        uint16 price; 
        address driver;
        address passenger;
    }

    struct pop {
        uint16 rideId; 
        uint16 km;
    }

    struct signature {
        // ...
    }

    constructor() public {
        owner = msg.sender;
        rideSequence = 1;
    }

    /* Only for rides where driver offers trusted gps source! (RideSharing with GPS tracker, Uber, Taxi, Train, Airtaxi, ...)
        1.) Driver publishes ride offer on AWS
        2.) Passenger requests to join ride by copying info from AWS service and signing it with Ethereum Private Key
        3.) Driver accepts Passenger by calling this method with the signed "join request" from the Passenger */
    event RideAccepted(uint16 rideId, address passenger);    
    function newRide(int32 start_lat, int32 start_lng, uint32 startTimestamp, uint16 price, address driver, address passenger, signature sig) external {
        // TODO Verify signature
        // require...


    }

    function cashout(rideInfo[]) {
        // pop contains rideId, timestamp, lat, lng, km, address
    }
}
