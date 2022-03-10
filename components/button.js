import React from 'react';
import { Pressable } from "react-native";
import { Center, Text } from 'native-base';
import { useAppColors } from '../colors';

const AppButton = (props) => {
    const colors = useAppColors();

    // def prop defaults
    const bg = props.bg || colors.bg;
    const color = props.color || colors.fore;
    const styleProps = props._style || {};
    const activeStyleProps = props._activeStyle|| styleProps;
    const active = props._active || props;
    const h = props.h || "100%";
    const w = props.w || "100%";
    const pressableProps = props.pressableProps || {};
    const text = props.text || null;
    const textProps = props._text || {};
    const leftIcon = props.leftIcon

    return(
        <Pressable
            style={({pressed})=>( pressed ? 
                {
                    backgroundColor: active.bg,
                    height: h,
                    width: w,
                    ...styleProps,
                    ...activeStyleProps
                }
                :
                {
                    backgroundColor: bg,
                    height: h,
                    width: w,
                    ...styleProps
                }
            )}
            onPress={props.onPress}
            {...pressableProps}
        >
            {
                ({pressed}) => (
                    <>
                        {leftIcon}
                        <Text 
                            {...textProps} 
                            color={pressed ? active.color : color}
                        >
                            {text}
                        </Text>
                    </>
                )
            }
        </Pressable>
    )
}

export default AppButton;