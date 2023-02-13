// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Deploy a utility EVM contract with a function to retrieve all token balances given a wallet address and the token contract addresses.

contract RetrieveTokenBalances {
    struct Balance {
        address token;
        uint256 balance;
    }

    function getBalances(address _address, address[] calldata _tokens)
        public
        view
        returns (Balance[] memory)
    {
        Balance[] memory balances = new Balance[](_tokens.length);

        for (uint256 i = 0; i < _tokens.length; i++) {
            address token = _tokens[i];
            ERC20 erc20 = ERC20(token);
            balances[i] = Balance(token, erc20.balanceOf(_address));
        }

        return balances;
    }
}
