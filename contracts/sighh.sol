    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.17;
pragma abicoder v2;

    import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
  
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
  contract JGame { 
address marketing;
         function setMarketing(address _marketing) public  {
             require(msg.sender == deployer, "no");
             marketing = _marketing;
         }
      uint256 public price; //price of the key. starts at 1 eth. increases by 1% each time a key is purchased. 
      uint256 public pot; //pot of the game. 90% goes to the winner and 10% remains for the next round. 
      uint256 public timer; //timer of the game. starts at 24 hours after initialization. if a key is purchased, timer is extended to block.timestamp + 24 hours. if timer runs out, game ends and winner is determined. 
      address payable public owner; //owner of the contract. can withdraw funds from the pot at any time. 
      address public winner; //stake of red team members in wei. must be greater than other teams' stakes in order to purchase a key. 
        GameItem public key;
        uint256  public basePrice;
        uint public lastTeam;
        string [] public teams = ["pepe", "king", "bull", "bear"];
        NFTFanout public fanout;
        Fanout public tokFanout;
        J3d public j3d;
        address deployer;
      constructor(uint256 _price, address _theKeys, address _theFanout, address _theTokFanout) {
          price = _price;
          deployer = payable(msg.sender);
          basePrice = _price;
          key =  GameItem(_theKeys);
          fanout = NFTFanout(payable(_theFanout));
          tokFanout =  Fanout(payable(_theTokFanout));
          owner = payable(msg.sender);
          winner = owner;
          timer = block.timestamp + 24 hours;
      }
      function setStuff(address _theKeys, address _theFanout, address _theTokFanout, address _tok) public {
require(msg.sender == deployer, "no");

          fanout = NFTFanout(payable(_theFanout));
          tokFanout =  Fanout(payable(_theTokFanout));
          j3d = J3d(payable(_tok));
      }


    function burn(uint256 tokenId, uint team)
        public
    {
      require (team > 0 && team <= 4, "bad team");
          lastTeam = team;//teams[team];
        key.burn(msg.sender, tokenId);
          timer = block.timestamp + 24 hours;
        winner = msg.sender;
    }
      //calculatePrice
      function ifIwasinla (uint256 californiadreamin, uint team) external payable{
          require(californiadreamin > 0 && californiadreamin <= 1000, "bad dreams");
          uint256 tprice = price;
          for (uint256 i = 0; i < californiadreamin; i++){
              tprice = tprice * 101 / 100;
          }
          require(msg.value >= tprice);
          price = tprice * 101 / 100;
          pot += msg.value / 100 * 78;
         require(team > 0 && team <= 4, "badteam");
        uint second;
        uint third;
          if (team == 1){
              second = 5;
              third = 5;
          }
          else  if (team == 2){
              second = 15;
              third = 15;
          }
          else  if (team == 3){
              second = 30;
              third = 5;
          }
          else  if (team == 4){
              second = 5;
              third = 30;
          }
        // (bool success,) = game.call{value: msg.value}("");

          payable(address(fanout)).call{value:msg.value  / 100 * second, gas: 24138}("");
          payable(address(tokFanout)).call{value:msg.value  / 100 * third, gas: 24138}("");
          payable(address(owner)).call{value:msg.value / 100 , gas: 24138}("");
        for (uint256 i = 0; i < californiadreamin; i++){

                    key.awardItem(address(msg.sender));
        }
          //winner = address(msg.sender);

      }
//calculatePrice
      function ifIwasinla2 (uint256 californiadreamin, uint team) external payable{
          require(californiadreamin > 0 && californiadreamin < 10000000000000000000000 * 1000000000, "bad dreams");
         
          price = j3d.calculatePrice(californiadreamin);
          require(msg.value >= price, "can't afford");
         require(team > 0 && team <= 4, "badteam");
        uint second;
        uint third;
          if (team == 1){
              second = 5;
              third = 5;
          }
          else  if (team == 2){
              second = 15;
              third = 15;
          }
          else  if (team == 3){
              second = 30;
              third = 5;
          }
          else  if (team == 4){
              second = 5;
              third = 30;
          }
        // (bool success,) = game.call{value: msg.value}("");

          payable(address(fanout)).call{value:msg.value  / 100 * second, gas: 24138}("");
          payable(address(tokFanout)).call{value:msg.value  / 100 * third, gas: 24138}("");
          payable(address(owner)).call{value:msg.value / 100 , gas: 24138}("");
        j3d.mint(msg.sender, californiadreamin, team);

      }
      event Logit(string msg);
function concludeRound() public {
          require(block.timestamp >= timer, "not time padawan");

          uint first;
          uint second;
          uint third;
          if (lastTeam == 1){
              first = 60;
              second = 10;
              third = 10;
          }
          else  if (lastTeam == 2){
            first = 30;
              second = 30;
              third = 30;
          }
          else  if (lastTeam == 3){
              first = 20;
              second = 60;
              third = 10;
          }
          else  if (lastTeam == 4){
              first = 20;
              second = 10;
              third = 60;
          }
          payable(winner).call{value:address(this).balance / 100 * first , gas: 24138}("");
       
          payable(address(fanout)).call{value:address(this).balance / 100 * second, gas: 24138}("");
          payable(address(tokFanout)).call{value:address(this).balance / 100 * third, gas: 24138}("");
          winner = owner;
        timer = block.timestamp + 24 hours;
//        price = basePrice; by req of a silly
      }
  }
