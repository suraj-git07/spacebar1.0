// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SpaceBar is Ownable {
    IERC20 public zontToken;
    uint256 public initialBalance = 50 * 10**18; // Initial balance for new users (50 tokens)
    uint256 public playFee = 5 * 10**18; // Fee for playing (5 tokens)


    struct User {
        uint256 balance;
        uint256 highScore;
        bool exists;
    }

    mapping(address => User) public users;

    constructor(address _zontTokenAddress) Ownable(msg.sender) {
        zontToken = IERC20(_zontTokenAddress);
    }

    event UserUpdated(
        address indexed user,
        uint256 newBalance,
        uint256 newHighScore
    );
    event BalanceClaimed(address indexed user, uint256 amount);

   
    function updateUser(uint256 _score) public {
        require(users[msg.sender].exists, "User does not exist");

        users[msg.sender].balance += (_score* 10**18);

        if (_score > users[msg.sender].highScore) {
            users[msg.sender].highScore = _score;
        }

        emit UserUpdated(
            msg.sender,
            users[msg.sender].balance,
            users[msg.sender].highScore
        );
    }

    function getHighScore(address _user) external view returns (uint256) {
        return users[_user].highScore;
    }

    function viewBalance(address _user) external view returns (uint256) {
        return users[_user].exists ? users[_user].balance : initialBalance;
    }

     function takePlayFee() external returns (bool) {
        if (!users[msg.sender].exists) {
            // New user, initialize with initial balance minus the play fee
            users[msg.sender] = User(initialBalance - playFee, 0, true);
        } else {
            // Check if the user has enough balance to cover the play fee
            require(users[msg.sender].balance >= playFee, "Insufficient balance to play");
            users[msg.sender].balance -= playFee;
        }

        return users[msg.sender].balance >= 0; // User can play if balance is non-negative
    }

  
    function claimBalance() external {
        uint256 userBalance = users[msg.sender].balance;
        require(userBalance > 0, "No balance to claim");
        users[msg.sender].balance = 0;
        require(zontToken.transfer(msg.sender, userBalance), "Transfer failed");
        emit BalanceClaimed(msg.sender, userBalance);
    }

    
    function transferTo(address _recipient, uint256 _amount)
        external
        onlyOwner
    {
        require(zontToken.transfer(_recipient, _amount), "Transfer failed");
    }


    function withdraw(uint256 _amount) external onlyOwner {
        require(zontToken.transfer(owner(), _amount), "Withdraw failed");
    }

    
    function emergencyTransferOwnership(address _newOwner) external onlyOwner {
        _transferOwnership(_newOwner);
    }
}
