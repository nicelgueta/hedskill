import React from 'react';
import { 
    Box, 
    HStack,
    Icon,
    IconButton,
    Stagger,
    useDisclose,
    VStack,
 } from 'native-base';
 import { MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useAppColors } from '../../colors';

const HomeScreen = ({ navigation, props }) => {
    const colors = useAppColors();
    const { isOpen, onToggle } = useDisclose();
    console.log(props)
    return (
        <Box bg={colors.bg} h="100%" padding={5}>
            <VStack alignItems="flex-end">
                <Box minH="90%" alignItems="flex-end" justifyContent="flex-end">
                    <Stagger
                        visible={isOpen}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            translateY: 34,
                        }}
                        animate={{
                            translateY: 0,
                            scale: 1,
                            opacity: 1,
                            transition: {
                            type: "spring",
                            mass: 0.8,
                            stagger: {
                                offset: 10,
                                reverse: true,
                            },
                            },
                        }}
                        exit={{
                            translateY: 34,
                            scale: 0.5,
                            opacity: 0,
                            transition: {
                            duration: 100,
                            stagger: {
                                offset: 10,
                                reverse: false,
                            },
                            },
                        }}
                    >
                        {/* <IconButton
                            mb="4"
                            variant="solid"
                            bg={colors.primary}
                            colorScheme="indigo"
                            size="lg"
                            borderRadius="full"
                            icon={
                            <Icon
                                as={MaterialIcons}
                                size="8"
                                name="location-pin"
                                _dark={{
                                color: "warmGray.50",
                                }}
                                color="warmGray.50"
                            />
                            }
                        />
                        <IconButton
                            mb="4"
                            variant="solid"
                            bg={colors.primary}
                            colorScheme="yellow"
                            size="lg"
                            borderRadius="full"
                            icon={
                            <Icon
                                as={MaterialCommunityIcons}
                                _dark={{
                                color: "warmGray.50",
                                }}
                                size="8"
                                name="microphone"
                                color="warmGray.50"
                            />
                            }
                        /> */}
                        <IconButton
                            mb="4"
                            variant="solid"
                            bg={colors.primary}
                            _pressed={{
                                bg: colors.foreActive
                            }}
                            size="lg"
                            onPress={()=>navigation.navigate("Friends")}
                            borderRadius="full"
                            icon={
                            <Icon
                                as={MaterialIcons}
                                _dark={{
                                color: "warmGray.50",
                                }}
                                size="8"
                                name="people"
                                color="warmGray.50"
                            />
                            }
                        />
                        <IconButton
                            mb="4"
                            variant="solid"
                            bg={colors.primary}
                            _pressed={{
                                bg: colors.foreActive
                            }}
                            size="lg"
                            onPress={()=>navigation.navigate("League")}
                            borderRadius="full"
                            icon={
                            <Icon
                                as={MaterialIcons}
                                size="8"
                                name="view-comfortable"
                                _dark={{
                                color: "warmGray.50",
                                }}
                                color="warmGray.50"
                            />
                            }
                        />
                    </Stagger>
                </Box>
                <Box>
                    <IconButton
                        variant="solid"
                        borderRadius="full"
                        alignItems="center"
                        size="lg"
                        onPress={onToggle}
                        bg={colors.primary}
                        _pressed={{
                            bg: colors.foreActive
                        }}
                        icon={
                            <Icon
                                as={MaterialIcons}
                                size="8"
                                name="add"
                                _dark={{
                                    color: "warmGray.50",
                                }}
                            />
                        }
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export default HomeScreen;