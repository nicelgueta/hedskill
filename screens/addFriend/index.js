import React from "react";
import { Pressable, ScrollView } from "react-native";
import { 
    Box, 
    Icon,
    Input,
    HStack,
    PresenceTransition, 
    Text,
    VStack, 
    Button
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppColors } from "../../colors";
import AppButton from "../../components/button";

const AddFriendScreen = ({ navigation }) => {
    const colors = useAppColors();
    const [ friendValue, setFriendValue ] = React.useState(null);
    const [ foundUserName, setFoundUsername ] = React.useState(null);
    const [ customFriendValue, setcustomFriendValue ] = React.useState(null);
    const [ chooseCustomFriend, setChooseCustomFriend ] = React.useState(false);
    const [ searching, setSearching ] = React.useState(false);
    const [ foundUserNames, setFoundUsernames ] = React.useState([]);
    const [ searched, setSearched ] = React.useState(false);
    

    const submitShow = (
        customFriendValue && chooseCustomFriend 
        || 
        foundUserName && !chooseCustomFriend 
    );
    
    const findUserName  = () => {
        setFoundUsername(null)
        if (!searched){
            setSearched(true)
        }
        setSearching(true)
        const myNames = [...Array(100).keys()].map(x=>`item${x}`)
        console.log(friendValue)
        console.log(myNames.filter(x=>x.includes(friendValue.toLowerCase())))
        setFoundUsernames(myNames.filter(x=>x.includes(friendValue.toLowerCase())))
        setSearching(false);
    }
    const resetSearch = () => {
        setFoundUsername(null);
        setFoundUsernames([]);
        setFriendValue(null)
    }
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
                    <Box padding={5}>
                        {
                            chooseCustomFriend ? null:
                            <>
                            <Text 
                                paddingBottom={5} 
                                color={colors.foreDarker}
                                fontSize={22}
                                on
                            
                            >
                                Find username
                            </Text>
                            
                            <HStack w="100%">
                                <Input
                                    borderColor={colors.foreDarker}
                                    borderWidth={2}
                                    // borderRightWidth={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={0}
                                    // variant="underlined"
                                    placeholder='Username'
                                    w="80%"
                                    size="xl"
                                    color={colors.foreDarker}
                                    value={foundUserName || friendValue}
                                    onChangeText={setFriendValue}
                                    onFocus={resetSearch}
                                    InputLeftElement={
                                        <Icon
                                        as={<MaterialIcons name="people" />}
                                        size={5}
                                        ml="2"
                                        color={colors.foreDarker}
                                        />
                                    }
                                />
                                <Button
                                    isLoading={searching}
                                    bg={colors.foreDarker}
                                    maxWidth={"21%"}
                                    minWidth={"21%"}
                                    borderTopLeftRadius={0}
                                    onPress={findUserName}
                                    borderBottomLeftRadius={0}
                                    _text={{
                                        color: colors.bg,
                                        fontSize: 14
                                    }}
                                    _loading={{
                                        bg: colors.foreDarker,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                >
                                    {searching ? null : "Search"}
                                </Button>
                            </HStack>
                            </>
                        }
                        <Box 
                            paddingTop={2} 
                            
                            >
                                <HStack>
                                {
                                    searched && !searching && !foundUserName? 
                                    <Text
                                        paddingLeft={2}
                                        color={colors.foreDarker}
                                        fontSize={20}
                                        alignSelf={"center"}
                                    >{foundUserNames.length} matches</Text>
                                    : null
                                }
                                {
                                    chooseCustomFriend ? null :
                                    foundUserNames.length < 1 ?
                                    <AppButton 
                                        bg={colors.bg}
                                        text="Username not found?"
                                        pressableProps={{
                                            justifyContent: "center",
                                            alignSelf: "center"
                                            
                                        }}
                                        _text={{
                                            fontSize: 15,
                                            alignSelf: "flex-end"
                                        }}
                                        _active={{
                                            bg: colors.foreDarkerActive,
                                            color: colors.bg
                                        }}
                                        color={colors.foreDarker}
                                        onPress={()=>setChooseCustomFriend(true)}
                                        //h="80%"
                                        w="70%"
                                    />
                                    :
                                    null
                                }
                                </HStack>
                                <ScrollView keyboardShouldPersistTaps="handled">
                                {
                                    foundUserNames.length > 0 && !foundUserName?
                                    foundUserNames.map(x=>
                                        <AppButton
                                            key={"menu-item-"+x}
                                            bg={colors.bg}
                                            color={colors.foreDarker}
                                            h={40}
                                            _style={{
                                                paddingLeft: 10,
                                                borderBottomColor: colors.foreDarker,
                                                borderBottomWidth: 1
                                            }}
                                            _activeStyle={{
                                                borderColor: colors.foreDarkerActive
                                            }}
                                            _active={{
                                                bg: colors.foreDarkerActive,
                                                color: colors.bg
                                            }}
                                            onPress={()=>setFoundUsername(x)}
                                            text={x}
                                            _text={{
                                                w: "100%", 
                                                fontSize: 17,
                                                color: colors.foreDarker,
                                                padding: 2
                                            }}
                                        />    
                                    )
                                    :
                                    null
                                }   
                                </ScrollView>
                        </Box>
                        {
                            chooseCustomFriend? 
                            <>
                                {
                                    friendValue ? null :
                                    <Text 
                                        paddingBottom={5} 
                                        color={colors.foreDarker}
                                        fontSize={22}
                                    
                                    >
                                        Add custom friend
                                    </Text>
                                }
                                <Input
                                    borderColor={colors.foreDarker}
                                    borderWidth={2}
                                    // variant="underlined"
                                    placeholder='Name'
                                    size="xl"
                                    color={colors.foreDarker}
                                    value={customFriendValue}
                                    onChangeText={setcustomFriendValue}
                                    InputLeftElement={
                                        <Icon
                                        as={<MaterialIcons name="people" />}
                                        size={5}
                                        ml="2"
                                        color={colors.foreDarker}
                                        />
                                    }
                                />
                                <Text 
                                    paddingTop={5} 
                                    color={colors.foreDarker}
                                    fontSize={15}
                                
                                >
                                    Note: as your friend does not have their own account, their scores can only be updated by 
                                    you or another connected friend in a given league.
                                </Text>
                            </>
                            :
                            null
                        }
                    </Box>
                </PresenceTransition>
                <PresenceTransition
                visible={submitShow}
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
                        backgroundColor: pressed ? colors.foreDarkerActive : colors.foreDarker,
                        justifyContent: "center",
                        padding: 3,
                        borderColor: pressed ? colors.foreDarkerActive : colors.foreDarker,
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
                                {
                                    chooseCustomFriend ?
                                    `Add ${customFriendValue}`
                                    :
                                    `Invite ${foundUserName}`
                                }
                            </Text>
                        )
                    }
                </Pressable>
            </PresenceTransition>
            </VStack>
        </Box>
    )
}

export default AddFriendScreen;