import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useStorage } from "../../hooks/useStorage";

export function Password(){

    const[listPassword, setListPassword] = useState([]);
    const focused = useIsFocused();
    const { getItem } = useStorage();

    useEffect(() => {
        async function loadPassword(){
            const password = await getItem("@pass")
            setListPassword(password);
        }

        loadPassword();
    }, [focused])

    return(
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    style={{flex:1, paddingTop: 14,}}
                    data={listPassword}
                    keyExtractor={(item) => String(item)}
                    renderItem={({item}) => <Text>{item}</Text>}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#392de9',
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    title:{
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    content:{
        flex:1,
        paddingLeft: 14,
        paddingRight: 14
    }
})