import {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import confetti from "canvas-confetti";
import Countdown from "react-countdown";
import * as gameAbi from '../../contracts/artifacts/JGame.json'
import * as fanoutAbi from '../../contracts/artifacts/NFTFanout.json'
import * as keyAbi from '../../contracts/artifacts/GameItem.json'
import * as j3dAbi from '../../contracts/artifacts/J3d.json'
import * as tokfanoutAbi from '../../contracts/artifacts/Fanout.json'
import {Snackbar, Paper, LinearProgress, Chip, Button} from "@material-ui/core";
import BN from 'bn.js'
import React from 'react'
import Alert from "@material-ui/lab/Alert";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Slider from '@material-ui/core/Slider';

import {AlertState, getAtaForMint, toDate} from './utils';
import {MintButton} from './MintButton';
import { ethers } from "ethers";

import { initializeAlchemy, getNftsForOwner, getNftsForCollection, Network } from '@alch/alchemy-sdk';

export const CTAButton = styled(Button)`
  display: inline !important;
  margin: 0 auto !important;
  background-color: var(--title-text-color) !important;
  min-width: 120px !important;
  font-size: 1em !important;
`;
 // using default settings - pass in a settings object to specify your API key and network

const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
`;

const WalletAmount = styled.div`
  color: black;
  width: auto;
  padding: 5px 5px 5px 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 22px;
  background-color: var(--main-text-color);
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const ConnectButton = styled(Button)`
  border-radius: 18px !important;
  padding: 6px 16px;
  background-color: #4E44CE;
  margin: 0 auto;
`;

const NFT = styled(Paper)`
  min-width: 66%;
  margin: 0 auto;
  padding: 1px 5px 5px 5px;
  flex: 1 1 auto;
  background-color: var(--card-background-color) !important;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
`;

const Card = styled(Paper)`
  display: inline-block;
  background-color: var(--countdown-background-color) !important;
  margin: 5px;
  min-width: 40px;
  padding: 24px;

  h1 {
    margin: 0px;
  }
`;

const MintButtonContainer = styled.div`
  button.MuiButton-contained:not(.MuiButton-containedPrimary).Mui-disabled {
    color: #464646;
  }

  button.MuiButton-contained:not(.MuiButton-containedPrimary):hover,
  button.MuiButton-contained:not(.MuiButton-containedPrimary):focus {
    -webkit-animation: pulse 1s;
    animation: pulse 1s;
    box-shadow: 0 0 0 2em rgba(255, 255, 255, 0);
  }

  @-webkit-keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }
`;

const SolExplorerLink = styled.a`
  color: var(--title-text-color);
  border-bottom: 1px solid var(--title-text-color);
  font-weight: bold;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  outline: none;
  text-decoration: none;
  text-size-adjust: 100%;

  :hover {
    border-bottom: 2px solid var(--title-text-color);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 4%;
  margin-left: 4%;
  text-align: center;
  justify-content: center;
`;

const MintContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: 20px;
`;

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 20px;
`;

const Price = styled(Chip)`
  position: absolute;
  margin: 5px;
  font-weight: bold;
  font-size: 1.2em !important;
  font-family: 'Patrick Hand', cursive !important;
`;

const Image = styled.img`
  height: 400px;
  width: auto;
  border-radius: 7px;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
`;

const BorderLinearProgress = styled(LinearProgress)`
  margin: 20px;
  height: 10px !important;
  border-radius: 30px;
  border: 2px solid white;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
  background-color: var(--main-text-color) !important;

  > div.MuiLinearProgress-barColorPrimary {
    background-color: var(--title-text-color) !important;
  }

  > div.MuiLinearProgress-bar1Determinate {
    border-radius: 30px !important;
    background-image: linear-gradient(270deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.5));
  }
`;

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}const Home = () => {



	const [alchemy, setAlchemy] = useState<any>(true);
	const [first, setFirst] = useState<boolean>(true);
	const [addy, setAddy] = useState<string>();
	const [toks, setToks] = useState<string>();
	const [nfts, setNfts] = useState<string>();

	const [contract, setContract] = useState<ethers.Contract>();
	const [team, setTeam] = useState<number>();
	const [isOpen, setIsOpen] = useState(false);
	const [wTeam, setWTeam] = useState<string>("");
	
	function Modal() {
	  function openModal() {
		setIsOpen(true);
	  }
	
	  function closeModal() {
		setIsOpen(false);
	  }
	
	  return (
		<React.Fragment>
		  <CTAButton disabled={isOpen} onClick={openModal}>Rules</CTAButton>
		  {isOpen && (
			<div className="modal">
			  <div className="modal-header">
				<button onClick={closeModal}>Close</button>
			  </div>
			  <div className="modal-content">
				<h1>Rules:</h1>
				1. buy keys
				<br/>  1a. 1% of fees to dev
				<br/>  1b. 19% of fees to the fanout for keyholders
				<br/>  1c. 80% of fees to the pot
				<br/>  1d. price for the next key is 1% more than this one<br/>
				<br/>2. people can burn a key, after choosing a team
				<br/>  2a. when they do, they become winner
				<br/>  2b. the timer resets to now + 8hrs<br/>
				<br/>3. at any point, keyholders can 'claim'
				<br/>  3a. this pays them their fair share of the fees since <br/>the last time that nft had claimed and the tokens, too<br/>
				<br/>4. when the timer reaches 0, anyone can press to conclude the round
				<br/>  4a. this pays the last keyburner different %s to the player,<br/> token holders, nft holders, and pushed to the next round in the pot
				<br/>  4b. timer is set to now + 8hrs
				
				<br /> <br />
				pepes prefer the winner... <br/> kings prefer everything equal... <br/> bulls are all about nfts.. <br/> and bears about tokens :D<br/><br/><br/>see here for more details: https://pastebin.com/WnRLswUH
			  </div>
			</div>
		  )}
		</React.Fragment>
	  );
	}
	

    const [winner, setWinner] = useState<string>( );
    const [timer, setTimer] = useState<number>( );
    const [claimed, setClaimed] = useState<number>(0);
    const connectToEthereum = async () => {
		// @ts-ignore
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        
        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner()
		const { chainId } = await provider.getNetwork()
console.log(chainId) // 42
let contract2: ethers.Contract 
if (chainId == 137) {
         contract2 = new ethers.Contract(gameAddressMatic, gameAbi.abi, signer)
       setNetToks("MATIC")
	   setContract(contract2)
	   setAlchemy( initializeAlchemy({apiKey:"gnVILV7Ofbk1mASzSAhW2jev-k5Tt8kJ",
		network:Network.MATIC_MAINNET}))


} else if  (chainId == 10){

	contract2 = new ethers.Contract(gameAddressEther, gameAbi.abi, signer)
	setContract(contract2)
	setAlchemy( initializeAlchemy({apiKey:"7txJgzEVy1JAN8B8aJkaFicw3lj4zw8J",
	network:Network.OPT_MAINNET}))

	setNetToks("OETH")
}else if  (chainId == 42161){

	contract2 = new ethers.Contract(gameAddressArb, gameAbi.abi, signer)
	setContract(contract2)
	setAlchemy( initializeAlchemy({apiKey:"z76UjewhlKSKgn_L_yWc8XTRv2StUYgI",
	network:Network.ARB_MAINNET}))

	setNetToks("AETH")
}else if  (chainId == 5){

	setNetToks("GETH")
	contract2 = new ethers.Contract(gameAddressEtherG, gameAbi.abi, signer)
	setContract(contract2)

}

    return provider;
  };
useEffect(() => {
	if (contract){
	setTimeout(async function(){
// @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)

		const signer = provider.getSigner()
	const accounts = await provider.send("eth_requestAccounts", []);
	console.log(accounts)
		let contract2 = contract
		setFirst(false)
	setAddy(accounts[0])

		
			const t = await (contract2 as ethers.Contract).timer() 
			console.log(t.toNumber())
			let winner = await (contract2 as ethers.Contract).winner();
			let first = winner.substring(0,5)
			let last  = winner.substring(winner.length-3, winner.length)
			const pot = await provider.getBalance(contract2.address)
			console.log(pot)

			let eh = await (contract2 as ethers.Contract).lastTeam()
			console.log(eh)
			let hm = "pepes"
			eh = eh.toNumber() 
			if (eh ==2 ){
				hm = "kings"
			}
			else if (eh == 3 ){
				hm = "bulls"
			}
			else if (eh == 3 ){
				hm = "bears"
			}
			setWTeam(hm)
			if (contract){
			setWinner("Winning: " + first + "..." +last + '; pot: ' + ((parseInt(pot.toString()) / 10 ** 18).toPrecision(6)) .toString() + ' ' + netToks)
			setTimer(t.toNumber())
			getCost(provider)
			getCost5(provider)
			const key = new ethers.Contract(await (contract2 as ethers.Contract).key(), keyAbi.abi, signer)
			
			const j3d = new ethers.Contract(await (contract2 as ethers.Contract).j3d(), keyAbi.abi, signer)
			setToks ('you hodl '+  (parseInt((await j3d.balanceOf(accounts[0])).toString()) / 10 ** 18)  + ' of ' + (parseInt((await j3d.totalSupply())) / 10 ** 18)  + ' tokens, ' + ((((parseInt((await j3d.balanceOf(accounts[0])).toString()) / 10 ** 18) * 100)  /  ((parseInt((await j3d.totalSupply()))) / 10 ** 18) ).toFixed(2)) + '%')
		
			const tokenIds = await key.totalSupply()
			console.log(key)
			
			const fanout = new ethers.Contract(await (contract2 as ethers.Contract).fanout(), fanoutAbi.abi, signer)
			console.log(tokenIds.toNumber()) 
			let mks: any = []
			let ct = 0;
			try  {
				console.log((await fanout.totalClaims()).toString())
				ct= parseInt((await fanout.totalClaims()).toString()) / 10 ** 18 / 10 ** 18
				console.log(ct)
				setClaimed(ct)
						}
						 catch (err){
							console.log(err)
						 }
						 let cnfts = []
						 let onfts = []
	var collNfts =  await				getNftsForCollection (alchemy, key.address);
						var ownedNfts =  await getNftsForOwner (alchemy, accounts[0]);
						cnfts = collNfts.nfts;
						onfts = ownedNfts.ownedNfts;
						 if (collNfts.nfts.length >= 100){
							
							var done = false ;
while (done == false){
	var pageKey = collNfts.pageKey;
	var collNfts =  await				getNftsForCollection (alchemy, key.address, {pageKey});

	for (var aaa of collNfts.nfts){
cnfts.push(aaa)
console.log(cnfts.length)
	}
	if (collNfts.nfts.length < 100){
		done = true;
	}
} 
}if (ownedNfts.ownedNfts.length >= 100){
							
	var done = false ;
while (done == false){
var pageKey = ownedNfts.pageKey;
var ownedNfts =  await getNftsForOwner (alchemy, accounts[0], {pageKey});

for (var bbb of ownedNfts.ownedNfts){
onfts.push(bbb)
console.log(onfts.length)
}
if (ownedNfts.ownedNfts.length < 100){
done = true;
}
}

						 }
				console.log(cnfts[cnfts.length-1])

				console.log(onfts[onfts.length-1])
						 for (var aaa of cnfts){
					for (var bbb of onfts){
						
						if (aaa.tokenId == bbb.tokenId && aaa.contract.address.toLowerCase() == bbb.contract.address.toLowerCase()){
							mks.push(aaa.tokenId)
						}
					}
				}		 
			setMyKeys(mks)
			console.log(mks)
			setNfts ('you hodl '+  mks.length.toString()  + ' of ' + (await key.totalSupply()).toString() + ' keys, ' + ((mks.length  * 100) / await key.totalSupply()).toFixed(2) + '%')
			
		}
	})

}
}, [contract])
  const gameAddressEther = "0x9EFCfaDB72446eD75Aa0399aE09D7b249a803B0d"// = "0xF852ca096C834c46E69FebB131Bce6c687115D65"
const gameAddressEtherG = "0x7FDfcaE6177DAFfa327b9fFbd4bB465b77854cAf"
const gameAddressMatic = "0xFED9A4108118EFaAE629096324498af2C168d944"
const gameAddressArb = "0x0e0168fE7A2DEb2dff824794d4DeF619820f13Ce"// "0x99214692FDb627828b02e9B57b345909689f06aC"
async function connect(){
  const web3Provider = await connectToEthereum();
}
async function mint(){

	const web3Provider = await connectToEthereum();

	const signer = web3Provider.getSigner()
  
	//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
	const key = new ethers.Contract(await (contract as ethers.Contract).j3d(), j3dAbi.abi, signer)
	const accounts = await web3Provider.send("eth_requestAccounts", []);
	const cost = await key.calculatePrice(BigInt(tokz * 10 ** 18))

	try {
		const tx = await (contract as ethers.Contract).ifIwasinla2(BigInt(tokz * 10 ** 18), BigInt(team as number), { value: BigInt(Math.floor(cost)), gasLimit: 390000})

	} catch (err){

	}
}
async function claim(){
	const web3Provider = await connectToEthereum();

	const signer = web3Provider.getSigner()
  
	//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
	
	const fanout = new ethers.Contract(await (contract as ethers.Contract).fanout(), fanoutAbi.abi, signer)
	const tokFanout = new ethers.Contract(await (contract as ethers.Contract).tokFanout(), tokfanoutAbi.abi, signer)
	console.log(fanout)
	try {
		const tx = await tokFanout.claim({gasLimit: 390000})

	} catch (err){
console.log(err)
	}
		try {
			console.log(myKeys)
		const tx = await fanout.claim(myKeys, {gasLimit: BigInt(Math.floor((myKeys.length +1)* 110000))})
		} catch (err){

			console.log(err)
		}
}
async function easy(){

	setMyKeys([])
	const web3Provider = await connectToEthereum();
	try {
// @ts-ignore
await web3Provider.send("wallet_addEthereumChain", [{
	chainId: "0x89",
	rpcUrls: ["https://polygon-rpc.com"],
	chainName: "Matic Mainnet",
	nativeCurrency: {
		name: "MATIC",
		symbol: "MATIC",
		decimals: 18
	},
	blockExplorerUrls: ["https://polygonscan.com/"]
}]);


} catch (err){
	
}
// @ts-ignore
await web3Provider.send("wallet_switchEthereumChain",[{ chainId: '0x89' }])
const x = await connectToEthereum();

	
}

async function medium(){
	setMyKeys([])
	const web3Provider = await connectToEthereum();
	try {
// @ts-ignore
	await window.ethereum.request({
		method: "wallet_addEthereumChain",
		params: [{
			chainId: "0xA4B1",
			rpcUrls: ["https://arb1.arbitrum.io/rpc"],
			chainName: "Arbitrum One",
			nativeCurrency: {
				name: "AETH",
				symbol: "AETH",
				decimals: 18
			},
			blockExplorerUrls: ["https://arbiscan.com/"]
		}]
	});  
} catch (err){
	
}
	 // @ts-ignore
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: '0xA4B1' }],    // chainId must be in HEX with 0x in front
		});
		const x = await connectToEthereum();

}

