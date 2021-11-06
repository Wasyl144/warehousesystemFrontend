const Can = {
    install: (app) => {
        app.config.globalProperties.can = (action) => {
            let permissions = app.config.globalProperties.$store.state.profile.permissions;
            return permissions?.includes(action);
        };
        app.config.globalProperties.canAny = (actions) => {
            let result = false;
            let permissions = app.config.globalProperties.$store.state.profile.permissions;
            actions.forEach(function (single_action) {
                if (permissions.includes(single_action)) {
                    console.log('tak', single_action);
                    result = true;
                }
            });
            return result;
        };
        app.config.globalProperties.canAll = (actions) => {
            let result = true;
            let permissions = app.config.globalProperties.$store.state.profile.permissions;

            actions.forEach(function (single_action) {
                if(!permissions.includes(single_action)){
                    result = false;
                }
            });
            return result;
        }
        setInterval(() => {
            app.config.globalProperties.$store.dispatch('profile/getPermissions')
        }, 30000)
    }
};

export default Can;