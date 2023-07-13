import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        sidebar: false,
        modal: null,
        sidebarFilter: false,
        drawer: false,
        completeSearch: false,
        searchNoResult:false,
    },
    reducers: {
        //dashboard sidebar
        showSidebar: (state) => {
            state.sidebar = true;
        },
        hideSidebar: (state) => {
            state.sidebar = false;
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
        toggleFilterSidebar: (state) => {
            state.sidebarFilter = !state.sidebarFilter;
        },
        setModal: (state, action) => {
            state.modal = action?.payload;
        },
        setDrawer: (state, action) => {
            state.drawer = action?.payload;
        },
        setCompleteSearch: (state, action) => {
            state.completeSearch = action?.payload;
        },
        setSearchNoResult: (state, action) => {
            state.searchNoResult = action?.payload;
        },
    },
});

export const {
    showSidebar,
    hideSidebar,
    toggleSidebar,
    toggleFilterSidebar,
    setModal,
    setDrawer,
    setCompleteSearch,
    setSearchNoResult
} = appSlice.actions;

export default appSlice;
