import { ProjectDocument, ProjectDocuments } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ProjectDocuments = {
    total: 0,
    documents: [],
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        add(state, action: PayloadAction<ProjectDocument[]>) {
            state.documents.splice(0, 0, ...action.payload);
            state.total += action.payload.length;
        },
        delete(state, action: PayloadAction<string>) {
            state.documents = state.documents.filter((project) => project.$id !== action.payload);
            state.total -= 1;
        },
        empty(state) {
            state = initialState;
        },
    },
});

export const { add: addProjects, delete: deleteProject, empty: emptyProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
