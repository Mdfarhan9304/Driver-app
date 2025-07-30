import { createContext, useContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

const FontContext = createContext({
    fontsLoaded: false
});

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'General-Sans-Bold': require('../assets/fonts/GeneralSans-Bold.otf'),
                'General-Sans-Semibold': require('../assets/fonts/GeneralSans-Semibold.otf'),
                'General-Sans-Medium': require('../assets/fonts/GeneralSans-Medium.otf'),
                'General-Sans-Regular': require('../assets/fonts/GeneralSans-Regular.otf'),
                'Filson-Regular': require('../assets/fonts/FilsonProRegular-Regular.otf'),
                'Filson-Bold': require('../assets/fonts/FilsonProBold-Bold.otf'),
                'Filson-Pro-Bold': require('../assets/fonts/FilsonProBold-Bold.otf'),
                'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
                'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
                'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
            });
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#470A68" />
            </View>
        );
    }

    return (
        <FontContext.Provider value={{ fontsLoaded }}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => useContext(FontContext);
