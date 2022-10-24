import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalance } from "../util";
import useENSName from "../hooks/useENSName";
import { shortenHex } from "../util";

type TokenBalanceProps = {
  tokenAddress: string;
  symbol: string;
};

const TokenBalance = ({ tokenAddress, symbol }: TokenBalanceProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useTokenBalance(account, tokenAddress);
  
  const ENSName = useENSName(account);

  return (
    <h4 className="text-dark">
      {`${ENSName || `${shortenHex(account, 4)}`}'s ${symbol} Balance`}: {parseBalance(data ?? 0)}
    </h4>
  );
};

export default TokenBalance;
