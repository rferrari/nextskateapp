import useHiveBalance from '@/hooks/useHiveBalance';
import { HiveAccount } from '@/lib/useHiveAuth';
import {
    Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex,
    HStack, Image, Text, useDisclosure, VStack
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { FaArrowDown, FaHive } from 'react-icons/fa';
import { FaPencil } from "react-icons/fa6"
import UserAvatar from '../UserAvatar';
import useGnarsBalance from '@/hooks/useGnarsBalance';
import EditInfoModal from "./EditInfoModal"
import '../../styles/profile-card-styles.css';

interface ProfileCardProps {
    user: HiveAccount,
    userXp: Number
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const userMetadata = useMemo(() => JSON.parse(user.json_metadata || '{}'), [user.json_metadata]);
    const userPostingMetadata = useMemo(() => JSON.parse(user.posting_json_metadata || '{}'), [user.posting_json_metadata]);

//    const userLevel = userMetadata.extensions?.level || 0;
    const gnarsBalance = useGnarsBalance(userMetadata.extensions?.eth_address || '');
    const { hivePower } = useHiveBalance(user);

    const [userXp, setUserXp] = useState(userMetadata.extensions?.staticXp || 0);
    const [userVideoParts, setUserVideoParts] = useState(userMetadata.extensions?.video_parts?.length || 0);

    // const userLevel = userMetadata.extensions?.level || 0;
    const userLevel = 0;    //debug lvl

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const nextImage = (url: string) => {
        if (url.startsWith('https')) {
            return url;
        }
        return `/public/${url}`;
    };

    const handleProfileUpdate = () => {
        console.log("Logic to handle the profile update");
    };

    return (<>
        {isOpen &&
            <EditInfoModal onUpdate={handleProfileUpdate} isOpen={isOpen}
                onClose={onClose} user={user} />}

        <Flex justify="center" direction="column" width="full" height="full">
            {/* Profile Card Container */}
            <Box id="containerCardProfile"
                border="2px solid white"
                borderRadius="20px"
                position="relative" className={`level-${userLevel}`}
                transition="0.6s"
                transform={isFlipped ? 'rotateY(180deg) translateZ(1px)' : 'none'}
                onClick={handleClick}
                zIndex={0}
                style={{
                    perspective: '1000px',
                    width: '310px',
                    height: '550px',
                }}
            >
                {/* Profile Card Front Side */}
                <Card id="front-side-card"        className={`card-profile`}
                      border="2px solid white"    size="sm"
                      color="white"               bg={'transparent'}
                      p={2}                       borderRadius="20px"
                      position={'absolute'}
                      opacity={isFlipped ? '0' : '1'}
                      zIndex={isFlipped ? '0' : '1'}
                >
                    <CardHeader borderTopRadius="10px" 
                        textAlign="center" 
                        bg="transparent" 
                        p={2}
                        style={{backfaceVisibility: 'hidden',}}
                        >
                        <HStack justifyContent="space-between">
                            <HStack justifyContent="flex-start">
                                <Text fontWeight="bold" fontSize="18px"
                                    textShadow="2px 2px 1px rgba(0,0,0,1)">
                                    {user.name}
                                </Text>
                            </HStack>
                            <Text fontWeight="bold" fontSize="18px">
                                XP {userXp}
                            </Text>
                            <Text fontWeight="bold" fontSize="18px">
                                Lvl {userLevel}
                            </Text>
                        </HStack>
                    </CardHeader>

                    <CardBody bg="transparent"
                              style={{backfaceVisibility: 'hidden',}}
                    >
                        <VStack>
                            <Center>
                                <Box borderRadius={14} border="3px solid black">
                                    <UserAvatar hiveAccount={user} borderRadius={10} boxSize={150} />
                                </Box>
                            </Center>
                        </VStack>

                        <VStack w="100%" marginTop={5}>
                            <Box border="1px solid white"
                                 w={230} borderRadius="10px" p={2}
                                 bg="rgba(0, 0, 0, 0.8)">
                                <HStack justify="space-between">
                                    <HStack>
                                        <Image src="/logos/hp_logo.png" alt="Logo" boxSize="20px" />
                                        <Text>Power:</Text>
                                    </HStack>
                                    <Text>{hivePower.toFixed(0)} HP</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <HStack>
                                        <Image src="/logos/gnars_logo.png" alt="Logo" boxSize="18px" />
                                        <Text cursor="pointer">Gnars:</Text>
                                    </HStack>
                                    <Text cursor="pointer">{String(gnarsBalance.gnarsBalance) || 0}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <HStack>
                                        <Image src="/skatehive_square_green.png" alt="Logo" boxSize="20px" />
                                        <Text cursor="pointer">Exp:</Text>
                                    </HStack>
                                    <Text cursor="pointer">{userXp} XP</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text cursor="pointer">📹 VideoParts:</Text>
                                    <Text cursor="pointer">{userVideoParts || 0}</Text>
                                </HStack>
                            </Box>
                        </VStack>
                    </CardBody>

                    <CardFooter fontSize="16px" fontWeight="bold" 
                                color="white" mb={-2} 
                                style={{backfaceVisibility: 'hidden',}}
                                >
                        <VStack w="100%">
                            <Flex justify="center">
                                <div style={{ zIndex: 10 }}>
                                    <Button
                                        _hover={{ background: "black" }}
                                        color="white"
                                        border="1px solid white"
                                        width="100%"
                                        leftIcon={<FaPencil size={"22px"} />}
                                        m={2}
                                        variant="outline"
                                        w="auto"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            position: 'relative',
                                            zIndex: 15      // button high above others divs
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onOpen();
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        _hover={{ background: "black" }}
                                        leftIcon={<FaHive size={"22px"} />}
                                        color="yellow"
                                        border={"1px solid white"}
                                        width={"100%"}
                                        m={2}
                                        variant={"outline"}
                                        w={"auto"}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            position: 'relative',
                                            zIndex: 15      // button high above others divs
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleProfileUpdate();
                                        }}
                                    >
                                        Claim XP
                                    </Button>
                                </div>
                            </Flex>
                        </VStack>
                    </CardFooter>
                </Card>

                {/* Back side of the card */}
                <Card id="back-side-card"    className={`card-profile`}
                    border="2px solid white" borderRadius="20px"
                    bg={'transparent'}
                    transition="0.6s"
                    opacity={isFlipped ? '1' : '0'}
                    zIndex={isFlipped ? '2' : '0'}
                >
                    <CardHeader transform={'rotateY(180deg)'}
                        color="white"
                        style={{
                            backgroundImage: `url(${nextImage(userPostingMetadata?.profile?.cover_image || `https://images.ecency.com/webp/u/${user.name}/cover/small`)})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderBottom: '1px solid white',
                            borderRadius: '10px',
                            textAlign: 'center',
                            backgroundColor: 'gray.900',
                            padding: 2,
                        }}
                    >
                        <HStack justify="center">
                            <UserAvatar hiveAccount={user} borderRadius={100} boxSize={20} />
                            <Text size="md" color="white"></Text>
                        </HStack>
                    </CardHeader>

                    <CardBody transform={'rotateY(180deg)'}
                        textAlign="center"
                        width="100%"
                        height="100%"
                        borderRadius="20px"
                        padding={0}
                        marginTop={5}
                        >
                        <HStack justify="center">
                            <Box border="1px solid white" w={230} borderRadius="10px" p={2}
                                color={'white'}
                                bg="rgba(0, 0, 0, 0.8)"
                            >
                                {userPostingMetadata.profile?.about || "I'm too lazy to write a bio."}
                            </Box>
                        </HStack>

                        <HStack justify="center">
                            <Box border="1px solid white" w={230} borderRadius="10px" p={2} marginTop={5}
                                color={'white'}
                                bg="rgba(0, 0, 0, 0.8)"
                            >
                                <Text fontWeight="bold" fontSize="18px">
                                    XP {userXp}
                                </Text>
                            </Box>
                        </HStack>
                    </CardBody>

                    <CardFooter transform={'rotateY(180deg)'}>
                    </CardFooter>
                </Card>

            </Box>
        </Flex >
    </>);
}

export default ProfileCard;