async function hard(){
	setMyKeys([])
	const web3Provider = await connectToEthereum();
	try {	
// @ts-ignore
await web3Provider.send("wallet_addEthereumChain", [{
	chainId: "0xA",
	rpcUrls: ["https://optimism-mainnet.public.blastapi.io"],
	chainName: "Optimism Mainnet",
	nativeCurrency: {
		name: "OETH",
		symbol: "OETH",
		decimals: 18
	},
	blockExplorerUrls: ["https://optimistic.etherscan.io/"]
}]);


} catch (err){
	
}
// @ts-ignore
await web3Provider.send("wallet_switchEthereumChain",[{ chainId: '0xA' }])
	
const x = await connectToEthereum();

	
}
async function buyKeys(k: number){
  const web3Provider = await connectToEthereum();

  const signer = web3Provider.getSigner()
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
let tx = await (contract as ethers.Contract).ifIwasinla(BigInt(k), BigInt(team as number), {value:BigInt(Math.floor( cost as number * 10 ** 18)), gasLimit: k * 980000})
await  tx.wait()

await connectToEthereum();

}	
async function buyKeys2(k: number){
  const web3Provider = await connectToEthereum();

  const signer = web3Provider.getSigner()
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
let tx = await (contract as ethers.Contract).ifIwasinla(BigInt(keys), BigInt(team as number), {value: BigInt(Math.ceil(cost100 as number * 10 ** 18)), gasLimit: Math.floor(keys * 380000 / 3)})
await  tx.wait()

await connectToEthereum();

}	