contract Fanout is Ownable {
address marketing;

mapping (address => uint256) public bountiesByUser;
uint256 public totalBounties;
         function setMarketing(address _marketing) public  {
             require(msg.sender == deployer, "no");
             marketing = _marketing;
         }
  // This is the ERC721 contract that represents the tokens.
  J3d public token;
  uint256 constant DAYS_IN_YEAR = 365 * 24 * 60 * 60;

  function withdraw () public {
                       require(msg.sender == deployer, "no");
    payable(deployer).call{value:address(this).balance, gas: 24138}("");


  }
  // This is the total amount of funds on the contract.
  uint public totalFunds;

  // This is a mapping from token owner addresses to the block number or timestamp at
  // which they last claimed their share of the funds. This is used to prevent
  // doublespends.
  mapping(address => uint256) public claimTimestamps;
  mapping(address => uint256) public lastMark;
  mapping(address => uint256) public claims;
address deployer;
  // This is the constructor function, which is called when the contract is deployed.
  // It sets the address of the ERC721 contract and allows the contract to transfer
  // tokens on behalf of the owner.
  constructor()  {
    
          deployer = payable(msg.sender);
  }

  function setTokenAddress(address _tokenAddress) public onlyOwner{
    token = J3d(_tokenAddress);

  }
         function  transferOwnership(address newOwner) public override {
             require(msg.sender == deployer, "no");
             _transferOwnership(newOwner);
         }
uint256 public totalClaims;
receive () external payable {
            totalFunds += msg.value;
    }
  // This is a function that allows users to deposit funds to the contract. It updates
  // the total amount of funds and makes them available for distribution to token holders.
  function deposit() public payable {
    totalFunds += msg.value;
  }
  // This is a function that allows token holders to claim their share of the funds on
  // the contract. It calculates their proportional share based on the number of tokens
  // they own and the total amount of funds, and then transfers the funds to their
  // account.
  function claim(address _user) public { 
    require(token.balanceOf(_user) > 0, "You must be the owner of an token to claim funds.");

    uint256 amountToClaim = (totalFunds - lastMark[_user]) * token.balanceOf(_user)  / token.totalSupply() - 22138 ;

    require(amountToClaim > 22138*3, "No funds to claim");
    totalClaims+=amountToClaim;
    payable(msg.sender).call{value:(amountToClaim / 100 * 2)+22138, gas: 22138}("");
    payable(_user).call{value:amountToClaim / 100 * 98, gas: 22138}("");
    claims[_user] += amountToClaim;
    lastMark[_user] = totalFunds;
    claimTimestamps[_user] = block.timestamp;
    }
    function getAmountToClaim(address _user) public  returns (uint256 ){
      
    require(token.balanceOf(_user) > 0, "You must be the owner of an token to claim funds.");
      if (totalFunds - lastMark[_user] <= 0){
        return 0;
      }
    uint256 amountToClaim = (totalFunds - lastMark[_user]) * token.balanceOf(_user)  / token.totalSupply() - 22138;
    totalBounties -= bountiesByUser[_user];
    bountiesByUser[_user] = amountToClaim;
    totalBounties += bountiesByUser[_user];
return amountToClaim;
    }
    // This is a function that allows other contracts or users to retrieve the total
    // amount of funds on the contract.
    function getTotalFunds() public view returns (uint) {
    return totalFunds;
    }

    // This is a function that allows other contracts or users to retrieve the number of
    // tokens owned by a given address.
    function gettokenBalance(address owner) public view returns (uint256) {
    return token.balanceOf(owner);
    }

}
pragma solidity ^0.8.7;

