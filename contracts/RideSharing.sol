pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;


contract RideSharing {

    address owner;
    constructor() public {
        owner = msg.sender;
    }

    /*
        MOBILITY WALLET 
    */

    mapping(address => uint) balances;
    mapping(address => OpenWithDrawl[]) openUserWithDrawls;

    // You can withdraw the money after 1 day
    uint constant WITH_DRAW_DELAY = 60 * 60 * 24;

    struct OpenWithDrawl {
        uint timestamp;
        uint amount;
    }

    function loadBalance() payable public {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) {
        OpenWithDrawl memory newWithDrawl = OpenWithDrawl(now + WITH_DRAW_DELAY, amount);

        balances[msg.sender] -= amount;
        openUserWithDrawls[msg.sender].push(newWithDrawl);
    }

    function cashout() {
        OpenWithDrawl[] memory openWithDrawls = openUserWithDrawls[msg.sender];

        for (uint i = 0; i < openWithDrawls.length; i++) {
            if (openWithDrawls[i].timestamp >= now) {
                msg.sender.transfer(openWithDrawls[i].amount);

                delete openWithDrawls[i];
            }
        }
    }

    function getBalance(address user) public view returns (uint balance) {
        OpenWithDrawl[] memory openWithDrawls = openUserWithDrawls[user];

        uint outstandingBalance = 0;
        for (uint i = 0; i < openWithDrawls.length; i++) {
            outstandingBalance += openWithDrawls[i].amount;
        }
        uint userBalance = balances[user];

        return userBalance - outstandingBalance;
    }

    function getWithDrawls() public view returns (OpenWithDrawl[] openWithDrawls) {
        return openUserWithDrawls[msg.sender];
    }

    /*
        RIDE SHARING 
    */

    // Default tolerance for time comparisons that use the Block's timestamp
    uint blockTimeTolerance = 120;

    // Default location tolerance
    int32 locTolerance = 100;

    mapping (address => uint16[]) userToRideMap;
    mapping (uint16 => rideInfo) rides;

    // Rules for Driver and Passenger defined for rides with trusted GPS source
    // TODO: Periodic check for drivers that never checked in to apply penalties
    struct ruleset {
        uint late_tolerance;
        uint late_punishment_driver;
        uint late_punishment_passenger;

        uint noshow_tolerance;
        uint noshow_punishment_driver;
        uint noshow_punishment_passenger;
    }

    struct rideInfo {
        uint16 rideId;
        int32 start_lat; 
        int32 start_lng; 
        uint32 startTimestamp; 
        uint km; 
        uint pricePerKm; 
        address driver;
        address passenger;
        ruleset rules;
        uint driverPenalty;
        bool driverCheckedIn;
    }

    struct checkinMessage {
        uint16 rideId;
        int32 start_lat; 
        int32 start_lng; 
        uint32 startTimestamp;
        uint pricePerKm; 
        address driver;
        address passenger;
        bool waivePenalty;
    }

    struct pop {
        uint16 rideId; 
        uint16 km;
    }

    struct finishedRide {
        rideInfo checkinMessage;
        pop finalPop;
        signature checkinSig;
        signature popSig;
    }

    struct signature {
        bytes32 r;
        bytes32 s;
        uint8 v;
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

    // Only for pre-planned rides where we trust the GPS source of the driver
    event DriverCheckin(uint16 rideId, address driver, bool success);
    function checkinDriver(uint16 rideId, int32 lat, int32 lng) external {
        if (msg.sender == rides[rideId].driver
            && rides[rideId].start_lat < lat + locTolerance && rides[rideId].start_lat > lat - locTolerance
            && rides[rideId].start_lng < lng + locTolerance && rides[rideId].start_lng < lng + locTolerance)
        {
            // Calculate driver penalty according to rules
            if (rides[rideId].startTimestamp < now + blockTimeTolerance + rides[rideId].rules.noshow_tolerance) {
                rides[rideId].driverPenalty = rides[rideId].rules.noshow_punishment_driver;
            }
            else if (rides[rideId].startTimestamp < now + blockTimeTolerance + rides[rideId].rules.late_tolerance) {
                rides[rideId].driverPenalty = rides[rideId].rules.late_punishment_driver;
            }

            // Checkin Success
            rides[rideId].driverCheckedIn = true;
            emit DriverCheckin(rideId, rides[rideId].driver, true);
        } else {
            emit DriverCheckin(rideId, rides[rideId].driver, true);
        }
    }

    function cashout(checkinMessage passengerCheckinMessage, pop finalPop) {
        require(passengerCheckinMessage.rideId == finalPop.rideId);
        // TODO Verify signature
        // require...

        uint price = passengerCheckinMessage.pricePerKm * finalPop.km;

        // Now we apply rules
        // There are only rules, if the driver uses a trusted GPS source and the ride was planned before
        if(passengerCheckinMessage.rideId != 0) {
            if (passengerCheckinMessage.driver == rides[passengerCheckinMessage.rideId].driver
                && passengerCheckinMessage.passenger == rides[passengerCheckinMessage.rideId].passenger)
            {
                uint passengerPenalty;

                // Calculate passenger penalty according to rules
                // Noshow in this case means waaaay to late, so you pay the original price + the actual drive
                if (rides[passengerCheckinMessage.rideId].startTimestamp < passengerCheckinMessage.startTimestamp + blockTimeTolerance + rides[passengerCheckinMessage.rideId].rules.noshow_tolerance) {
                    passengerPenalty = (rides[passengerCheckinMessage.rideId].km * rides[passengerCheckinMessage.rideId].pricePerKm * rides[passengerCheckinMessage.rideId].rules.noshow_punishment_passenger) / uint(100);
                }
                else if (rides[passengerCheckinMessage.rideId].startTimestamp < passengerCheckinMessage.startTimestamp + blockTimeTolerance + rides[passengerCheckinMessage.rideId].rules.late_tolerance) {
                    passengerPenalty = (price * rides[passengerCheckinMessage.rideId].rules.late_punishment_passenger) / uint(100);
                }

                // If the passenger is punished, the driver gets more money
                price += passengerPenalty;
            }
        }

        // If the driver is punished, the passenger pays less
        // We still have to calculate values for the driver penalties (stored in per cent)
        price -= (rides[passengerCheckinMessage.rideId].driverPenalty * price) / uint(100);

        balances[passengerCheckinMessage.passenger] -= price;
        balances[passengerCheckinMessage.driver] += price;
    }
}
