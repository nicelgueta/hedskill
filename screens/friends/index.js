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
    Modal,
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
    const [ modelOpen, setModelOpen ] = React.useState(false)
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
                bg={colors.bg}
                borderColor={colors.fore}
                borderWidth={1}
                _pressed={{
                    bg: colors.foreActive,
                    borderColor: colors.foreActive,
                    _icon: {
                        color: colors.bg
                    }
                }}
                size="md"
                onPress={()=>setModelOpen(!modelOpen)}
                icon={
                    <Icon
                        as={MaterialIcons}
                        size="7"
                        name="add"
                    />
                }
                _icon={{
                    color: colors.fore,

                }}
            />
          )
        });
      });
    console.log(modelOpen);
    return(
        <Box w="100%" h="100%" bg={colors.bg}>
            <Modal isOpen={modelOpen} onClose={() => setModelOpen(false)}>
            <Modal.Content 
                maxWidth="350" 
                bg={colors.bg} 
                borderColor={colors.fore}
                borderWidth={1}
            >

                <Modal.CloseButton 
                    _icon={{color: colors.fore}}
                />
                <Modal.Header 
                    _text={{color: colors.fore}}
                >
                    Add new friend
                </Modal.Header>
                <Modal.Body>
                    <VStack space={3}>
                    <HStack alignItems="center" justifyContent="space-between">
                        <Text w="35%" fontWeight="medium" paddingRight={2} color={colors.fore}>User name</Text>
                        <Input w="65%" flex={1} color="blueGray.400" />
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                        <Text w="35%" fontWeight="medium" paddingRight={2} color={colors.fore}>Name</Text>
                        <Input w="65%" flex={1} color="blueGray.400" />
                    </HStack>
                    </VStack>
                </Modal.Body>
                <Modal.Footer bg={colors.bg}>
                    <Button
                    flex="1"
                    bg={colors.fore}
                    color={colors.bg}
                    onPress={() => {
                        setModelOpen(false)
                    }}
                    >
                    Submit
                    </Button>
                </Modal.Footer>
                </Modal.Content>
            </Modal>
            <VStack h="100%">
                {modelOpen ? null :                    
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
                }
          </VStack>
        </Box>
      )
  }

  export default FriendScreen;