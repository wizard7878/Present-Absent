if (!window.W) {
    window.W = {
        setHooks: ({wappWillStart}) => {
            wappWillStart(() => {
            });
        },
        initializeAsync: () => Promise.resolve(),
        user: {getId: () => "Ab1",getInfo:()=>({id:'Ab3',firstname:'Peyman',lastname:'ShomalZadeh',profileImage:'image.jpg'})},
        wapp:{
            getWappId:function(){
                return 'myWappId'
            },
            getWisId:function(){
                return 'myWisIdx'
            },
            getAdmins:function(){
                return ['Ab3']
            }

        }
    };
}