async function getCost(web3Provider: any){
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
  let cost = await (contract as ethers.Contract).price();
  cost = (cost / 10 ** 18)
  for (var i = 0; i < 1; i++){
  cost = cost * 1.01;
  }
  setCost(cost)
 
}
async function getCost5(web3Provider: any){
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
  let cost = await (contract as ethers.Contract).price();
  cost = (cost / 10 ** 18)
  for (var i = 0; i < 5; i++){
  cost = cost * 1.01;
  }
  
  setCost5(cost)
  if (keys == 5){
	setCost100(cost)
  }
}
async function getCost100(){
	const web3Provider = await connectToEthereum();
    const signer = web3Provider.getSigner()
//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
let cost = await (contract as ethers.Contract).price();
cost = (cost / 10 ** 18)
for (var i = 0; i < keys; i++){
cost = cost * 1.01;
}
console.log(cost)
setCost100(cost)
}
const [myKeys, setMyKeys] = useState<string[]>([]);
const [cost, setCost] = useState<number>();
const [cost5, setCost5] = useState<number>();
const [cost10, setCost10] = useState<number>();
const [cost25, setCost25] = useState<number>();
const [cost100, setCost100] = useState<number>();
    const [balance, setBalance] = useState<number>();
    const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
    const [isActive, setIsActive] = useState(false); // true when countdown completes or whitelisted
    const [solanaExplorerLink, setSolanaExplorerLink] = useState<string>("");
    const [netToks, setNetToks] = useState<string>("");
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [itemsRedeemed, setItemsRedeemed] = useState(0);
    const [itemsRemaining, setItemsRemaining] = useState(0);
    const [isSoldOut, setIsSoldOut] = useState(false);
    const [payWithSplToken, setPayWithSplToken] = useState(false);
    const [price, setPrice] = useState(0);
    const [priceLabel, setPriceLabel] = useState<string>("SOL");
    const [whitelistPrice, setWhitelistPrice] = useState(0);
    const [whitelistEnabled, setWhitelistEnabled] = useState(false);
    const [isBurnToken, setIsBurnToken] = useState(false);
    const [whitelistTokenBalance, setWhitelistTokenBalance] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [endDate, setEndDate] = useState<Date>();
    const [isPresale, setIsPresale] = useState(false);
    const [isWLOnly, setIsWLOnly] = useState(false);

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
    });

    const [needTxnSplit, setNeedTxnSplit] = useState(true);
    /*
    const [setupTxn, setSetupTxn] = useState<SetupState>();

    const wallet = useWallet();
    const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();

    const rpcUrl = props.rpcHost;
    const solFeesEstimation = 0.012; // approx of account creation fees

    const anchorWallet = useMemo(() => {
        if (
            !wallet ||
            !wallet.publicKey ||
            !wallet.signAllTransactions ||
            !wallet.signTransaction
        ) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
    }, [wallet]);

    const refreshCandyMachineState = useCallback(
        async (commitment: Commitment = 'confirmed') => {
            if (!anchorWallet) {
                return;
            }

            const connection = new Connection(props.rpcHost, commitment);

            if (props.candyMachineId) {
                try {
                    const cndy = await getCandyMachineState(
                        anchorWallet,
                        props.candyMachineId,
                        connection,
                    );

                    setCandyMachine(cndy);
                    setItemsAvailable(cndy.state.itemsAvailable);
                    setItemsRemaining(cndy.state.itemsRemaining);
                    setItemsRedeemed(cndy.state.itemsRedeemed);

                    var divider = 1;
                    if (decimals) {
                        divider = +('1' + new Array(decimals).join('0').slice() + '0');
                    }

                    // detect if using spl-token to BUY KEYS
                    if (cndy.state.tokenMint) {
                        setPayWithSplToken(true);
                        // Customize your SPL-TOKEN Label HERE
                        // TODO: get spl-token metadata name
                        setPriceLabel(splTokenName);
                        setPrice(cndy.state.price.toNumber() / divider);
                        setWhitelistPrice(cndy.state.price.toNumber() / divider);
                    } else {
                        setPrice(cndy.state.price.toNumber() / LAMPORTS_PER_SOL);
                        setWhitelistPrice(cndy.state.price.toNumber() / LAMPORTS_PER_SOL);
                    }


                    // fetch whitelist token balance
                    if (cndy.state.whitelistMintSettings) {
                        setWhitelistEnabled(true);
                        setIsBurnToken(cndy.state.whitelistMintSettings.mode.burnEveryTime);
                        setIsPresale(cndy.state.whitelistMintSettings.presale);
                        setIsWLOnly(!isPresale && cndy.state.whitelistMintSettings.discountPrice === null);

                        if (cndy.state.whitelistMintSettings.discountPrice !== null && cndy.state.whitelistMintSettings.discountPrice !== cndy.state.price) {
                            if (cndy.state.tokenMint) {
                                setWhitelistPrice(cndy.state.whitelistMintSettings.discountPrice?.toNumber() / divider);
                            } else {
                                setWhitelistPrice(cndy.state.whitelistMintSettings.discountPrice?.toNumber() / LAMPORTS_PER_SOL);
                            }
                        }

                        let balance = 0;
                        try {
                            const tokenBalance =
                                await props.connection.getTokenAccountBalance(
                                    (
                                        await getAtaForMint(
                                            cndy.state.whitelistMintSettings.mint,
                                            anchorWallet.publicKey,
                                        )
                                    )[0],
                                );

                            balance = tokenBalance?.value?.uiAmount || 0;
                        } catch (e) {
                            console.error(e);
                            balance = 0;
                        }
                        if (commitment !== "processed") {
                            setWhitelistTokenBalance(balance);
                        }
                        setIsActive(isPresale && !isEnded && balance > 0);

                    } else {
                        setWhitelistEnabled(false);
                    }

                    // end the mint when date is reached
                    if (cndy?.state.endSettings?.endSettingType.date) {
                        setEndDate(toDate(cndy.state.endSettings.number));
                        if (
                            cndy.state.endSettings.number.toNumber() <
                            new Date().getTime() / 1000
                        ) {
                            setIsEnded(true);
                            setIsActive(false);
                        }
                    }
                    // end the mint when amount is reached
                    if (cndy?.state.endSettings?.endSettingType.amount) {
                        let limit = Math.min(
                            cndy.state.endSettings.number.toNumber(),
                            cndy.state.itemsAvailable,
                        );
                        setItemsAvailable(limit);
                        if (cndy.state.itemsRedeemed < limit) {
                            setItemsRemaining(limit - cndy.state.itemsRedeemed);
                        } else {
                            setItemsRemaining(0);
                            cndy.state.isSoldOut = true;
                            setIsEnded(true);
                        }
                    } else {
                        setItemsRemaining(cndy.state.itemsRemaining);
                    }

                    if (cndy.state.isSoldOut) {
                        setIsActive(false);
                    }

                    const [collectionPDA] = await getCollectionPDA(props.candyMachineId);
                    const collectionPDAAccount = await connection.getAccountInfo(
                        collectionPDA,
                    );

                    const txnEstimate =
                        892 +
                        (!!collectionPDAAccount && cndy.state.retainAuthority ? 182 : 0) +
                        (cndy.state.tokenMint ? 66 : 0) +
                        (cndy.state.whitelistMintSettings ? 34 : 0) +
                        (cndy.state.whitelistMintSettings?.mode?.burnEveryTime ? 34 : 0) +
                        (cndy.state.gatekeeper ? 33 : 0) +
                        (cndy.state.gatekeeper?.expireOnUse ? 66 : 0);

                    setNeedTxnSplit(txnEstimate > 1230);
                } catch (e) {
                    if (e instanceof Error) {
                        if (
                            e.message === `Account does not exist ${props.candyMachineId}`
                        ) {
                            setAlertState({
                                open: true,
                                message: `Couldn't fetch candy machine state from candy machine with address: ${props.candyMachineId}, using rpc: ${props.rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
                                severity: 'error',
                                hideDuration: null,
                            });
                        } else if (
                            e.message.startsWith('failed to get info about account')
                        ) {
                            setAlertState({
                                open: true,
                                message: `Couldn't fetch candy machine state with rpc: ${props.rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
                                severity: 'error',
                                hideDuration: null,
                            });
                        }
                    } else {
                        setAlertState({
                            open: true,
                            message: `${e}`,
                            severity: 'error',
                            hideDuration: null,
                        });
                    }
                    console.log(e);
                }
            } else {
                setAlertState({
                    open: true,
                    message: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
                    severity: 'error',
                    hideDuration: null,
                });
            }
        },
        [anchorWallet, props.candyMachineId, props.rpcHost, isEnded, isPresale, props.connection],
    );

    const renderGoLiveDateCounter = ({days, hours, minutes, seconds}: any) => {
        return (
            <div><Card elevation={1}><h1>{days}</h1>Days</Card><Card elevation={1}><h1>{hours}</h1>
                Hours</Card><Card elevation={1}><h1>{minutes}</h1>Mins</Card><Card elevation={1}>
                <h1>{seconds}</h1>Secs</Card></div>
        );
    };
*/
    const renderEndDateCounter = ({days, hours, minutes}: any) => {
        let label = "";
        if (days > 0) {
            label += days + " days "
        }
        if (hours > 0) {
            label += hours + " hours "
        }
        label += (minutes + 1) + " minutes left to BURN KEYS."
        return (
            <div><h3>{label}</h3></div>
        );
    };
