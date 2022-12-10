// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./contracts/1_Storage.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './ethers-lib'
(async () => {
    try {  
        var result = await deploy('GameItem', [])
        console.log(`nft address: ${result.address}`)
                var result2 = await deploy('NFTFanout',  [result.address])
        console.log(`nft fanout address: ${result2.address}`)
                var result3 = await deploy('Fanout', [])
        console.log(`token fanout address: ${result3.address}`)  //0x9Fd10DCFCe7e676a088157a742A96dFd60295457, 0x377Ac8ae2fd8320aF8095F57cBf0bb1e5C7CA59E, 0xA9dEAC4C0999292FF7cB307f6893d65518484102, 0x9bE00510CA256795E55b2F98594e626cbE707213 
                var result4 = await deploy('J3d', ["j3d", "J3D", result3.address, result2.address])
        console.log(`j3d token address: ${result4.address}`) 
                var result5 = await deploy('JGame', [BigInt(10 * 10 ** 15), result.address, result2.address, result3.address])
        console.log(`jgame address: ${result5.address}`)

        var tx = await result5.setStuff(result.address, result2.address, result3.address, result4.address);
        await tx.wait() 
        console.log(0)
        var tx = await result3.setTokenAddress(result4.address);
        await tx.wait()
        console.log(1)
             var tx = await result.transferOwnership(result5.address);
        await tx.wait()
        console.log(2)
             var tx = await result2.transferOwnership(result5.address);
        await tx.wait()
        console.log(3)
             var tx = await result3.transferOwnership(result5.address);
        await tx.wait()
        console.log(4)
             var tx = await result4.transferOwnership(result5.address);
        await tx.wait()
        console.log(5) 
        
        var cost = await result4.calculatePrice(BigInt(1000 * 10 ** 18));
        var tx = await result5.ifIwasinla2(BigInt(4),BigInt(4),{value: BigInt(cost)})
        await tx.wait()
          var cost2 = await result.price() * 1.01 * 1.01 * 1.01 * 1.01 * 1.01
        var tx = await result5.ifIwasinla(BigInt(5),BigInt(3),{value: BigInt(cost2)})
        await tx.wait()

        var cost = await result4.calculatePrice(BigInt(1000000 * 10 ** 18));
        var tx = await result5.ifIwasinla2(BigInt(1000000 * 10 ** 18),BigInt(3),{value: BigInt(cost)})
        await tx.wait()
        var cost = await result4.calculatePrice(BigInt(100000 * 10 ** 18));
        var tx = await result5.ifIwasinla2(BigInt(100000 * 10 ** 18),BigInt(2),{value: BigInt(cost)})
        await tx.wait()
        var rewards1 = await result2.getAmountToClaim([BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5) ], "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
        console.log(parseInt(rewards1))
        var rewards2 = await result3.getAmountToClaim("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
        console.log(rewards2)
        console.log(111)
        var rewards1 = await result2.getAmountToClaim([BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5) ], "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
        console.log(parseInt(rewards1))
        var cost = await result4.calculatePrice(BigInt(1000 * 10 ** 18));
        console.log(cost)
        var tx = await result5.ifIwasinla2(BigInt(4),BigInt(1),{value: BigInt(cost)})
        await tx.wait()
        var rewards1 = await result2.getAmountToClaim([BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5) ], "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
        console.log(parseInt(rewards1))
      
        var tx = await result2.claim([BigInt(1)])
        await tx.wait()
        console.log(tx)
        var tx = await result2.claim([BigInt(2)])
        await tx.wait()
        console.log(tx)
        var tx = await result2.claim([BigInt(3)])
        await tx.wait()
        console.log(tx)
        var tx = await result2.claim([BigInt(4)])
        await tx.wait()
        console.log(tx)
        var tx = await result2.claim([BigInt(5)])
        await tx.wait()
        console.log(tx)
        var tx = await result3.claim()
        await tx.wait()
        console.log(tx)

// token fanout setTokenAddress
// all transferOwnership
        
    } catch (e) {
        console.log(e.message)
    }
  })()