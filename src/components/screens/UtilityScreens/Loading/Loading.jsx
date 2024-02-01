import BiobeeButton from "../../components/ui/BiobeeButton";
import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";


const LoadingScreen = ({FalloutComponent}) =>
{


    const [dispLogout, setDispLogout] = useState(false);
    let isFocused = false;
    const waitSomeTime = async () =>
    {
        await new Promise(resolve => setTimeout(resolve, 7000));
        // console.log(isFocused)
        if (isFocused)
        {
            setDispLogout(true);
        }
    }
    useEffect(() =>
    {
        isFocused = true;
        waitSomeTime();
        return () =>
        {
            isFocused = false;
            // console.log("going out")
        }
    }, [])


    return (<View>

        {
            dispLogout ?
                <>
                    <Text style={{ alignSelf: "center", margin: "15%" }}>
                        {""}
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: 175,
                            alignItems: 'center',
                            backgroundColor: '#00a0ff',
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 15,
                            alignSelf: "center",
                        }}
                        onPress={async () => {}}>
                        <Text style={{ color: "white" }}><FalloutComponent/></Text>
                    </TouchableOpacity>
                </> : <Text style={{ alignSelf: "center", margin: "5%" }}>Loading...</Text>
        }
    </View>
    );
}

export default LoadingScreen;