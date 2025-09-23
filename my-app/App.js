import { NavigationContainer } from "@react-navigation/native";
import MainStack from './scr/navigators/MainStack';

export default function App() {
        return (
                <NavigationContainer>
                        <MainStack />
                </NavigationContainer>
        );
}