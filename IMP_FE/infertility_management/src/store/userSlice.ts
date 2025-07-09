import { User } from "../types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const storeUser = Cookie.get("user");
const initialState: User = storeUser ? JSON.parse(storeUser) : {
  userId: "",
    roleId: "",
    roleName: "",
    accessToken: "",
    refreshToken: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserRedux: (state, action: PayloadAction<User>) => {
            const user = action.payload;
            state.userId = user.userId;
            state.roleId = user.roleId;
            state.roleName = user.roleName;
            state.accessToken = user.accessToken;
            state.refreshToken = user.refreshToken;

            Cookie.set("user", JSON.stringify(state));
        },
        logout: (state) => {
            state.userId = "";
            state.roleId = "";
            state.roleName = "";
            state.accessToken = "";
            state.refreshToken = "";

            Cookie.remove("user");
        }
    }
});
export const { setUserRedux, logout } = userSlice.actions;
export default userSlice.reducer;