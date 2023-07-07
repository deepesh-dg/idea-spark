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
        update(state, action: PayloadAction<ProjectDocument>) {
            state.documents = state.documents.map((project) =>
                project.$id === action.payload.$id ? action.payload : project
            );
        },
        set(state, action: PayloadAction<{ total: number; documents: ProjectDocument[] }>) {
            state.documents = action.payload.documents;
            state.total = action.payload.total;
        },
    },
});

export const {
    add: addProjects,
    delete: deleteProject,
    update: updateProject,
    empty: emptyProjects,
    set: setProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
