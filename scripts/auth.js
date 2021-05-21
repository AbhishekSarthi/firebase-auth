const email = 'abhi.sarthi3@gmail.com';
const pass = 'test@123';

const signUpbtn = document.querySelector('#signup');
const logoutbtn = document.querySelector('#logout');
const loginbtn = document.querySelector('#login');

db.collection('users')
    .get()
    .then((data) => {
        const snap = data.docs;
        console.log(snap);
        snap.forEach((ele) => {
            console.log(ele.data());
        });
    });

auth.onAuthStateChanged((user) => {
    console.log('On Auth State change', user);
});

const signUp = () => {
    auth.createUserWithEmailAndPassword(email, pass).then((cred) => {
        console.log('User Created', cred.user);
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

// logout();
