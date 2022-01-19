import React from 'react';
import { Platform, ScrollView, Pressable } from "react-native"
import { 
    Avatar,
    Box, 
    HStack,
    Icon,
    Input,
    PresenceTransition,
    Text,
    VStack,
 } from 'native-base';
import { useAppColors } from '../../colors';
import { MaterialIcons } from "@expo/vector-icons";
import { NAMES } from '../friends';
import AppButton from '../../components/button';



const LeagueScreen = ({ navigation }) => {
    const colors = useAppColors();
    const [ leagueName, setLeagueName ] = React.useState(null);
    const [ friendValue, setFriendValue] = React.useState(null);
    const [ selectedFriends, setSelectedFriends ] = React.useState([]);
    const [ submitHidden, setSubmitHidden ] = React.useState(false);

    const updateFriends = (friendObj) => {
        setSelectedFriends([...selectedFriends, friendObj]);
        setFriendValue(null)
    }

    const onEndFriendEditing = () => {
        setSubmitHidden(false);
        setFriendValue(null);
    }
    console.log("name: "+ leagueName);
    console.log("friendValue: "+ friendValue);
    return (
        <Box w="100%" h="100%">
            <VStack h="100%" bg={colors.bg}>
                <PresenceTransition
                    visible={true}
                    initial={{
                    opacity: 0,
                    }}
                    animate={{
                    opacity: 1,
                    transition: {
                        duration: 2000,
                    },
                    }}
                >
                    {
                        submitHidden ? null :
                    <Box padding={5}>
                        {
                            leagueName ? null :
                            <Text 
                            paddingBottom={5} 
                            color={colors.fore}
                            fontSize={22}
                            
                            >
                                Enter new league name
                            </Text>
                        }
                        <Input
                            borderColor={colors.fore}
                            borderWidth={2}
                            // variant="underlined"
                            placeholder='League name'
                            size="xl"
                            color={colors.fore}
                            value={leagueName}
                            onSubmitEditing={(e)=>setLeagueName(e.nativeEvent.text)}
                            InputLeftElement={
                                <Icon
                                  as={<MaterialIcons name="view-comfortable" />}
                                  size={5}
                                  ml="2"
                                  color={colors.fore}
                                />
                            }
                        />
                    </Box>
                    }
                </PresenceTransition>
            <ScrollView keyboardShouldPersistTaps="handled">
                <PresenceTransition
                    visible={leagueName}
                    initial={{
                    opacity: 0,
                    }}
                    animate={{
                    opacity: 1,
                    transition: {
                        duration: 1000,
                    },
                    }}
                >
                    <Box padding={5}>
                        <Text 
                            fontSize={22} 
                            color={colors.fore}
                            paddingBottom={3}
                        >
                            {
                                selectedFriends.length > 0 ?
                                `Friends - ${selectedFriends.length} added`
                                :
                                "Choose friends to join"
                            }
                        </Text>
                        <Input
                            borderColor={colors.fore}
                            borderWidth={2}
                            placeholder='Start typing a name'
                            size="xl"
                            onChangeText={setFriendValue}
                            onTouchStart={()=>setSubmitHidden(true)}
                            onEndEditing={onEndFriendEditing}
                            onBlur={onEndFriendEditing}
                            color={colors.fore}
                            value={friendValue}
                            InputLeftElement={
                                <Icon
                                as={<MaterialIcons name="people" />}
                                size={5}
                                ml="2"
                                color={colors.fore}
                                />
                            }
                        />
                        {
                            friendValue? NAMES.filter(n=>selectedFriends.indexOf(n) < 0).length < 1 ?
                                <Text padding={2} color={colors.fore} size={"lg"} maxW={"100%"}>
                                    Looks like you've already added everyone to this league!
                                </Text>
                                :
                                NAMES.filter(
                                n=>n.nameLower.includes(friendValue.toLowerCase())
                                ).filter(
                                    n=>selectedFriends.indexOf(n) < 0
                                ).map(y=>{return(
                                    <AppButton
                                        key={"menu-item-"+y.id}
                                        bg={colors.bg}
                                        color={colors.fore}
                                        h={40}
                                        _style={{
                                            paddingLeft: 10,
                                            borderBottomColor: colors.fore,
                                            borderBottomWidth: 1
                                        }}
                                        _activeStyle={{
                                            borderColor: colors.foreActive
                                        }}
                                        _active={{
                                            bg: colors.foreActive,
                                            color: colors.bg
                                        }}
                                        onPress={()=>updateFriends(y)}
                                        content={y.fullName}
                                        _text={{
                                            w: "100%", 
                                            fontSize: 17,
                                            padding: 2
                                        }}
                                    />
                                )})
                            :
                            null
                        }
                        { selectedFriends.length < 1 || friendValue ? null :
                            <VStack space={2} paddingTop={3}>
                                { 
                                selectedFriends.map(item=>(
                                    <Box
                                        borderWidth="1"
                                        borderRadius={10}
                                        padding={5}
                                        borderColor={colors.fore}
                                        // pl="4"
                                        // pr="5"
                                        py="1"
                                        key={"item-"+item.id}
                                    >
                                        <HStack space={2} justifyContent="flex-start">
                                        <Avatar
                                            size="48px"
                                            source={{
                                            uri: item.avatarUrl,
                                            }}
                                        />
                                        <VStack justifyContent={"center"}>
                                            <Text
                                                bg={colors.bg}
                                                color={colors.fore}
                                                fontSize={18}
                                            >
                                            {item.fullName}
                                            </Text>
                                        </VStack>
                                        </HStack>
                                    </Box>
                                ))    
                                }
                            </VStack>
                        }
                    </Box>
                </PresenceTransition>
            </ScrollView>
            <PresenceTransition
                visible={selectedFriends.length > 0 && !submitHidden}
                initial={{
                opacity: 0,
                }}
                padding={10}
                animate={{
                opacity: 1,
                transition: {
                    duration: 1000,
                },
                }}
            >
                <Pressable
                    style={({pressed})=>[
                    {
                        backgroundColor: pressed ? colors.foreActive : colors.fore,
                        justifyContent: "center",
                        padding: 3,
                        borderColor: pressed ? colors.foreActive : colors.fore,
                        borderWidth: 1,
                        borderRadius: 7
                    }
                    ]}
                    onPress={()=>alert("submitted")}
                >
                    {
                        ({pressed}) => (
                            <Text 
                                w="100%" 
                                fontSize={20}
                                textAlign={"center"}
                                alignSelf={"center"}
                                padding="1"
                                color={colors.bg}
                            >
                                Create league
                            </Text>
                        )
                    }
                </Pressable>
            </PresenceTransition>
        </VStack>
    </Box>
    )
} 

export default LeagueScreen;