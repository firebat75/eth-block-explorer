import { PUBLIC_API_KEY } from "$env/static/public";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: PUBLIC_API_KEY,
    network: Network.ETH_MAINNET,
};
export const alchemy = new Alchemy(settings);