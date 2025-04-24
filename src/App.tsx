import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// --- Web3 Imports ---
import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { readContract } from '@wagmi/core';
import { injected } from 'wagmi/connectors';
import { parseEther } from 'viem';
import { formatEther } from 'viem';
import { config } from '@react-spring/web';
import {LIQUIDITY_POOL_ABI} from "./abi_contract/constant"




const LIQUIDITY_POOL_ADDRESS = '0xEC9Bf10d059Aa5307F1B721eA3036477127Df4bd';

const TOKEN_SWAP_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_factory",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_WETH",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "WETH",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenB",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountADesired",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountBDesired",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountAMin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountBMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "addLiquidity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountTokenDesired",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountTokenMin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountETHMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "addLiquidityETH",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountETH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "factory",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reserveIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reserveOut",
				"type": "uint256"
			}
		],
		"name": "getAmountIn",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reserveIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reserveOut",
				"type": "uint256"
			}
		],
		"name": "getAmountOut",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "getAmountsIn",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "getAmountsOut",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reserveA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reserveB",
				"type": "uint256"
			}
		],
		"name": "quote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenB",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountAMin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountBMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "removeLiquidity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountTokenMin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountETHMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "removeLiquidityETH",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountETH",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountTokenMin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountETHMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "approveMax",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "removeLiquidityETHWithPermit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountETH",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenB",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountAMin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountBMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "approveMax",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "removeLiquidityWithPermit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapETHForExactTokens",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOutMin",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapExactETHForTokens",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOutMin",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapExactTokensForETH",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOutMin",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapExactTokensForTokens",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountInMax",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapTokensForExactETH",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountInMax",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapTokensForExactTokens",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
] as const;
const TOKEN_SWAP_ADDRESS = '0xEC9Bf10d059Aa5307F1B721eA3036477127Df4bd';

const PREDICTION_MARKET_ABI = [] as const;
const PREDICTION_MARKET_ADDRESS = '0x...';


const TOKEN_A_ADDRESS = '0x63599aE00A7A43FaDBc2B72E1390ccbCdd0d455B';
const TOKEN_B_ADDRESS = '0x81960374004ca95499a720027f76c04871e0DFC2';

