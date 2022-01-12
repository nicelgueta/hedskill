import React from 'react';
import { Platform, ScrollView, Pressable } from "react-native"
import { 
    Avatar,
    Box, 
    Button,
    Center,
    Container,
    Content,
    HStack,
    Icon,
    Input,
    PresenceTransition,
    Spacer,
    Text,
    VStack,
 } from 'native-base';
import { useAppColors } from '../../colors';
import { MaterialIcons } from "@expo/vector-icons";


const NAMES = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      nameLower: "aafreen khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    // {
    //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    //   fullName: "Sujitha Mathur",
    //   nameLower: "sujitha mathur",
    //   timeStamp: "11:11 PM",
    //   recentText: "Cheer up, there!",
    //   avatarUrl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    // },
    // {
    //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
    //   fullName: "Anci Barroco",
    //   nameLower: "anci barroco",
    //   timeStamp: "6:22 PM",
    //   recentText: "Good Day!",
    //   avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    // },
    // {
    //   id: "68694a0f-3da1-431f-bd56-142371e29d72",
    //   fullName: "Aniket Kumar",
    //   nameLower: "aniket kumar",
    //   timeStamp: "8:56 PM",
    //   recentText: "All the best",
    //   avatarUrl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    // },
    // {
    //   id: "28694a0f-3da1-471f-bd96-142456e29d72",
    //   fullName: "Kiara",
    //   nameLower: "kiara",
    //   timeStamp: "12:47 PM",
    //   recentText: "I will call today.",
    //   avatarUrl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    // },
  ]

const LeagueScreen = ({ navigation }) => {
    const colors = useAppColors();
    const [ name, setName ] = React.useState(null);
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
    console.log("name: "+ name);
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
                            name ? null :
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
                            onSubmitEditing={(e)=>setName(e.nativeEvent.text)}
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
                    visible={name}
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
                                <Pressable
                                    key={"menu-item-"+y.id} 
                                    style={({pressed})=>[
                                    {
                                        backgroundColor: pressed ? colors.fore : colors.bg,
                                        height: 40,
                                        justifyContent: "center",
                                        paddingLeft: 10,
                                        borderBottomColor: colors.fore,
                                        borderBottomWidth: 1,
                                        // borderBottomLeftRadius: 10,
                                        // borderBottomRightRadius: 10,
                                    }
                                    ]}
                                    onPress={()=>updateFriends(y)}
                                >
                                    {
                                        ({pressed}) => (
                                            <Text 
                                                w="100%" 
                                                fontSize={17} 
                                                padding="2"
                                                color={pressed ? colors.bg : colors.fore}
                                            >
                                                {y.fullName}
                                            </Text>
                                        )
                                    }
                                </Pressable>
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
                                Submit
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