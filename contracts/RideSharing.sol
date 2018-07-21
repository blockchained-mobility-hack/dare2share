pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;


contract RideSharing {

    address owner;
    uint16 rideSequence;

    struct rideInfo {
        string checkinMessage;
        string lastPop;
        address passenger;
    }

    constructor() public {
        owner = msg.sender;
        rideSequence = 1;
    }

    function newRide(int32 start_lat, int32 start_lng, uint32 startTimestamp, uint16 price, address driver, address passenger) external {

    }

    function cashout(rideInfo[]) {
        // pop contains rideId, timestamp, lat, lng, km, address
    }
}
