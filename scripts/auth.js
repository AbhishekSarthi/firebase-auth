const email = 'abhi.sarthi1@gmail.com';
const pass = 'test@123';

const signUpbtn = document.querySelector('#signup');
const logoutbtn = document.querySelector('#logout');
const loginbtn = document.querySelector('#login');
const databtn = document.querySelector('#databtn');
let data;
// db.collection('users')
//     .get()
//     .then((data) => {
//         const snap = data.docs;
//         // console.log(snap);
//         snap.forEach((ele) => {
//             console.log(ele.data());
//         });
//     });

// db.collection('guides')
//     .get()
//     .then((data) => {
//         const snap = data.docs;
//         // console.log(snap);
//         snap.forEach((ele) => {
//             console.log(ele.data());
//         });
//     });

auth.onAuthStateChanged((user) => {
    console.log('On Auth State change', user);
    if (user !== null) {
        // instead of .get().then() we can use onSnapShot which will change database in realtime and reflect changes on UI

        db.collection('users').onSnapshot(
            (data) => {
                const snap = data.docs;
                console.log('users', snap);
                // snap.forEach((ele) => {
                //     console.log(ele.data());
                // });
            },
            (err) => {
                console.log(err.message);
            }
        );
        // .catch((err) => {
        //     console.log(err.message);
        // });

        db.collection('guides').onSnapshot(
            (data) => {
                const snap = data.docs;
                console.log('guides', snap);
                // snap.forEach((ele) => {
                //     console.log(ele.data());
                // });
            },
            (err) => {
                console.log(err.message);
            }
        );
        // .catch((err) => {
        //     console.log(err.message);
        // });
    }
});

const addDataToDB = () => {
    db.collection('guides')
        .add({
            title: 'hello',
            content: 'HELLo Mf',
        })
        .then(() => {
            console.log('Data Added to guides collection');
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const signUp = () => {
    auth.createUserWithEmailAndPassword(email, pass)
        .then((cred) => {
            data = cred.user;
            return db.collection('authdata').doc(cred.user.uid).set({
                bio: 'gang gang mf',
            });
        })
        .then(() => {
            console.log('User Created', data);
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const logout = () => {
    auth.signOut().then(() => {
        console.log('user Logged Out');
    });
};

const login = () => {
    auth.signInWithEmailAndPassword(email, pass).then((cred) => {
        console.log('User Logged in', cred.user);
    });
};

signUpbtn.addEventListener('click', () => signUp());

logoutbtn.addEventListener('click', () => logout());

loginbtn.addEventListener('click', () => login());

databtn.addEventListener('click', () => addDataToDB());
// logout();
