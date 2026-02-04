// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Simple Counter
 * @dev A very basic smart contract to demonstrate state changes.
 */
contract Counter {
    // State variable to store the count
    // 'public' automatically creates a 'getter' function so we can read it
    uint256 public count;

    // Event to log when the count changes (useful for front-ends to listen to)
    event CountChanged(uint256 newCount);

    /**
     * @dev Increments the counter by 1.
     * This is a "write" function that costs gas (transaction fee).
     */
    function increment() public {
        count += 1;
        emit CountChanged(count);
    }

    /**
     * @dev Decrements the counter by 1.
     * Will revert (fail) if count is 0 because uint256 cannot be negative.
     */
    function decrement() public {
        // Solidity 0.8+ automatically checks for underflow/overflow
        require(count > 0, "Counter cannot be negative"); 
        count -= 1;
        emit CountChanged(count);
    }

    /**
     * @dev Resets the count to 0.
     */
    function reset() public {
        count = 0;
        emit CountChanged(count);
    }
}