const ERC20_ABI = [
	{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" },
	{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }

] as const;

gsap.registerPlugin(ScrollTrigger);

export default function App() {
	const mainRef = useRef<HTMLDivElement | null>(null);
	const navRef = useRef<HTMLElement | null>(null);
	const heroRef = useRef<HTMLDivElement | null>(null);

	const introRef = useRef<HTMLDivElement | null>(null);
	const liquiditySectionRef = useRef<HTMLDivElement | null>(null);
	const swapSectionRef = useRef<HTMLDivElement | null>(null);
	const predictionSectionRef = useRef<HTMLDivElement | null>(null);

	// --- Web3 State and Hooks ---
	const { address, isConnected, chain } = useAccount();
	const { connect } = useConnect();
	const { disconnect } = useDisconnect();
	const { data: writeContractResult, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();
	const { writeContractAsync } = useWriteContract();

	const [isCalculating, setIsCalculating] = useState(false);
	const [poolExists, setPoolExists] = useState(true);

	const [swapToAmount, setSwapToAmount] = useState('');
	const [isCalculatingSwap, setIsCalculatingSwap] = useState(false);

	// --- Component State ---
	const [tokenAAmount, setTokenAAmount] = useState('');
	const [tokenBAmount, setTokenBAmount] = useState('');
	const [swapFromAmount, setSwapFromAmount] = useState('');
	const [swapFromToken, setSwapFromToken] = useState(TOKEN_A_ADDRESS);
	const [swapToToken, setSwapToToken] = useState(TOKEN_B_ADDRESS);

	// Get amounts out for liquidity calculation
	const { data: amountOutData, refetch: refetchAmountsOut } = useReadContract({
		abi: TOKEN_SWAP_ABI,
		address: TOKEN_SWAP_ADDRESS as `0x${string}`,
		functionName: 'getAmountsOut',
		args: [
			tokenAAmount ? parseEther(tokenAAmount) : BigInt(0),
			[TOKEN_A_ADDRESS as `0x${string}`, TOKEN_B_ADDRESS as `0x${string}`],
		],
		query: {
			enabled: false // We'll manually trigger this when needed
		}
	});

	// Effect to calculate Token B amount when Token A amount changes
	useEffect(() => {
		if (!tokenAAmount || tokenAAmount === '0' || tokenAAmount === '') {
			setTokenBAmount('');
			return;
		}

		const calculateTokenBAmount = async () => {
			try {
				setIsCalculating(true);
				await refetchAmountsOut();

				if (amountOutData && amountOutData.length > 1) {
					const amountB = formatEther(amountOutData[1]);
					setTokenBAmount(amountB);
				}
			} catch (error) {
				console.error("Error calculating Token B amount:", error);
				setTokenBAmount('');
			} finally {
				setIsCalculating(false);
			}
		};

		const debounceTimer = setTimeout(() => {
			calculateTokenBAmount();
		}, 500); // Debounce to avoid too many requests

		return () => clearTimeout(debounceTimer);
	}, [tokenAAmount, amountOutData, refetchAmountsOut]);

	// GSAP and Scroll Animations Effect
	useEffect(() => {
		// Navbar background change on scroll
		const handleScroll = () => {
			const nav = navRef.current;
			if (!nav) return;

			if (window.scrollY > 100) {
				nav.style.backgroundColor = "rgba(10, 10, 20, 0.9)";
				(nav.style as any).backdropFilter = "blur(10px)"; // Using 'as any' for simplicity, consider stricter typing
			} else {
				nav.style.backgroundColor = "transparent";
				(nav.style as any).backdropFilter = "none";
			}
		};

		window.addEventListener('scroll', handleScroll);

		const ctx = gsap.context(() => {
			// Hero section animations
			// Check if spans are actually used in the final JSX, otherwise target .hero-text directly
			gsap.from('.hero-text', { // Targetting the h1 directly as spans are commented out
				opacity: 0,
				y: 100,
				duration: 1,
				// stagger: 0.05, // Remove stagger if not using spans
				ease: 'back.out(1.7)'
			});

			gsap.from('.hero-description', {
				opacity: 0,
				y: 50,
				duration: 1.2,
				delay: 0.8,
				ease: 'elastic.out(1, 0.5)'
			});

			gsap.from('.scroll-indicator', {
				opacity: 0,
				y: 20,
				duration: 1,
				delay: 1.5,
				repeat: -1,
				yoyo: true
			});

			// Section animations - Use guards for refs
			if (liquiditySectionRef.current) {
				ScrollTrigger.create({
					trigger: liquiditySectionRef.current,
					start: "top 70%",
					// markers: true, // uncomment for debugging
					onEnter: () => {
						// Using fromTo for better control on subsequent scrolls if toggleActions are used
						gsap.fromTo('.liquidity-description', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' });
						gsap.fromTo('.liquidity-card', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 });
					},
					// Example: reset animation when scrolling back up past the trigger point
					// toggleActions: "play none none reverse",
				});
			}

			if (swapSectionRef.current) {
				ScrollTrigger.create({
					trigger: swapSectionRef.current,
					start: "top 70%",
					// markers: true,
					onEnter: () => {
						gsap.fromTo('.swap-description', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' });
						gsap.fromTo('.swap-card', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 });
					},
					// toggleActions: "play none none reverse",
				});
			}

			if (predictionSectionRef.current) {
				ScrollTrigger.create({
					trigger: predictionSectionRef.current,
					start: "top 70%",
					// markers: true,
					onEnter: () => {
						gsap.fromTo('.prediction-card', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)', stagger: 0.2 });
					},
					// toggleActions: "play none none reverse",
				});
			}

		}, mainRef); // Scope animations to the main container

		// Cleanup function
		return () => {
			window.removeEventListener('scroll', handleScroll);
			ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill triggers on unmount
			ctx.revert(); // Cleanup GSAP animations and contexts
		};
	}, []);



	// --- Smart Contract Interaction Functions ---


	const handleAddLiquidity = async () => {
		if (!isConnected || !address) {
			alert("Please connect your wallet first.");
			return;
		}
		if (!tokenAAmount || !tokenBAmount || isNaN(parseFloat(tokenAAmount)) || isNaN(parseFloat(tokenBAmount)) || parseFloat(tokenAAmount) <= 0 || parseFloat(tokenBAmount) <= 0) {
			alert("Please enter valid, positive amounts for both tokens.");
			return;
		}
		if (!LIQUIDITY_POOL_ADDRESS || !TOKEN_A_ADDRESS || !TOKEN_B_ADDRESS) {
			alert("Contract details or token addresses are missing.");
			return;
		}

		console.log(`Attempting to add liquidity: ${tokenAAmount} Token A (${TOKEN_A_ADDRESS}), ${tokenBAmount} Token B (${TOKEN_B_ADDRESS})`);


		alert("Placeholder: In a real app, ensure token approvals are confirmed before proceeding."); // Remove this in production


		// Assuming approvals are done (needs proper implementation)
		try {
			// --- TODO: Adjust functionName and args based on your actual contract ---

			const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
			const amountADesired = parseEther(tokenAAmount); // Assumes 18 decimals
			const amountBDesired = parseEther(tokenBAmount); // Assumes 18 decimals
			// WARNING: Slippage calculation below is basic (1%). Needs proper price ratio check.
			const amountAMin = parseEther((parseFloat(tokenAAmount) * 0.99).toString());
			const amountBMin = parseEther((parseFloat(tokenBAmount) * 0.99).toString());

			const tx = await writeContractAsync({
				abi: LIQUIDITY_POOL_ABI,
				address: LIQUIDITY_POOL_ADDRESS as `0x${string}`,
				functionName: 'addLiquidity', // Replace with your contract's exact function name
				args: [
					TOKEN_A_ADDRESS as `0x${string}`, // Example arg: tokenA
					TOKEN_B_ADDRESS as `0x${string}`, // Example arg: tokenB
					amountADesired,
					amountBDesired,
					amountAMin,
					amountBMin,
					address, // Recipient of LP tokens
					BigInt(deadline)
				],

				// chainId: chain?.id // Optional: specify chain if needed
			});

			console.log("Transaction", tx);
			console.log("Add liquidity transaction sent...");
			// Clear inputs on successful send (optional)
			// setTokenAAmount('');
			// setTokenBAmount('');

		} catch (error) {
			console.error("Error preparing add liquidity transaction:", error);
			alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
		}
	};

	const handleSwap = async () => {
		if (!isConnected || !address) {
			alert("Please connect your wallet first.");
			return;
		}
		if (!swapFromAmount || isNaN(parseFloat(swapFromAmount)) || parseFloat(swapFromAmount) <= 0 || !swapFromToken || !swapToToken) {
			alert("Please enter a valid positive amount and ensure both tokens are selected.");
			return;
		}

		if (swapFromToken === swapToToken) {
			alert("Cannot swap a token for itself.");
			return;
		}

		console.log(`Attempting to swap ${swapFromAmount} ${swapFromToken} for ${swapToToken}`);


		// }
		alert("Placeholder: In a real app, ensure token approval is confirmed before proceeding."); // Remove this in production


		try {

			const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
			const amountIn = parseEther(swapFromAmount); // Assumes 18 decimals

			const amountOutMin = parseEther("0"); // TODO: Replace with slippage calculation

			writeContract({
				abi: TOKEN_SWAP_ABI,
				address: TOKEN_SWAP_ADDRESS as `0x${string}`,
				functionName: 'swapExactTokensForTokens', // Replace with your contract's function name
				args: [
					amountIn,
					amountOutMin,
					[swapFromToken as `0x${string}`, swapToToken as `0x${string}`], // path (can be longer if multi-hop)
					address, // recipient
					BigInt(deadline),
				],
				// --- TODO: Add `value` if swapping FROM native currency (e.g., ETH) ---

			});
			console.log("Swap transaction sent...");
			// Clear input on successful send (optional)
			// setSwapFromAmount('');

		} catch (error) {
			console.error("Error preparing swap transaction:", error);
			alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
		}
	};


	//   const handleAmountOutCalculation = async () => {
	// 	// if (!isConnected || !address) {
	// 	//   alert("Please connect your wallet first.");
	// 	//   return;
	// 	// }

	// 	// if (
	// 	//   !swapFromAmount ||
	// 	//   isNaN(parseFloat(swapFromAmount)) ||
	// 	//   parseFloat(swapFromAmount) <= 0 ||
	// 	//   !swapFromToken ||
	// 	//   !swapToToken
	// 	// ) {
	// 	//   alert("Please enter a valid positive amount and ensure both tokens are selected.");
	// 	//   return;
	// 	// }

	// 	// setIsCalculating(true);

	// 	try {
	// 	  const amountIn = parseEther("1000"); // Assumes 18 decimals

	// 	  const amountsOut = useReadContract(
	// 		{
	// 		  abi: TOKEN_SWAP_ABI,
	// 		  address: TOKEN_SWAP_ADDRESS as `0x${string}`,
	// 		  functionName: 'getAmountsOut',
	// 		  args: [
	// 			amountIn,
	// 			[swapFromToken as `0x${string}`, swapToToken as `0x${string}`],
	// 		  ],
	// 		}
	// 	  );

	// 	  console.log("Calculated amountsOut:", amountsOut);
	// 	//   setSwapToAmount(formatUnits((amountsOut as bigint[])[1], 18)); // Assumes 18 decimals on output

	// 	} catch (error) {
	// 	  console.error("Error calculating amount out:", error);
	// 	//   alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
	// 	} finally {
	// 	//   setIsCalculating(false);
	// 	}
	//   };
	//   handleAmountOutCalculation();


	// Helper function for smooth scrolling (using scrollIntoView)
	const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
		ref.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start' // Aligns the top of the element to the top of the viewport
		});
	};

	// Display transaction status/errors (optional but recommended)



	return (
		<div ref={mainRef} className="app-container">
			{/* Navbar */}
			<nav ref={navRef} className="navbar">
				<div className="nav-content">
					<div className="nav-logo">WEB3</div>
					<div className="nav-links">
						<button onClick={() => scrollToSection(heroRef)}>Home</button>
						<button onClick={() => scrollToSection(liquiditySectionRef)}>Liquidity</button>
						<button onClick={() => scrollToSection(swapSectionRef)}>Swap Tokens</button>
						<button onClick={() => scrollToSection(predictionSectionRef)}>Prediction</button>
					</div>
					{/* --- Wallet Connection Button --- */}
					<div className="wallet-connector">
						{isConnected ? (
							<div>
								<span style={{ marginRight: '10px', fontSize: '0.8em', color: '#eee', verticalAlign: 'middle' }}>
									{/* Display ENS name or formatted address */}
									{`${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`}
									{chain && <span style={{ marginLeft: '5px', fontStyle: 'italic', color: '#aaa' }}> ({chain.name})</span>}
								</span>
								<button onClick={() => disconnect()} className="action-btn small">Disconnect</button>
							</div>
						) : (
							<button
								onClick={() => connect({ connector: injected() })} // Assumes injected connector is configured
								className="action-btn pulse"
							>
								Connect Wallet
							</button>
						)}
					</div>
				</div>
			</nav>


			{/* Hero Section */}
			<div ref={heroRef} className="hero-section">
				<div className="content-container">
					<header className="hero">
						<h1 className="hero-text">
							WEB3 REVOLUTION
							{/* Keep spans commented if not using character animation */}
							{/* {Array.from("WEB3 REVOLUTION").map((char, i) => (
                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
              ))} */}
						</h1>
						<p className="hero-description">
							The next evolution of the internet is here. Experience decentralized finance with our cutting-edge platform.
						</p>
						<div className="scroll-indicator">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M12 5v14M19 12l-7 7-7-7" />
							</svg>
						</div>
					</header>
				</div>
			</div>

			{/* Liquidity Section */}
			<div ref={liquiditySectionRef} className="section-container">
				<div className="content-container">
					<div className="section-content">
						<div className="liquidity-description">
							<h2>Liquidity Pools</h2>
							<p>
								Provide liquidity to decentralized exchanges and earn passive income through trading fees and yield farming rewards.
								Our platform offers competitive APYs and minimal impermanent loss protection.
							</p>
							<div className="stats-grid">
								{/* TODO: Fetch these stats dynamically */}
								<div className="stat-item">
									<div className="stat-value">$42.8B</div>
									<div className="stat-label">Total Value Locked</div>
								</div>
								<div className="stat-item">
									<div className="stat-value">1.2M</div>
									<div className="stat-label">Active Providers</div>
								</div>
								<div className="stat-item">
									<div className="stat-value">12-48%</div>
									<div className="stat-label">Average APY</div>
								</div>
							</div>
						</div>
						<div className="liquidity-card section-card">
							<div className="card-content">
								<h2>Add Liquidity</h2>
								<p>Provide liquidity to earn passive income. Requires two tokens.</p>
								<div className="card-actions">
									{/* TODO: Add token selection dropdowns & display token symbols */}
									<input
										type="number"
										placeholder={`Token A Amt (${TOKEN_A_ADDRESS.substring(0, 6)}...)`} // Example display
										value={tokenAAmount}
										onChange={(e) => setTokenAAmount(e.target.value)}
										disabled={!isConnected || isWritePending}
										className={!isConnected ? 'disabled-input' : ''}
										min="0" // Basic validation
										step="any"
									/>
									<input
										type="number"
										placeholder={
											isCalculating
												? "Calculating..."
												: `Token B Amt (${TOKEN_B_ADDRESS.substring(0, 6)}...)`
										}
										value={isCalculating ? "Calculating..." : tokenBAmount}
										disabled={true} // Always disabled as it's calculated automatically
										className="disabled-input"
										min="0"
										step="any"
									/>

									<button
										className={`action-btn pulse ${isWritePending || isCalculating || !tokenAAmount || !tokenBAmount
												? 'disabled'
												: ''
											}`}
										onClick={handleAddLiquidity}
										disabled={
											isWritePending ||
											isCalculating ||
											!tokenAAmount ||
											!tokenBAmount
										}
									>
										{isCalculating ? (
											<span className="loader"></span> // Add this loader element
										) : isWritePending ? (
											'Processing...'
										) : isConnected ? (
											'Add Liquidity'
										) : (
											'Connect Wallet'
										)}
									</button>

								</div>
								<div className="card-stats">
									{/* Stats specific to the card action */}
									<div className="stat">
										<span className="value">$?</span>
										<span className="label">Pool Share</span>
									</div>
									<div className="stat">
										<span className="value">??%</span>
										<span className="label">Expected APY</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Swap Section */}
			<div ref={swapSectionRef} className="section-container">
				<div className="content-container">
					<div className="section-content reverse">
						<div className="swap-description">
							<h2>Token Swaps</h2>
							<p>
								Trade tokens instantly with optimal pricing and minimal slippage.
								Our advanced routing algorithm scans multiple DEXs to find you the best rates across the entire DeFi ecosystem.
							</p>
							<div className="stats-grid">
								{/* TODO: Fetch these stats dynamically */}
								<div className="stat-item">
									<div className="stat-value">$1.2B</div>
									<div className="stat-label">24h Volume</div>
								</div>
								<div className="stat-item">
									<div className="stat-value">0.05%</div>
									<div className="stat-label">Average Fee</div>
								</div>
								<div className="stat-item">
									<div className="stat-value">~12s</div>
									<div className="stat-label">Avg. Swap Time</div>
								</div>
							</div>
						</div>
						<div className="swap-card section-card">
							<div className="card-content">
								<h2>Swap Tokens</h2>
								<p>Trade tokens instantly. Select tokens and enter amount.</p>
								<div className="card-actions vertical"> {/* Changed to vertical layout */}
									{/* TODO: Replace inputs/placeholders with actual Token Select components */}
									<div className="token-input-row">
										<input
											type="number"
											placeholder="From Amount"
											value={swapFromAmount}
											onChange={(e) => setSwapFromAmount(e.target.value)}
											disabled={!isConnected || isWritePending}
											className={!isConnected ? 'disabled-input' : ''}
											min="0"
											step="any"
										/>
										{/* Placeholder for Token A Selector */}
										<button disabled className="token-select-placeholder">{`From: ${swapFromToken.substring(0, 6)}...`}</button>
									</div>
									<div className="swap-arrow large">↓</div>
									<div className="token-input-row">
										<input
											type="number"
											placeholder="To Amount (Estimated)" // Output amount would be calculated
											value={""} // TODO: Display calculated output amount here
											disabled // Output amount is usually read-only
											className='disabled-input'
										/>
										{/* Placeholder for Token B Selector */}
										<button disabled className="token-select-placeholder">{`To: ${swapToToken.substring(0, 6)}...`}</button>
									</div>
									<button
										className={`action-btn pulse ${(!isConnected || isWritePending) ? 'disabled' : ''}`}
										onClick={handleSwap}
										disabled={!isConnected || isWritePending || !swapFromAmount}
										style={{ marginTop: '15px' }} // Spacing for vertical layout
									>
										{isWritePending ? 'Processing...' : isConnected ? 'Swap Now' : 'Connect Wallet'}
									</button>
								</div>
								<div className="card-stats">
									<div className="stat">
										<span className="value">~0.3%</span> {/* Example */}
										<span className="label">Price Impact</span>
									</div>
									<div className="stat">
										<span className="value">0.001 ETH</span> {/* Example */}
										<span className="label">Network Fee</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Prediction Section */}
			<div ref={predictionSectionRef} className="section-container full-width">
				<div className="content-container">
					<h2 className="section-title">Prediction Markets</h2>
					<p className="section-subtitle">Trade on future price movements. Choose a market and predict the direction.</p>

					<div className="prediction-cards-container">
						{/* --- TODO: Fetch markets dynamically and map over them --- */}
						{/* Example Card 1 - ETH Prediction */}
						<div className="prediction-card">
							<div className="card-content">
								<div className="market-header">
									<h3>ETH/USDT</h3>
									<div className="market-tag live">LIVE</div>
									{/* TODO: Add expiry time */}
								</div>
								<div className="price-display">
									{/* TODO: Fetch real-time price */}
									<span className="current-price">$3,427.52</span>
									<span className="price-change positive">+2.4%</span>
								</div>
								{/* TODO: Add stake amount input if variable */}
								<div className="prediction-stake">Stake: 0.01 ETH (Example)</div>
								<div className="prediction-actions">
									<button
										className={`up-btn pulse ${(!isConnected || isWritePending) ? 'disabled' : ''}`}
										onClick={() => handlePrediction('ETH/USDT', 'up')} // TODO: Use actual market ID/index
										disabled={!isConnected || isWritePending}
									>
										{isWritePending ? '...' : 'Up ↑'}
									</button>
									<button
										className={`down-btn pulse ${(!isConnected || isWritePending) ? 'disabled' : ''}`}
										onClick={() => handlePrediction('ETH/USDT', 'down')} // TODO: Use actual market ID/index
										disabled={!isConnected || isWritePending}
									>
										{isWritePending ? '...' : 'Down ↓'}
									</button>
								</div>
								<div className="card-stats small">
									<div className="stat">
										<span className="value">1.85x</span> {/* Example Payout */}
										<span className="label">Payout UP</span>
									</div>
									<div className="stat">
										<span className="value">2.10x</span> {/* Example Payout */}
										<span className="label">Payout DOWN</span>
									</div>
								</div>
							</div>
						</div>

						{/* Example Card 2 - BTC Prediction */}
						<div className="prediction-card">
							<div className="card-content">
								<div className="market-header">
									<h3>BTC/USDT</h3>
									<div className="market-tag live">LIVE</div>
								</div>
								<div className="price-display">
									<span className="current-price">$63,851.20</span>
									<span className="price-change positive">+1.8%</span>
								</div>
								<div className="prediction-stake">Stake: 0.01 ETH (Example)</div>
								<div className="prediction-actions">
									<button className={`up-btn pulse ${(!isConnected || isWritePending) ? 'disabled' : ''}`} onClick={() => handlePrediction('BTC/USDT', 'up')} disabled={!isConnected || isWritePending}> {isWritePending ? '...' : 'Up ↑'} </button>
									<button className={`down-btn pulse ${(!isConnected || isWritePending) ? 'disabled' : ''}`} onClick={() => handlePrediction('BTC/USDT', 'down')} disabled={!isConnected || isWritePending}> {isWritePending ? '...' : 'Down ↓'} </button>
								</div>
								<div className="card-stats small">
									<div className="stat">
										<span className="value">1.92x</span>
										<span className="label">Payout UP</span>
									</div>
									<div className="stat">
										<span className="value">2.05x</span>
										<span className="label">Payout DOWN</span>
									</div>
								</div>
							</div>
						</div>

						{/* Example Card 3 - SOL Prediction */}
						<div className="prediction-card">
							<div className="card-content">
								<div className="market-header">
									<h3>SOL/USDT</h3>
									<div className="market-tag live">LIVE</div>
								</div>
								<div className="price-display">
									<span className="current-price">$142.75</span>
									<span className="price-change negative">-3.2%</span>
								</div>
								<div className="prediction-stake">Stake: 0.01 ETH (Example)</div>
								<div className="prediction-actions">
									<button className={`up-btn pulse ${(!isConnected || isWritePending) ? 'disabled' : ''}`} onClick={() => handlePrediction('SOL/USDT', 'up')} disabled={!isConnected || isWritePending}> {isWritePending ? '...' : 'Up ↑'} </button>
									<button className={`down-btn pulse ${(!isConnected || isWritePending) ? 'disabled' : ''}`} onClick={() => handlePrediction('SOL/USDT', 'down')} disabled={!isConnected || isWritePending}> {isWritePending ? '...' : 'Down ↓'} </button>
								</div>
								<div className="card-stats small">
									<div className="stat">
										<span className="value">2.20x</span>
										<span className="label">Payout UP</span>
									</div>
									<div className="stat">
										<span className="value">1.80x</span>
										<span className="label">Payout DOWN</span>
									</div>
								</div>
							</div>
						</div>
					</div> {/* End prediction-cards-container */}
				</div> {/* End content-container */}
			</div> {/* End predictionSectionRef */}

			{/* TODO: Add Footer Section */}

		</div> // End mainRef app-container
	);
}