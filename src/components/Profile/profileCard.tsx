import useHiveBalance from '@/hooks/useHiveBalance';
import { HiveAccount } from '@/lib/useHiveAuth';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    HStack,
    Image,
    Text,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
// import { css } from '@emotion/react';
import LoginModal from '../Hive/Login/LoginModal';
import UserAvatar from '../UserAvatar';
import useGnarsBalance from '@/hooks/useGnarsBalance';
import { Boxes } from 'lucide-react';
import '../../styles/profile-card-styles.css';

import { FaPencil } from "react-icons/fa6"
import EditInfoModal from "./EditInfoModal"

interface ProfileCardProps {
    user: HiveAccount
}

// const getGlowStyles = (level: number) => {
//     const glowSizes = ["0 0 10px", "0 0 20px", "0 0 30px", "0 0 40px", "0 0 50px", "0 0 60px", "0 0 70px"];
//     const glowColors = ["#333", "#6600cc", "#003366", "#cc00ff", "#ff3300", "#66ff33", "#ff33cc"];
//     const backgroundImages = [
//         '',
//         'https://media.wired.com/photos/593240ca58b0d64bb35d07ce/master/w_1600%2Cc_limit/hexwave.gif',
//         'https://i.pinimg.com/originals/19/39/59/193959e347745645326f8928b807aa24.gif',
//         'https://i.gifer.com/origin/b2/b2e9e60e42d7d26fc912d7de30e07aa4_w200.gif',
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Computer-screen-code-glitch-animation-gif-background-free.gif/1280px-Computer-screen-code-glitch-animation-gif-background-free.gif',
//         'https://i.pinimg.com/originals/18/9f/db/189fdb5d2fc52eac4fa2a6de6edaf222.gif',
//         'https://i.pinimg.com/originals/06/a5/12/06a51219a313e73ed70785ac4b9d8024.gif',
//     ];


//     const size = level >= 1 && level <= 7 ? glowSizes[level - 1] : glowSizes[0];
//     const color = level >= 1 && level <= 7 ? glowColors[level - 1] : glowColors[0];
//     const backgroundImage = level >= 1 && level <= 7 ? backgroundImages[level - 1] : backgroundImages[0];

//     return {
//         boxShadow: `inset ${size} ${color}, inset 10px 0 40px black, inset -10px 0 40px ${color}, inset 10px 0 150px black, inset -10px 0 150px ${color}, 0 0 30px #333, -5px 0 300px ${color}, 5px 0 40px ${color}`,
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover'
//     };
// };


/**

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const userMetadata = useMemo(() => JSON.parse(user.json_metadata || '{}'), [user.json_metadata]);
    const userPostingMetadata = useMemo(() => JSON.parse(user.posting_json_metadata || '{}'), [user.posting_json_metadata]);

    const userLevel = userMetadata.extensions?.level || 0;
    const gnarsBalance = useGnarsBalance(userMetadata.extensions?.eth_address || '');
    const { hivePower } = useHiveBalance(user);
    const username = user.name;

    const [userXp, setUserXp] = useState(userMetadata.extensions?.staticXp || 0);
    const [userVideoParts, setUserVideoParts] = useState(userMetadata.extensions?.video_parts?.length || 0);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleProfileUpdate = () => {
        // Logic to handle the profile update
        // console.log("Profile updated");
      };


*/

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const userMetadata = useMemo(() => JSON.parse(user.json_metadata || '{}'), [user.json_metadata]);
    const userPostingMetadata = useMemo(() => JSON.parse(user.posting_json_metadata || '{}'), [user.posting_json_metadata]);

    const userLevel = userMetadata.extensions?.level || 0;
    const gnarsBalance = useGnarsBalance(userMetadata.extensions?.eth_address || '');
    const { hivePower } = useHiveBalance(user);
    const username = user.name;

    const [userXp, setUserXp] = useState(userMetadata.extensions?.staticXp || 0);
    const [userVideoParts, setUserVideoParts] = useState(userMetadata.extensions?.video_parts?.length || 0);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleProfileUpdate = () => {
        // Logic to handle the profile update
        // console.log("Profile updated");
    };

    // const cardStyles = getGlowStyles(userLevel);
//     return (
//         <>
//             {isLoginModalOpen &&
//                 <LoginModal isOpen={isLoginModalOpen}
//                     onClose={() => setIsLoginModalOpen(false)} />}


//             {isOpen &&
//                 <EditInfoModal onUpdate={handleProfileUpdate} isOpen={isOpen}
//                     onClose={onClose} user={user} />}

