// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IERC20Votes {
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract TokenizedBallot {
    uint256 public referenceBlock;
    IERC20Votes public tokenContract;
    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE");
    struct Proposal {
        bytes32 Name;
        uint256 VoteCount;
    }
    Proposal[] public proposals; // Arrray of struct
    mapping(address => uint256) public votePowerSpent;

    constructor(
        bytes32[] memory proposalnames,
        address _tokenContract,
        uint256 _referenceBlock // Can be a reference of this week , this year etc.
    ) {
        // To insert our proposals to the SC

        for (uint256 i = 0; i < proposalnames.length; i++) {
            proposals.push(Proposal({VoteCount: 0, Name: proposalnames[i]}));
        }
        referenceBlock = _referenceBlock;
        tokenContract = IERC20Votes(_tokenContract);
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].VoteCount > winningVoteCount) {
                winningVoteCount = proposals[p].VoteCount;
                winningProposal_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].Name;
    }

    function vote(uint256 proposal, uint256 amount) public {
        uint256 _votingPower = votingPower(msg.sender);
        require(
            _votingPower >= amount,
            "TokenizedBallot: Trying to vote more than the voting power available"
        );
        votePowerSpent[msg.sender] += amount;
        proposals[proposal].VoteCount += amount;
    }

    function votingPower(address account)
        public
        view
        returns (uint256 votingPower_)
    {
        votingPower_ =
            tokenContract.getPastVotes(account, referenceBlock) -
            votePowerSpent[msg.sender];
    }
}
