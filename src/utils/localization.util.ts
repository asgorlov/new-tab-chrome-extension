const getLanguage = () => {
    const nvg = window.navigator;
    return nvg ? nvg.language.substring(0, 2).toLowerCase() : "ru";
};

export default getLanguage;
