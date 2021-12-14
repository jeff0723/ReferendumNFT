//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DemocracyToken is ERC20("Democracy", "DOM") {
    address private masterContract;

    constructor() {
        masterContract = _msgSender();
    }

    function mint(address _to) external {
        require(
            _msgSender() == masterContract,
            "Only master contract can mint"
        );
        _mint(_to, 1);
    }
}
