pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;


contract MobilityWallet {

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
}
