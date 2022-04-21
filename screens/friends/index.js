import React from 'react';
import { Platform, ScrollView, Pressable } from "react-native"
import { 
    Avatar,
    Box, 
    Button,
    HStack,
    Icon,
    IconButton,
    Input,
    PresenceTransition,
    Text,
    VStack,
 } from 'native-base';
import { useAppColors } from '../../colors';
import { MaterialIcons } from "@expo/vector-icons";
import AppButton from '../../components/button';

const faker = require('@faker-js/faker');

export const NAMES = [...Array(15).keys()].map(x=>{
        const name = faker.name.findName()
        return({
            id: `id-${x}`,
            fullName: name,
            nameLower: name.toLowerCase(),
        })
    }
);

const FriendScreen = ({ navigation }) => {
    const colors = useAppColors();
    const [ friends, setFriends ] = React.useState([]);
    const [ friendValue, setFriendValue ] = React.useState('');
    const [ submitHidden, setSubmitHidden ] = React.useState(null);

    const onEndFriendEditing = () => {
        setSubmitHidden(false);
        setFriendValue("");
    }
    
    React.useEffect(()=>{
        if ( friends.length < 1 ){setFriends(NAMES)};
    })
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <IconButton
                variant="solid"
                bg={colors.fore}
                borderColor={colors.bg}
                borderRadius={50}
                borderWidth={1}
                _pressed={{
                    bg: colors.bg,
                    borderColor: colors.foreActive,
                    _icon: {
                        color: colors.fore
                    }
                }}
                size="md"
                onPress={()=>navigation.navigate("Add Friend")}
                icon={
                    <Icon
                        as={MaterialIcons}
                        size="7"
                        name="add"
                    />
                }
                _icon={{
                    color: colors.bg,
                }}
            />
          )
        });
      });
    return(
        <Box w="100%" h="100%" bg={colors.bg}>
            <VStack h="100%">               
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
                    <Box padding={4}>
                        <Box paddingBottom={5}>
                        <Input
                            borderColor={colors.fore}
                            borderWidth={2}
                            placeholder='Search'
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
                        </Box>
                        <ScrollView keyboardShouldPersistTaps="handled" style={{maxHeight: "89%"}}>
                        { friends.length < 1 ? null :
                            <VStack space={2} paddingTop={2} flex={1}>
                                { 
                                friends
                                    .filter(x=>x.nameLower.includes(friendValue.toLowerCase()))
                                    .map(item=>(
                                    <Box
                                        borderWidth="1"
                                        borderRadius={10}
                                        padding={5}
                                        flex={1}
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
                        </ScrollView>
                    </Box>
                </PresenceTransition>
          </VStack>
        </Box>
      )
  }

  export default FriendScreen;