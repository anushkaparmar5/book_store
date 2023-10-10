import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "users",
    initialState: { usersData: [], count: 0, message: { text: "", type: "" } },
    reducers: {
        userAdd: (state, action) => {
            state.usersData.push(action?.payload);
            state.count = state.usersData?.length;
            state.message = { text: "Users added.", type: "success" };
        },
        userDelete: (state, action) => {
            state.message = { text: "Users deleted.", type: "error" };
            const filterData = state.usersData.filter((user) => user?.id !== action.payload.id)
            state.count = filterData?.length;
            state.usersData = filterData;

        },

        userEdit: (state, action) => {
            console.log('action.payload :>> ', action.payload);
            const updateData = state.usersData.map((value) => value.id === action.payload.id ? action.payload : value)
            state.usersData = updateData
            state.count = updateData?.length
            // const findData = state.usersData.find((user) => user?.id === action.payload.id)

            state.message = { text: "Users updated.", type: "warning" };
        },
        resetMessage: (state, action) => {
            state.message = { text: "", type: "" };
        }
    }
})
export const { userAdd, userDelete, userEdit, resetMessage } = bookSlice.actions;
export default bookSlice.reducer;
