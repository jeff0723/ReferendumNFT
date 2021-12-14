//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DemocracyToken.sol";

interface IDemocracyToken {
    function mint(address _to) external;
}

contract Referendum is ERC721URIStorage, Ownable {
    uint256 public totalMinted;
    uint256 public startTime;
    uint256 public endTime;
    IDemocracyToken public democracyToken;
    bool private isDemocracyTokenMinted;
    mapping(address => bool) private _isMinted;

    constructor(uint256 _startime, uint256 _endTime)
        ERC721("Referendum", "RNFT")
    {
        startTime = _startime;
        endTime = _endTime;
        democracyToken = IDemocracyToken(address(new DemocracyToken()));
    }

    function mint(string calldata _tokenURI) external {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "Mint time hasn't started or has ended"
        );
        require(!_isMinted[_msgSender()], "Already minted");
        _isMinted[_msgSender()] = true;
        _mint(_msgSender(), totalMinted);
        _setTokenURI(totalMinted, _tokenURI);
        democracyToken.mint(_msgSender());
        totalMinted++;
    }

    function mintDemocracySpirityNFT(string calldata _tokenURI)
        external
        onlyOwner
    {
        require(block.timestamp >= endTime, "Mint time hasn't ended");
        require(!isDemocracyTokenMinted, "Already minted");
        isDemocracyTokenMinted = true;
        _mint(address(this), totalMinted);
        _setTokenURI(totalMinted, _tokenURI);
        totalMinted++;
    }

    function getDemocracyTokenURI() external view returns (string memory) {
        require(isDemocracyTokenMinted, "DemocracyNFT hasn't minted");
        return tokenURI(totalMinted - 1);
    }
}
