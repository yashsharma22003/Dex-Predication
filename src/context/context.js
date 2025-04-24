// src/components/DeFiActions.jsx
import { ethers } from 'ethers';
import { useAccount, useProvider, useSigner } from 'wagmi';

const ROUTER_ADDRESS = "0xEC9Bf10d059Aa5307F1B721eA3036477127Df4bd";
const PAIR_ADDRESS = "0xb3996774f1f6c05ba5b2e1ed3be9f74b227dbc84";
const PAIR_ABI = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"
];

// Reusable contract creator
const createContract = (address, abi, signerOrProvider) => {
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const useContractActions = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  const getRouterContract = () => createContract(ROUTER_ADDRESS, ROUTER_ABI, signer || provider);
  const getPairContract = () => createContract(PAIR_ADDRESS, PAIR_ABI, provider);

  const getReserves = async () => {
    try {
      const pairContract = getPairContract();
      return await pairContract.getReserves();
    } catch (error) {
      console.error("Error fetching reserves:", error);
      return null;
    }
  };

  const executeSwap = async (token0Address, token1Address, amountIn) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      const router = getRouterContract();
      const reserves = await getReserves();
      if (!reserves) throw new Error('Could not get reserves');

      const amountOutMin = calculateMinimumOutput(amountIn, reserves);

      const tx = await router.swapExactTokensForTokens(
        ethers.utils.parseUnits(amountIn.toString(), 18),
        amountOutMin,
        [token0Address, token1Address],
        address,
        Math.floor(Date.now() / 1000) + 60 * 20
      );

      return tx.wait();
    } catch (error) {
      console.error("Swap failed:", error);
      throw error;
    }
  };

  const addLiquidity = async (tokenA, tokenB, amountADesired, amountBDesired, slippage = 0.5) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      const router = getRouterContract();
      const amountAMin = amountADesired.mul(1000 - slippage * 10).div(1000);
      const amountBMin = amountBDesired.mul(1000 - slippage * 10).div(1000);

      const tx = await router.addLiquidity(
        tokenA,
        tokenB,
        ethers.utils.parseUnits(amountADesired.toString(), 18),
        ethers.utils.parseUnits(amountBDesired.toString(), 18),
        amountAMin,
        amountBMin,
        address,
        Math.floor(Date.now() / 1000) + 60 * 20
      );

      return tx.wait();
    } catch (error) {
      console.error("Add liquidity failed:", error);
      throw error;
    }
  };

  return { executeSwap, addLiquidity, getReserves };
};

// Helper function
const calculateMinimumOutput = (amountIn, reserves) => {
  const { reserve0, reserve1 } = reserves;
  const amountInWithFee = amountIn * 997;
  const numerator = amountInWithFee * reserve1;
  const denominator = reserve0 * 1000 + amountInWithFee;
  return (numerator / denominator) * 0.95;
};