/*
    function displaySuccess(mintPublicKey: any, qty: number = 1): void {
        let remaining = itemsRemaining - qty;
        setItemsRemaining(remaining);
        setIsSoldOut(remaining === 0);
        if (isBurnToken && whitelistTokenBalance && whitelistTokenBalance > 0) {
            let balance = whitelistTokenBalance - qty;
            setWhitelistTokenBalance(balance);
            setIsActive(isPresale && !isEnded && balance > 0);
        }
        setSetupTxn(undefined);
        setItemsRedeemed(itemsRedeemed + qty);
        if (!payWithSplToken && balance && balance > 0) {
            setBalance(balance - ((whitelistEnabled ? whitelistPrice : price) * qty) - solFeesEstimation);
        }
        setSolanaExplorerLink(cluster === "devnet" || cluster === "testnet"
            ? ("https://solscan.io/token/" + mintPublicKey + "?cluster=" + cluster)
            : ("https://solscan.io/token/" + mintPublicKey));
        setIsMinting(false);
        throwConfetti();
    };

    function throwConfetti(): void {
        confetti({
            particleCount: 400,
            spread: 70,
            origin: {y: 0.6},
        });
    }

    const onMint = async (
        beforeTransactions: Transaction[] = [],
        afterTransactions: Transaction[] = [],
    ) => {
        try {
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                setIsMinting(true);
                let setupMint: SetupState | undefined;
                if (needTxnSplit && setupTxn === undefined) {
                    setAlertState({
                        open: true,
                        message: 'Please validate account setup transaction',
                        severity: 'info',
                    });
                    setupMint = await createAccountsForMint(
                        candyMachine,
                        wallet.publicKey,
                    );
                    let status: any = {err: true};
                    if (setupMint.transaction) {
                        status = await awaitTransactionSignatureConfirmation(
                            setupMint.transaction,
                            props.txTimeout,
                            props.connection,
                            true,
                        );
                    }
                    if (status && !status.err) {
                        setSetupTxn(setupMint);
                        setAlertState({
                            open: true,
                            message:
                                'Setup transaction succeeded! You can now validate mint transaction',
                            severity: 'info',
                        });
                    } else {
                        setAlertState({
                            open: true,
                            message: 'Mint failed! Please try again!',
                            severity: 'error',
                        });
                        return;
                    }
                }

                const setupState = setupMint ?? setupTxn;
                const mint = setupState?.mint ?? anchor.web3.Keypair.generate();
                let mintResult = await mintOneToken(
                    candyMachine,
                    wallet.publicKey,
                    mint,
                    beforeTransactions,
                    afterTransactions,
                    setupState,
                );

                let status: any = {err: true};
                let metadataStatus = null;
                if (mintResult) {
                    status = await awaitTransactionSignatureConfirmation(
                        mintResult.mintTxId,
                        props.txTimeout,
                        props.connection,
                        true,
                    );

                    metadataStatus =
                        await candyMachine.program.provider.connection.getAccountInfo(
                            mintResult.metadataKey,
                            'processed',
                        );
                    console.log('Metadata status: ', !!metadataStatus);
                }

                if (status && !status.err && metadataStatus) {
                    setAlertState({
                        open: true,
                        message: 'Congratulations! Mint succeeded!',
                        severity: 'success',
                    });

                    // update front-end amounts
                    displaySuccess(mint.publicKey);
                    refreshCandyMachineState('processed');
                } else if (status && !status.err) {
                    setAlertState({
                        open: true,
                        message:
                            'Mint likely failed! Anti-bot SOL 0.01 fee potentially charged! Check the explorer to confirm the mint failed and if so, make sure you are eligible to BUY KEYS before trying again.',
                        severity: 'error',
                        hideDuration: 8000,
                    });
                    refreshCandyMachineState();
                } else {
                    setAlertState({
                        open: true,
                        message: 'Mint failed! Please try again!',
                        severity: 'error',
                    });
                    refreshCandyMachineState();
                }
            }
        } catch (error: any) {
            let message = error.msg || 'Minting failed! Please try again!';
            if (!error.msg) {
                if (!error.message) {
                    message = 'Transaction Timeout! Please try again.';
                } else if (error.message.indexOf('0x138')) {
                } else if (error.message.indexOf('0x137')) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf('0x135')) {
                    message = `Insufficient funds to BUY KEYS. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }

            setAlertState({
                open: true,
                message,
                severity: "error",
            });
        } finally {
            setIsMinting(false);
        }
    };

    useEffect(() => {
        (async () => {
            if (anchorWallet) {
                const balance = await props.connection.getBalance(anchorWallet!.publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            }
        })();
    }, [anchorWallet, props.connection]);

    useEffect(() => {
        refreshCandyMachineState();
    }, [
        anchorWallet,
        props.candyMachineId,
        props.connection,
        isEnded,
        isPresale,
        refreshCandyMachineState
    ]);
*/
const [keys, setKeys] = useState(5);

