const config = {
    'secret': 'SeCrEtKeYfOrHaShInG',
    //'mongodbUri': 'mongodb://siri:hwang12!@ds135519.mlab.com:35519/portfolio',
    'mongodbUri': 'mongodb://localhost/codelab',

    facebook: {
        'clientID': '1821274114796832',
        'clientSecret': '7dd265a56e3b91caaffbabfb4fa75c83',
        'callbackURL': '/auth/facebook/callback'
    },

    google: {
        clientID: '852161790312-qkaae5gb58291s15hfmlvnm7vhboodao.apps.googleusercontent.com',
        clientSecret: 'i9nW8vMRAW2smZ_Swwh9QwFf',
        callbackURL: '/auth/google/callback'
    }

}

export default config;
