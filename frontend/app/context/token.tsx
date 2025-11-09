import { create } from "zustand";

interface tokenState {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;

    state: "local" | "session";
    accessToken: string | undefined;
    refreshToken: string | undefined;
    setTokens: (tokens: { accessToken: string, refreshToken: string, state:"local"|"session" }) => void;
    clearTokens: () => void;

    initializeToken: () => void;
    isInitialized: boolean;

}

const saveToken = ({accessToken, refreshToken, state}: {accessToken: string, refreshToken: string, state: "local" | "session"}) => {
    localStorage.clear()
    sessionStorage.clear()

    const storage = state === "local" ? localStorage : sessionStorage;
    storage.setItem("accessToken", accessToken);
    storage.setItem("refreshToken", refreshToken);
}

const useTokenState = create<tokenState>()((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (loggedIn) => ( set({ isLoggedIn:  loggedIn}) ),

    state: "session",
    isInitialized: false,
    accessToken: undefined,
    refreshToken: undefined,

    setTokens: ({ accessToken, refreshToken, state }) => {
        const newState = state ?? useTokenState.getState().state;
        set(() => ({accessToken:accessToken, refreshToken:refreshToken, state:newState}));
        saveToken({accessToken, refreshToken, state:newState});
    },

    initializeToken: () => {
        let storedAccessToken = localStorage.getItem("accessToken");
        let storedRefreshToken = localStorage.getItem("refreshToken");
        let storedState: "local" | "session" = "local"
        
        if (!storedAccessToken || !storedRefreshToken){
            storedAccessToken = sessionStorage.getItem("access_token");
            storedRefreshToken = sessionStorage.getItem("refresh_token");
            storedState = "session"
        }

        if (storedAccessToken && storedRefreshToken){
            set({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                state: storedState,
                isInitialized: true
            })
        }
        else{
            set({
                isInitialized: true
            })
        }
        
    },

    clearTokens: () => {
        localStorage.clear();
        sessionStorage.clear();
        set({
            accessToken: undefined,
            refreshToken: undefined,
            isInitialized: true,
            state: "session",
        })
    }
}));

export default useTokenState;