//             <div style={{
//                 perspective: '1000px',
//                 width: '310px',
//                 height: '550px'
//             }}>
//                 <Box id='card-front-profile'
//                     p={'relative'}
//                     width={'100%'}
//                     height={'100%'}
//                     text-align={'center'}
//                     transition={'transform 0.6s'}
//                     transform-style={'preserve-3d'}
//                     will-change={'transform'}
//                     transform={isFlipped ? "rotateY(180deg)" : "none"}
//                 >
//                     <Card
//                         className={`card-profile level-${userLevel}`}
//                         border="2px solid white"
//                         size="sm"
//                         color="white"
//                         p={2}
//                         borderRadius="20px"
//                     >
//                         <CardHeader
//                             color="white"
//                             borderBottom="1px solid white"
//                             borderTopRadius="10px"
//                             textAlign="center"
//                             bg="transparent"
//                             p={2}
//                             cursor={'pointer'}
//                             onClick={handleClick}
//                         >
//                             <HStack justifyContent="space-between">
//                                 <HStack justifyContent="flex-start">
//                                     {/* <Image src="/skatehive_square_green.png" alt="Logo" boxSize="36px" /> */}
//                                     <Text fontWeight="bold" fontSize="18px"
//                                         textShadow="2px 2px 1px rgba(0,0,0,1)">
//                                         {user.name}
//                                     </Text>
//                                 </HStack>
//                                 <Text fontWeight="bold" fontSize="18px">
//                                     Lvl {userLevel}
//                                 </Text>
//                             </HStack>
//                         </CardHeader>
//                         <Box p={3}>
//                             <CardBody onClick={handleClick} cursor={'pointer'}
//                                 bg="transparent">
//                                 <VStack>
//                                     <Center>
//                                         <Box borderRadius={14} border="3px solid black">
//                                             <UserAvatar hiveAccount={user} borderRadius={10} boxSize={230} />
//                                         </Box>
//                                     </Center>
//                                 </VStack>
//                             </CardBody>
//                             <CardFooter fontSize="16px" fontWeight="bold" color="white" mb={-2}>
//                                 <VStack w="100%">
//                                     <Box border="1px solid white"
//                                         w={230} borderRadius="10px" p={2}
//                                         bg="rgba(0, 0, 0, 0.8)">
//                                         <HStack justify="space-between">
//                                             <HStack>
//                                                 <Image src="/logos/hp_logo.png" alt="Logo" boxSize="20px" />
//                                                 <Text>Power:</Text>
//                                             </HStack>
//                                             <Text>{hivePower.toFixed(0)} HP</Text>
//                                         </HStack>
//                                         <HStack justify="space-between">
//                                             <HStack>
//                                                 <Image src="/logos/gnars_logo.png" alt="Logo" boxSize="18px" />
//                                                 <Text cursor="pointer">Gnars:</Text>
//                                             </HStack>
//                                             <Text cursor="pointer">{String(gnarsBalance.gnarsBalance) || 0}</Text>
//                                         </HStack>
//                                         <HStack justify="space-between">
//                                             <HStack>
//                                                 <Image src="/skatehive_square_green.png" alt="Logo" boxSize="20px" />
//                                                 <Text cursor="pointer">Exp:</Text>
//                                             </HStack>
//                                             <Text cursor="pointer">{userXp} XP</Text>
//                                         </HStack>
//                                         <HStack justify="space-between">
//                                             <Text cursor="pointer">📹 VideoParts:</Text>
//                                             <Text cursor="pointer">{userVideoParts || 0}</Text>
//                                         </HStack>
//                                     </Box>
//                                     <CardFooter>
//                                         <Flex justify="right">
//                                             <Button
//                                                 _hover={{ background: "transparent" }}
//                                                 color="white"
//                                                 border="1px solid white"
//                                                 width="100%"
//                                                 mt={2}
//                                                 variant="outline"
//                                                 w="auto"
//                                                 onClick={onOpen}
//                                             // onClick={() => window.location.href = `/skater/${username}`}
//                                             >
//                                                 Edit
//                                             </Button>
//                                         </Flex>
//                                     </CardFooter>
//                                 </VStack>
//                             </CardFooter>
//                         </Box>
//                     </Card>
//                     <Card
//                         style={{
//                             position: "absolute",
//                             width: "100%",
//                             height: "100%",
//                             backfaceVisibility: "hidden",
//                             willChange: "transform"
//                         }}
//                         bg="black"
//                         border="2px solid white"
//                         size="sm"
//                         color="white"
//                         p={2}
//                         borderRadius="20px"
//                         className={`card-profile level-${userLevel}`}
//                     >
//                         <CardHeader
//                             cursor={'pointer'}
//                             onClick={handleClick}
//                             style={{
//                                 background: `url(${userPostingMetadata?.profile?.cover_image || 'https://images.ecency.com/webp/u/' + user.name + '/cover/small'})`,
//                                 backgroundColor: 'white', // Add this line to set the background color to white
//                                 backgroundSize: 'cover',
//                                 backgroundPosition: 'center', // Add this line to center the background image
//                                 backgroundRepeat: 'no-repeat', // Add this line to prevent repeating the background image
//                                 padding: '16px 20px', // Add these lines to style the padding
//                                 borderRadius: '8px', // Add this line to style the border radius
//                                 boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // Add this line to add a box shadow
//                             }}
//                             borderBottom="1px solid white" borderTopRadius="10px" textAlign="center" bg="gray.900" p={2}
//                         >
//                             <HStack justify="center">
//                                 <UserAvatar hiveAccount={user} borderRadius={100} boxSize={20} />
//                                 <Text size="md" color="white"></Text>
//                             </HStack>
//                         </CardHeader>
//                         <CardBody onClick={handleClick}
//                             textAlign="center" width="100%" height="100%" borderRadius="20px">
//                             <Center>

