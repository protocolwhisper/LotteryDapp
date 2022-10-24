import ERC20_ABI from "../contracts/LotteryToken.json";

import useContract from "./useContract";

export default function useTokenContract(tokenAddress?: string) {
  return useContract(tokenAddress, ERC20_ABI);
}
