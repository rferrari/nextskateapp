import React from 'react';
import { Badge, Box, Button, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { mainnet } from "viem/chains";
import { useEnsName } from "wagmi";
import { checkProposalOutcome } from "../utils/checkProposalOutcome";
import { Proposal } from "../utils/fetchProposals";
import ProposerAvatar from "./proposerAvatar";
import voteOnProposal from '../utils/voteOnProposal';
import VoteConfirmationModal from './voteWithReasonModal';


// interface VoteConfirmationModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirm: (reason: string) => void;
//     choice: string;
//     setReason: (reason: string) => void;
//     reason: string;
// }


const formatEthAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// Utility function to check if the proposal is active
const isProposalActive = (proposal: Proposal) => {
    const currentTime = Date.now();
    const startTime = proposal.start * 1000;
    const endTime = proposal.end * 1000;
    return startTime < currentTime && endTime > currentTime;
};

const ProposalListItem = ({
    proposal,
    isSelected,
    onSelect,

    ethAccount
}: {
    proposal: Proposal;
    isSelected: boolean;
    onSelect: () => void;
    ethAccount: any;
}) => {
    const { data: ensName } = useEnsName({
        address: proposal.author as `0x${string}`,
        chainId: mainnet.id,
    });

    const outcome = checkProposalOutcome(proposal);
    const isActive = isProposalActive(proposal);
    const [selected, setSelectedChoice] = React.useState(0);
    // Calculate percentages for "For" and "Against" votes
    const totalVotes = proposal.scores[0] + proposal.scores[1];
    const forPercentage = (proposal.scores[0] / totalVotes) * 100;
    const againstPercentage = (proposal.scores[1] / totalVotes) * 100;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const onClickVote = (choice: number) => {
        setSelectedChoice(choice);
        setIsModalOpen(true);
    }
    return (
        <Box
            cursor="pointer"
            onClick={onSelect}
            key={proposal.id}
            bg="#201d21"
            p={2}
            borderRadius="10px"
            border="0.6px solid gray"
        >
            {isModalOpen && (
                <VoteConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} choice={String(selected)} proposalId={proposal.id} ethAccount={ethAccount} />
            )}
            <HStack justifyContent={"space-between"}>

                <Box maxW={"80%"} justifyContent={"flex-start"}>
                    <Text color="white" fontSize={18} isTruncated ml={2}>{proposal.title}</Text>
                </Box>

                <Badge
                    colorScheme='green'
                    bg="black"
                    fontSize="18px"
                    color={isActive ? "yellow" : outcome.hasWon ? "#A5D6A7" : "red"}
                >
                    {isActive ? "Active" : outcome.hasWon ? "Passed" : "Failed"}
                </Badge>
            </HStack>

            {isSelected && (
                <>
                    <HStack p={4} color={"green.200"} justifyContent={"space-between"}>
                        <VStack justifyContent="flex-start" w={'20%'} mr={2}>
                            <ProposerAvatar authorAddress={proposal.author} boxSize={42} />
                            <Center>
                                <Text color="blue.200" ml={2} fontSize={12}>
                                    {ensName || formatEthAddress(proposal.author)}
                                </Text>
                            </Center>
                        </VStack>
                        <Text fontSize={"18px"} ml={4} border={"1px solid limegreen"} p={4} >
                            {decodeURIComponent(proposal.summary ?? "")}
                        </Text>
                    </HStack>

                    <Box p={4} borderTop={"none"}>
                        {/* Progress bar representing both "For" and "Against" votes */}
                        <Box height="20px" width="100%" bg="gray.700" borderRadius="md" overflow="hidden">
                            <Box height="100%" width={`${forPercentage}%`} bg="green.400" float="left"></Box>
                            <Box height="100%" width={`${againstPercentage}%`} bg="red.400" float="right"></Box>
                        </Box>
                        <HStack justifyContent="space-between" mt={2}>
                            <Text fontSize="16px" color="#A5D6A7">{proposal.scores[0]} For</Text>
                            <Text fontSize="16px" color="red.200">{proposal.scores[1]} Against</Text>
                        </HStack>

                        {proposal.state !== "active" && (
                            <Center>
                                <Text fontSize="14px" color="#A5D6A7" mt={5}>
                                    Quorum: {checkProposalOutcome(proposal).quorumReached ? "Reached" : "Not Reached"} (
                                    {checkProposalOutcome(proposal).totalVotes} Votes)
                                </Text>
                            </Center>
                        )}

                        {proposal.state === "active" && (
                            <HStack mt={4} spacing={4} justifyContent="space-between">
                                {proposal.choices.map((choice, choiceIndex) => (
                                    <Button
                                        colorScheme={choice.toUpperCase() === "FOR" ? "green" : "red"}
                                        variant="outline"
                                        key={choiceIndex}
                                        onClick={() =>
                                            onClickVote(choiceIndex)
                                        }
                                    >
                                        {choice.toUpperCase()}
                                    </Button>
                                ))}
                            </HStack>
                        )}
                    </Box>
                    {/* 
                    <HStack justifyContent="space-between" m={2}>
                        <Text color={"white"}>
                            Start:{" "}
                            <Badge bg={"black"} color={"#A5D6A7"}>
                                {new Date(proposal.start * 1000).toLocaleDateString()}
                            </Badge>
                        </Text>
                        <Text color={"white"}>
                            End:{" "}
                            <Badge bg={"black"} color={"#A5D6A7"}>
                                {new Date(proposal.end * 1000).toLocaleDateString()}
                            </Badge>
                        </Text>
                    </HStack> */}
                </>
            )}
        </Box>
    );
};

export default ProposalListItem;