//                                 <Box border="1px solid white" w={230} borderRadius="10px" p={2}>
//                                     {userPostingMetadata.profile?.about || "No bio available"}
//                                 </Box>
//                             </Center>
//                         </CardBody>
//                         <CardFooter>
//                             <Button leftIcon={<FaArrowDown />} size="sm" color={'white'} variant="outline" w="auto" onClick={() => setIsFlipped(false)}>
//                                 Back
//                             </Button>
//                         </CardFooter>
//                     </Card>
//                 </Box>
//             </div>
//         </>
//     );
// }

// export default ProfileCard;



return (
    <>
        {isLoginModalOpen &&
            <LoginModal isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)} />}

        {/* {false &&
            <EditInfoModal onUpdate={handleProfileUpdate}
                isOpen={false onClose={}}
                user={user} />} */}

        {isOpen &&
            <EditInfoModal onUpdate={handleProfileUpdate} isOpen={isOpen}
                onClose={onClose} user={user} />}

        <Flex justify="center" direction="column" width="full" height="full">
            <Box id="card-front-profile"
                position="relative"
                // _hover={{ transform: 'rotateY(180deg)' }}
                transition="0.6s"
                transform={isFlipped ? 'rotateY(180deg)' : 'none'}
                style={{
                    perspective: '1000px',
                    width: '310px',
                    height: '550px',
                }}
            >
                <Card className={`card-profile level-${userLevel}`}
                    border="2px solid white"
                    size="sm"
                    color="white"
                    p={2}
                    borderRadius="20px"
                    onClick={handleClick}
                >
                    <CardHeader borderTopRadius="10px" textAlign="center" bg="transparent" p={2}>
                        <HStack justifyContent="space-between">
                            <HStack justifyContent="flex-start">
                                <Text fontWeight="bold" fontSize="18px"
                                    textShadow="2px 2px 1px rgba(0,0,0,1)">
                                    {user.name}
                                </Text>
                            </HStack>
                            <Text fontWeight="bold" fontSize="18px">
                                Lvl {userLevel}
                            </Text>
                        </HStack>
                    </CardHeader>

                    <CardBody onClick={handleClick}
                        cursor={'pointer'}
                        bg="transparent"
                    >
                        <VStack>
                            <Center>
                                <Box borderRadius={14} border="3px solid black">
                                    <UserAvatar hiveAccount={user} borderRadius={10} boxSize={230} />
                                </Box>
                            </Center>
                        </VStack>
                    </CardBody>

                    <CardFooter fontSize="16px" fontWeight="bold" color="white" mb={-2}>
                        <VStack w="100%">
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
                            <CardFooter>
                                <Flex justify="right">
                                    <Button
                                        _hover={{ background: "transparent" }}
                                        color="white"
                                        border="1px solid white"
                                        width="100%"
                                        mt={2}
                                        variant="outline"
                                        w="auto"
                                        onClick={onOpen}
                                    >
                                        Edit
                                    </Button>
                                </Flex>
                            </CardFooter>
                        </VStack>
                    </CardFooter>
                </Card>
            </Box>
        </Flex>
    </>
);
}

export default ProfileCard;