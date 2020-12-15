const firebase = require('firebase');
require ('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {
            apiKey: "AIzaSyCUgi-c3efrKVFq9eQTrne5bBoD6I8i4lI",
            authDomain: "whatsapp-clone-fda36.firebaseapp.com",
            projectId: "whatsapp-clone-fda36",
            storageBucket: "whatsapp-clone-fda36.appspot.com",
            messagingSenderId: "203761662385",
            appId: "1:203761662385:web:e4ef3612e4d0da3bb3e590"
          };

        this.init();
    }

    init(){

        if (!this._initialized) {

            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                timestampsInSnapshots: true

            });

            this._initialized = true;
        }
        
    }

    static db(){

        return firebase.firestore();
    }

    static hd(){

        return firebase.storage();
        
    }

    initAuth(){

        return new Promise((s,f) => {

            let provider =  new firebase.auth.GoogleAuthProvider();

            firebase.auth().signWithPopup(provider)
            .then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });

            }).catch(err => {
                f(err);
            });

        });
    }
}