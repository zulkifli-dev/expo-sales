import { createContext, useState, ReactNode, useEffect } from 'react';
import { ProfileType, UserDataType } from '../type/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../constant/url';

export interface IAuthContext {
    user: UserDataType;
    isLoading: boolean;
    setUser: (user: UserDataType) => void;
    setIsLoading: (loading: boolean) => void;
    getProfile: (token: string) => void;
    profile: ProfileType | null;
    logout: () => void;

}


const initialStateUser: UserDataType = {
    jwt: null,
}

export const AuthContext = createContext<IAuthContext>({
    user: initialStateUser,
    isLoading: false,
    setUser: () => { },
    setIsLoading: () => { },
    getProfile: () => { },
    profile: null,
    logout: () => { }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDataType>(initialStateUser);
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        loadDataUser();
    }, []);

    async function getProfile(token: string) {
        setIsLoading(true);
        const result = await axios.get(BASE_URL('/users/me?populate[salesman][populate]=*'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProfile(result?.data || null);
        setIsLoading(false);
    }

    function logout() {
        setUser(initialStateUser);
        setProfile(null);
        AsyncStorage.removeItem('userData');
    }

    async function loadDataUser() {
        setIsLoading(true);
        const res = await AsyncStorage.getItem('userData');

        const user: UserDataType = JSON.parse(res as string);
        if (!!user) {
            setUser(user);
            getProfile(user?.jwt ?? "");
        } else {
            setUser(initialStateUser);
        }
        setIsLoading(false);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                getProfile,
                profile,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};
