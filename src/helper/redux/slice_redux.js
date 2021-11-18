
export const finishedLoadingSuccess = (state) => {
    state.loading = false;
    state.hasErrors = false;
};

export const finishedLoadingFailure = (state) => {
    state.loading = false;
    state.hasErrors = true;
};

export const isLoadingRequest = (state) => {
    state.loading = true;
    state.hasErrors = false;
};