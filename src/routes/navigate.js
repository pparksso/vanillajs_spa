export const navigate = (to, isReplace = false) => {
    const changeHistory = new CustomEvent('historyChange',{
        detail:{
            to, isReplace
        }
    });
    dispatchEvent(changeHistory);
}