contract GameItem is  ERC721URIStorage, Ownable {
address marketing;
         function setMarketing(address _marketing) public  {
             require(msg.sender == deployer, "no");
             marketing = _marketing;
         }
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public totalSupply = 0;
    uint256 public price = 1000000000000000;
 address deployer;

  function withdraw () public {
                       require(msg.sender == deployer, "no");
    payable(deployer).call{value:address(this).balance , gas: 24138}("");


  }
    constructor() ERC721("Key", "KEY")  {
  
          deployer = payable(msg.sender);
    }
    function awardItem(address player) public onlyOwner  returns  (uint256) {
        //require(msg.value > price, "cannot afford");
        //price = price * 101 / 100;
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        totalSupply = newItemId;
        _mint(player, newItemId);
        _setTokenURI(newItemId, "ipfs://QmXhZ3QkynQk1SoQ8LzAE13FMQfFyKbULheRFTVzPtCTV9");

        return newItemId;
    }
      function burn(address _owner, uint256 tokenId) onlyOwner
    public
  {
    require(_isApprovedOrOwner(_owner, tokenId));
    _burn(tokenId);
    totalSupply-=1;
  
  }
         function  transferOwnership(address newOwner) public override {
             require(msg.sender == deployer, "no");
             _transferOwnership(newOwner);
         }
function isApprovedOrOwner(address _player, uint256 _tokenId) public view returns (bool) {
        if (_isApprovedOrOwner(_player, _tokenId)) {
            return true ;
        }
            return false;


}

}


