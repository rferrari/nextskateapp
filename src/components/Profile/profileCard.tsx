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

    const gnarsBalance = useGnarsBalance(userMetadata.extensions?.eth_address || '');
    const { hivePower } = useHiveBalance(user);

    const [userXp, setUserXp] = useState(userMetadata.extensions?.staticXp || 0);
    const [userVideoParts, setUserVideoParts] = useState(userMetadata.extensions?.video_parts?.length || 0);

    // const userLevel = userMetadata.extensions?.level || 0;
    const userLevel = 3;    //debug lvl

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
                border="2px solid white"            // thick border to add with cards borders
                borderRadius="20px"                 // adding 3d effect
                position="relative" className={`level-${userLevel}`}
                transition="0.6s"
                transform={isFlipped ? 'rotateY(180deg) translateZ(1px)' : 'none'}
                onClick={handleClick}
                zIndex={0}
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '2000px',
                    width: '310px',
                    height: '550px',
                }}
            >

                {/* Profile Card Front Side */}
                <Card id="front-side-card"
                    className={`front-card-profile`}
                    // border="2px solid white" 
                    // borderRadius="20px"
                    bg={'transparent'}                  // need to be here for chakra
                    color="white"                       // ...
                    position={'absolute'}               // do not remove
                    transition="0.6s"                   // hack
                    border="2px solid white"            // thick border to add with container borders
                    borderRadius="20px"                 // adding 3d effect
                    opacity={isFlipped ? '0' : '1'}     // display hide when flip
                    zIndex={isFlipped ? '0' : '2'}      //  ...
                    style={{
                        // backfaceVisibility: 'visible',  // Changed to visible   DONT need anymore?
                        // perspective: 'none',            // Removed perspective  test smoth animation
                    }}
                >
                    <CardHeader id='frontSideHeader'
                        borderTopRadius="10px"
                        textAlign="center"
                        bg="transparent"
                        p={2}
                        borderBottom="1px solid white"
                        style={{ backfaceVisibility: 'hidden', }}
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

                    <CardBody id='frontSideBody'
                        bg="transparent"
                        style={{ backfaceVisibility: 'hidden', }}
                    >
                        <VStack>
                            <Center>
                                <Box borderRadius={100} border="3px solid white">
                                    <UserAvatar hiveAccount={user} borderRadius={100} boxSize={150} />
                                </Box>
                            </Center>
                        </VStack>

                        <VStack w="100%" marginTop={5}>
                            <Box w={230}
                                p={2}
                                className={`box-level-${userLevel}`}
                            >
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

                    <CardFooter id='frontSideFooter'
                        fontSize="16px" fontWeight="bold"
                        color="white"
                        style={{ backfaceVisibility: 'hidden', }}
                    >
                        <VStack w="100%">
                            <Flex justify="center">
                                <div style={{ zIndex: 10 }}>
                                    <Button className={`box-level-${userLevel}`}
                                        _hover={{ background: "black", color:"white!important" }}
                                        // color="white"
                                        // border="1px solid white"
                                        width="100%"
                                        leftIcon={<FaPencil size={"22px"} />}
                                        m={2}
                                        variant="outline"
                                        w="auto"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            position: 'relative',
                                            zIndex: 15              // button high above others divs
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onOpen();
                                        }}
                                    ></Button>
                                    <Button className={`box-level-${userLevel}`}
                                        _hover={{ background: "black", color:"white!important" }}
                                        leftIcon={<FaHive size={"22px"} />}
                                        width={"100%"}
                                        m={2}
                                        variant={"outline"}
                                        w={"auto"}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            position: 'relative',
                                            zIndex: 15              // button high above others divs
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
                <Card id="back-side-card" className={`back-card-profile`}
                    position={'absolute'}
                    color="white"                       //move from css to here for chakra
                    bg={'transparent'}                  //need to be here for chakra
                    border="2px solid white"            // thick border to add with container borders
                    borderRadius="20px"                 // adding 3d effect
                    opacity={isFlipped ? '1' : '0'}     // visible when flipped
                    zIndex={isFlipped ? '2' : '0'}      // send to back when flipped
                >

                    <CardHeader id='backSideHeader'
                        borderTopRadius="10px"
                        textAlign="center"
                        bg="transparent"
                        p={2}
                        borderBottom="1px solid white"
                        style={{ backfaceVisibility: 'hidden', }}
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

                    <CardBody id='backSideBody'
                        textAlign="center"
                        width="100%"
                        height="100%"
                        borderRadius="20px"
                        padding={0}
                        marginTop={5}
                    >
                        <CardHeader id='backSideBodyHeader'
                            style={{
                                backgroundImage: `url(${nextImage(userPostingMetadata?.profile?.cover_image || `https://images.ecency.com/webp/u/${user.name}/cover/small`)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderBottom: '1px solid white',
                                borderRadius: '10px',
                                textAlign: 'center',
                                backgroundColor: 'gray.900',
                                padding: '0.5em',
                                margin: '2em 1em 2em 1em'
                            }}>
                            <HStack justify="center">
                                <UserAvatar hiveAccount={user} borderRadius={100} boxSize={20} />
                                <Text size="md" color="white"></Text>
                            </HStack>
                        </CardHeader>

                        <HStack justify="center">
                            <Box className={`box-level-${userLevel}`} 
                                w={230} 
                                border="1px solid white" 
                                borderRadius="10px"
                                p={2}
                            >
                                {userPostingMetadata.profile?.about || "I'm too lazy to write a bio."}
                            </Box>
                        </HStack>

                        <HStack justify="center">
                            <Box className={`box-level-${userLevel}`}  
                                border="1px solid white" 
                                borderRadius="10px"
                                w={230}
                                p={2}
                                marginTop={5}
                            >
                                <Text fontWeight="bold" fontSize="18px">
                                    XP {userXp}
                                </Text>
                            </Box>
                        </HStack>
                    </CardBody>

                    <CardFooter id='backSideFooter'>
                    </CardFooter>
                </Card>

            </Box>
        </Flex>
    </>);
}

export default ProfileCard;
