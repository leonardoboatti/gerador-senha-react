import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {

    const getItem = async (key) => {
        try{
            const password = await AsyncStorage.getItem(key);
            return JSON.parse(password) || []; //se nao retornar nada, retorna um array vazio

        }catch(error){
            console.log("Erro ao buscar", error)
            return [];
        }
    }

    const saveItem = async (key, value) => {
        try{
            let password = await getItem(key);

            password.push(value);

            await AsyncStorage.setItem(key, JSON.stringify(password));

        }catch(error){  
            console.log("Erro ao salvar", error)
        }    
    }

    const removeItem = async (key, item) => {
        try{
            let password = await getItem(key);

            let myPassword = password.filter( (password) =>{
                return (password !== item);
            } );

            await AsyncStorage.setItem(key, JSON.stringify(myPassword));
            return myPassword;

        }catch(error){
            console.log("Erro ao deletar", error);
        }
    }

    return{
        getItem,
        saveItem,
        removeItem,
    }

}

export default useStorage;