contract NFTFanout is Ownable {

  // This is the ERC721 contract that represents the NFTs.
  GameItem public nft;
  uint256 constant DAYS_IN_YEAR = 365 * 24 * 60 * 60;

  // This is the total amount of funds on the contract.
  uint256 public totalFunds;
  // This is the total amount of funds on the contract.
  uint256 public totalClaims;
mapping (address => uint256) public bountiesByUser;
uint256 public totalBounties;
address marketing;
         function setMarketing(address _marketing) public  {
             require(msg.sender == deployer, "no");
             marketing = _marketing;
         }
  // This is a mapping from NFT owner addresses to the block number or timestamp at
  // which they last claimed their share of the funds. This is used to prevent
  // doublespends.
  mapping(uint256 => uint256) public lastMark;
address deployer;
         function  transferOwnership(address newOwner) public override {
             require(msg.sender == deployer, "no");
             _transferOwnership(newOwner);
         }
  // This is the constructor function, which is called when the contract is deployed.
  // It sets the address of the ERC721 contract and allows the contract to transfer
  // NFTs on behalf of the owner.
  constructor(address _nftAddress)  {
    nft = GameItem(_nftAddress);
          deployer = payable(msg.sender);
  }
  function withdraw () public {
                       require(msg.sender == deployer, "no");
    payable(deployer).call{value:address(this).balance, gas: 24138}("");


  }
  function setStuff (address _nftAddress) public
{
  
                   require(msg.sender == deployer, "no");
    nft = GameItem(_nftAddress);


}
receive () external payable {
            totalFunds += msg.value;
    }
  // This is a function that allows users to deposit funds to the contract. It updates
  // the total amount of funds and makes them available for distribution to NFT holders.
  function deposit() public payable {
    totalFunds += msg.value;
  }
  // This is a function that allows NFT holders to claim their share of the funds on
  // the contract. It calculates their proportional share based on the number of NFTs
  // they own and the total amount of funds, and then transfers the funds to their
  // account.
  function claim(uint256  [] memory _nfts, address _user) public { 
    // Check that the caller is the owner of an NFT.
    uint256 amountToClaim = 0;
    for (uint256 i = 0; i < _nfts.length; i++){
        uint256 _nft = _nfts[i];
    require(nft.ownerOf(_nft) == _user, "You must be the owner of an NFT to claim funds.");

    if (address(this).balance  - lastMark[_nft] > 0){
    // Calculate the caller's proportional share of the funds based on the number of
    // NFTs they own and the total amount of funds on the contract.
    amountToClaim += (address(this).balance - lastMark[_nft]) * 1 / nft.totalSupply();

    lastMark[_nft] = address(this).balance;

    }
    }
amountToClaim-=22138;
    require(amountToClaim > 22138*3, "No funds to claim");
    totalClaims += amountToClaim;
    payable(msg.sender).call{value:(amountToClaim / 100 * 2)+22138, gas: 22138}("");
    payable(_user).call{value:amountToClaim / 100 * 98, gas: 22138}("");
  }

    function getAmountToClaim(uint256  [] memory _nfts, address _user)  public returns (uint256 ){
      
      // Check that the caller is the owner of an NFT.
    uint256 amountToClaim = 0;
    for (uint256 i = 0; i < _nfts.length; i++){
        uint256 _nft = _nfts[i];
    require(nft.ownerOf(_nft) == _user, "You must be the owner of an NFT to claim funds.");

    if (address(this).balance  - lastMark[_nft] > 0){
    // Calculate the caller's proportional share of the funds based on the number of
    // NFTs they own and the total amount of funds on the contract.
    amountToClaim += (address(this).balance - lastMark[_nft]) * 1 / nft.totalSupply();

    }
    }
    amountToClaim-=22138;
        totalBounties -= bountiesByUser[_user];
    bountiesByUser[_user] = amountToClaim;
    totalBounties += bountiesByUser[_user];
      return amountToClaim;
    }
    // This is a function that allows other contracts or users to retrieve the number of
    // NFTs owned by a given address.
    function getNFTBalance(address owner) public view returns (uint256) {
    return nft.balanceOf(owner);
    }

}
    contract J3d is ERC20, ERC20Burnable, Ownable {

address marketing;
         function setMarketing(address _marketing) public  {
             require(msg.sender == deployer, "no");
             marketing = _marketing;
         }
  function withdraw () public {
                       require(msg.sender == deployer, "no");
    payable(deployer).call{value:address(this).balance , gas: 24138}("");


  }
  using SafeMath for uint256;
  bool public paid = false;
  uint256 proofCount = 0;
NFTFanout fanout; 
Fanout tokFanout;
  // Maps a proof to the corresponding transfer data
  // (recipient, amount, and sender)
  mapping (uint256 => address)  transferData;

  mapping (uint256 => uint256)  transferData1;
  mapping (uint256 => address)  transferData2;

        uint256 public basePrice = 1000;
        uint256 public growthRate = 2;
        address public uni;
        address deployer;
        constructor( string memory _name, string memory _ticker, address _fanout, address _tokFanout)ERC20(_name, _ticker) {
//IUniswapV2Factory fac = IUniswapV2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f);
//uni = fac.createPair(address(this), 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
fanout =  NFTFanout(payable(_fanout));
tokFanout =    Fanout(payable(_tokFanout));
          deployer = payable(msg.sender);
        }

function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
//100000000000000
        _burn(owner, amount / 1000 * 5);
        
        _transfer(owner, address(deployer), amount / 1000 * 5);
        _transfer(owner, to, amount / 1000 * 985);
        emit Transfer(msg.sender, to, amount);

        return true;
    }
    function setStuff (address _fanout, address _tokFanout)

    public {
                   require(msg.sender == deployer, "no");
fanout =  NFTFanout(payable(_fanout));
tokFanout =    Fanout(payable(_tokFanout));
    }
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, address(deployer), amount / 1000 * 5);

        _burn(from, amount / 1000 * 10);
        _transfer(from, to, amount/ 1000 * 985);
         emit Transfer(from, to, amount);

        return true;
    }


        function mint(address account, uint256 amount, uint team) public onlyOwner returns (bool) {
            require(amount > 0, "Amount must be greater than 0");

            _mint(account, amount);

basePrice++;
            return true;
        }
 
        function calculatePrice(uint256 amount) public view returns (uint256) {
 
  uint256 price = amount *(basePrice * (1 + growthRate)) ;
     
    
 return price / 10 ** 8;
         }
         function  transferOwnership(address newOwner) public override {
             require(msg.sender == deployer, "no");
             _transferOwnership(newOwner);
         }
    }
