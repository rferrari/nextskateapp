"use client"

import { useHiveUser } from '@/contexts/UserContext';
import { useComments } from '@/hooks/comments';
import { Box, Divider, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import React, { useMemo, useState } from 'react';
import EmbeddedCommentList, { EmbeddedCommentListProps } from './EmbeddedCommentList';
import UploadForm from './UploadForm';

const EmbeddedMap: React.FC = () => {
  const parent_author = "web-gnar";
  const parent_permlink = "about-the-skatehive-spotbook";
  const mapSrc = "https://www.google.com/maps/d/u/1/embed?mid=1iiXzotKL-uJ3l7USddpTDvadGII&hl=en&ll=29.208380630280647%2C-100.5437214508988&z=4";
  const { comments: allComments, addComment, isLoading } = useComments(parent_author, parent_permlink);
  const user = useHiveUser();
  const username = user?.hiveUser?.name || 'Anonymous';
  const boxWidth = useBreakpointValue({ base: "90%", sm: "80%", md: "75%", lg: "70%" });
  const paddingX = useBreakpointValue({ base: 2, sm: 4, md: 6 });
  const paddingY = useBreakpointValue({ base: 2, sm: 4 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [sortMethod, setSortMethod] = useState<string>("chronological");
  const [visiblePosts, setVisiblePosts] = useState<number>(10);

  const comments = useMemo(() => {
    return allComments.filter(comment => comment.parent_permlink === parent_permlink);
  }, [allComments, parent_permlink]);

  const sortedComments = useMemo(() => {
    if (sortMethod === "chronological") {
      return comments?.slice().reverse();
    } else if (sortMethod === "engagement") {
      return comments?.slice().sort((a, b) => (b?.children ?? 0) - (a?.children ?? 0));
    }
    return comments;
  }, [comments, sortMethod]);

  const embeddedCommentListProps: EmbeddedCommentListProps = {
    comments: sortedComments || [],
    visiblePosts: visiblePosts,
    username: username,
    parentPermlink: parent_permlink, 
  };

  return (
    <>
        <Global
        styles={`
          @property --a {
            syntax: "<angle>";
            inherits: false;
            initial-value: 135deg;
          }

          @keyframes bgrotate {
            from {
              --a: 135deg;
            }
            to {
              --a: 315deg;
            }
          }

          #animatedBox {
            background-image: repeating-linear-gradient(var(--a), #198e2b, #7b9565 10vw);
            animation-name: bgrotate;
            animation-direction: alternate;
            animation-iteration-count: infinite;
            animation-duration: 30s;
          }
        `}
      />
      <Flex   
      flexDirection="column"
        align="center"
        justifyContent="center"
        p={4}
       style={{ width: isMobile ? "auto" :  "70%"}}
        maxWidth="100%"
        
        >
        <Box
          id="animatedBox"
          borderRadius="10px"
          p={{ base: 2, md: 4 }}
          width="boxWidth"
          maxWidth="100%"
          mx="auto"
          mb={6}
          boxShadow="xl"
        >
          <Text fontSize="lg" fontWeight="bold" color="white" mb={2} align="center">
            Skatehive Spot Map
            A Global Skatespot Database
          </Text>
          <Box mb={4}>
            <iframe
              src={mapSrc}
             
              style={{
                border: "0",
               
               
                height: isMobile ? "50vh" : "400px",

                width: "100%",
                padding: 0,
              
                margin: 0,
                left: 0,
                top: 0,
                touchAction: "pan-x pan-y",
              }}
              
              allowFullScreen
            ></iframe>
          </Box>
          <Flex flexDirection={{ base: "column", md: "row" }} align="center">
            <Box flex="1" display={{ base: "none", md: "block" }} mx="auto">
              <Image
                src="https://i.ibb.co/yqr3KQR/image.png"
                alt="Map thumbnail"
                boxSize="300px"
                boxShadow="md"
              />
            </Box>
            <Box flex="2" p={paddingX}>
              <Text fontSize="large" color="white" mb={3}>
                The map above is a collection of skate spots from the SkateHive Spotbook.
              </Text>
              <Text fontSize="large" color="white" mb={3}>
                If you would like to add a spot, please follow these steps:
              </Text>
              <ol style={{ listStylePosition: "inside" }}>
                <li>
                  <Text fontSize="large" color="white">
                    Take a photo of the spot. Try not to include people in the photo.
                  </Text>
                </li>
                <li>
                  <Text fontSize="large" color="white">
                    Find the coordinates of the spot. Latitude, then Longitude. This can be found by turning location services on with your photos on your phone.
                  </Text>
                </li>
                <li>
                  <Text fontSize="large" color="white">
                    Visit the SkateHive Spotbook and submit the spot.
                  </Text>
                </li>
              </ol>
            </Box>
          </Flex>
        </Box>

        <Box width={boxWidth} color="white">
          
          <UploadForm />
        </Box>
        <Divider mt={12}/>
        <Box width={boxWidth} mt={6}>
          <EmbeddedCommentList {...embeddedCommentListProps} />
        </Box>
      </Flex>
    </>
  );
};

export default EmbeddedMap;
