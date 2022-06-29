import { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify';
import auth from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadUser() {
            const storagedUser = localStorage.getItem("usuarioLogado");
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
            else {
                localStorage.setItem("usuarioLogado", null);
            }
        }
        loadUser();
    }, []);

    async function signUp(email, password, nome) {
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        setUser(createdUser.user);
        localStorage.setItem("usuarioLogado", JSON.stringify(createdUser.user));
        return createdUser.user;
    }



    async function signIn(email, password) {
        const loggedInUser = await signInWithEmailAndPassword(auth, email, password);
        setUser(loggedInUser.user);
        localStorage.setItem("usuarioLogado", JSON.stringify(loggedInUser.user));
        toast.success('Bem-vindo de volta!!');
        return loggedInUser.user;
    }


    async function signOut() {
        localStorage.setItem("usuarioLogado", null);
        await auth.signOut()
    }

    function setLocalUser(data){
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signUp,
            signOut,
            signIn,
            loading,
            setUser,
            setLocalUser
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;