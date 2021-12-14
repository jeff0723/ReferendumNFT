//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./DemocracyToken.sol";

interface IDemocracyToken {
    function mint(address _to) external;
}

contract Referendum is ERC721URIStorage {
    address public owner;
    uint256 public totalMinted;
    uint256 public startTime;
    uint256 public endTime;
    IDemocracyToken public democracyToken;
    bool private isDemocracyTokenMinted;
    mapping(address => bool) private _isMinted;

    constructor(uint256 startTime_, uint256 endTime_)
        ERC721("Referendum", "RNFT")
    {
        startTime = startTime_;
        endTime = endTime_;
        democracyToken = IDemocracyToken(address(new DemocracyToken()));
        owner = _msgSender();
    }

    function mintTo(string calldata tokenURI_, address to_) public {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "Mint time hasn't started or has ended"
        );
        require(!_isMinted[to_], "Already minted");
        _isMinted[to_] = true;
        _mint(to_, totalMinted);
        _setTokenURI(totalMinted, string(tokenURI_));
        democracyToken.mint(to_);
        totalMinted++;
    }

    function mint(string calldata tokenURI_) external {
        mintTo(tokenURI_, _msgSender());
    }

    function mintDemocracySpirityNFT(string calldata tokenURI_) external {
        require(owner == _msgSender(), "Only owner");
        require(block.timestamp >= endTime, "Mint time hasn't ended");
        require(!isDemocracyTokenMinted, "Already minted");
        isDemocracyTokenMinted = true;
        _mint(address(this), totalMinted);
        _setTokenURI(totalMinted, tokenURI_);
        totalMinted++;
    }

    function getDemocracyTokenURI() external view returns (string memory) {
        require(isDemocracyTokenMinted, "DemocracyNFT hasn't minted");
        return tokenURI(totalMinted - 1);
    }
}