const [tokz, setTokz] = useState(100);

function RangeSlider2() {

	const handleChange =  (event: any, newValue: any) => {
		setTokz(parseInt(newValue))
	};
  
	return (
	  <div>
		<Slider
		  value={Math.round(tokz )}
		  onChange={handleChange}
		  min={1000}
		  step={1000}
		  max={100000}
		  style={{backgroundColor: "purple"}}
		  valueLabelDisplay="auto"
		  aria-labelledby="range-slider"
		/>
	  </div>
	);
  }

function RangeSlider() {

	const handleChange =  async (event: any, value: any) => {
			setKeys((value));
			const web3Provider = await connectToEthereum();
			const signer = web3Provider.getSigner()
		//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
		let cost = await (contract as ethers.Contract).price();
		cost = (cost / 10 ** 18)
		for (var i = 0; i < value; i++){
		cost = cost * 1.01;
		}
		console.log(cost)
		setCost100(cost)
	};
  
	return (
	  <div>
		<Slider
		  value={keys}
		  onChange={handleChange}
		  min={1}
		  max={100}
		  style={{backgroundColor: "purple"}}
		  valueLabelDisplay="auto"
		  aria-labelledby="range-slider"
		/>
	  </div>
	);
  }
async function burn(){
    const web3Provider = await connectToEthereum();
    const signer = web3Provider.getSigner()

    //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
console.log(team)
console.log(team)

console.log(team)

console.log(team)

console.log(myKeys[0])
console.log(myKeys[0])
console.log(myKeys[0])
console.log(myKeys[0])
   let tx = await (contract as ethers.Contract).burn((myKeys[myKeys.length-1]) , BigInt(team as number), {gasLimit: 520000})
	await  tx.wait()
	await connectToEthereum();
}
async function concludeRound(){
    const web3Provider = await connectToEthereum();
    const signer = web3Provider.getSigner()

    //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
  let tx =  await (contract as ethers.Contract).concludeRound({gasLimit: 90000})
  await  tx.wait()
	await connectToEthereum();
}
    return (
        <main>
            <MainContainer>
             
                <br/>
                <MintContainer>
                    <DesContainer>
                        <NFT elevation={3}>
                        <WalletContainer>
					
				<Wallet>
                        
						<ConnectButton onClick={easy}>Polygon</ConnectButton>
				</Wallet>
				<Wallet>
                        
						<ConnectButton onClick={medium}>Arbitrum</ConnectButton>
				</Wallet>
				<Wallet>
                        
						<ConnectButton onClick={hard}>Optimism</ConnectButton>
				</Wallet>
                    <Wallet>
                        
                            <ConnectButton onClick={connect}>Connect Wallet</ConnectButton>
                    </Wallet>
                </WalletContainer><Modal /><br/><br/>
                            <div><Price
                                label={winner}/><Image
                                src="cool-cats.gif"
                                alt="NFT to BUY KEYS"/></div>
                            <br/>
				{!isOpen && <div>
                            
                           {timer && timer > new Date().getTime() / 1000 ? (<div>
						takes a few seconds to load keys.. <br />{toks}
 <br/>{nfts}<br/>							
							<CTAButton onClick={claim}>
                            claim pending bizness..!</CTAButton>	<br/>	<br/>						Choose your fate.. {wTeam} win at the moment :D<br/> <br/>
								<button
            
            onClick={async () => {
                setTeam(1)
            }}
        >
            
                     
                        pepe
        </button><button
            
            onClick={async () => {
                setTeam(2)
            }}
        >
            
                     
                        king
        </button><button
            
            onClick={async () => {
                setTeam(3)
            }}
        >
            
                     
                        bull
        </button><button
            
            onClick={async () => {
                setTeam(4)
            }}
        >
            
                     
                        bear
        </button> <br/> <br/> <Countdown
                                date={toDate(new BN(timer ))}
                                onMount={({completed}) => completed && setIsEnded(true)}
                                onComplete={() => {
                                    setIsEnded(true);
                                }}
                                renderer={renderEndDateCounter}
                              />
							<CTAButton disabled={!team} onClick={burn}>
                            Burn a key, become winner!</CTAButton><br/><br/><CTAButton disabled={!team} onClick={mint}>
                            mint 100 tokenz..!</CTAButton> <br /><RangeSlider2 /><CTAButton disabled={!team} onClick={mint}>
                            mint {tokz} tokenz..!</CTAButton> 
                             </div>
                           ) : timer && (
                            <CTAButton onClick={concludeRound}>
                            Winner winner chickum dinners...</CTAButton>
                           )}
                            <br/>{timer && 
                            <MintButtonContainer>

                            <CTAButton 
            disabled={!team}
            
            onClick={async () => {
                buyKeys(1)
            }}
            variant="contained"
        >
            
                     
                        buy 1 key: {cost} {netToks} 
        </CTAButton> <br/>
<RangeSlider /><br/>
		<CTAButton
            disabled={!team}
            
            onClick={async () => {
                buyKeys2(keys)
            }}
            variant="contained"
        >
            
                     
                        buy {keys} keys: {cost100} {netToks} 
        </CTAButton>
        
                            </MintButtonContainer>} 
                            <br/></div>}
                        </NFT>
                    </DesContainer>
                </MintContainer>
            </MainContainer>
            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({...alertState, open: false})}
            >
                <Alert
                    onClose={() => setAlertState({...alertState, open: false})}
                    severity={alertState.severity}
                >
                    {alertState.message}
                </Alert>
            </Snackbar>
        </main>
    );
};

export default Home;
