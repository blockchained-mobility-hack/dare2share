pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;


contract RideSharing {

    address owner;
    uint16 rideSequence;

    mapping (address => uint16[]) userToRideMap;
    mapping (uint16 => rideInfo) rides;

    // This obj acts as ride information as well as check-in message (in this case with Passenger's signature)
    struct rideInfo {
        uint16 rideId;
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

    struct finishedRide {
        rideInfo checkinMessage;
        pop finalPop;
        signature sig;
    }

    struct signature {
        // ...
    }

    constructor() public {
        owner = msg.sender;
        rideSequence = 1;
    }

    /* Only for rides where driver offers trusted gps source! (RideSharing with GPS tracker, Uber, Taxi, Train, Airtaxi, ...)
        Pre-Req: Only Driver can call this function
        1.) Driver publishes ride offer on AWS
        2.) Passenger requests to join ride by copying info from AWS service and signing it with Ethereum Private Key
        3.) Driver accepts Passenger by calling this method with the signed "join request" from the Passenger */
    event RideAccepted(uint16 rideId, address passenger);    
    function newRide(rideInfo agreedRideConditions) public {
        // TODO Verify signature
        // require...

        userToRideMap[msg.sender].push(agreedRideConditions.rideId);
        userToRideMap[agreedRideConditions.passenger].push(agreedRideConditions.rideId);

        emit RideAccepted(agreedRideConditions.rideId, agreedRideConditions.passenger);
    }

    function cashout(rideInfo checkinMessage, pop finalPop) {
        // pop contains rideId, timestamp, lat, lng, km, address
    }
}
