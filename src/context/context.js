import {ethers} from 'ethers'

const handleAdd () => {


const contract= "";

function handleAdd() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // Call the add function on the contract
    const tx = await contract.add(value1, value2);
    await tx.wait();
  }

}