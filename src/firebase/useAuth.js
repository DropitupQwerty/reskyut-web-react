// import React, {
//   useState,
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
// } from 'react';
// import { auth } from './firebase-config';
// import { signOut } from 'firebase/auth';

// export const AuthContext = createContext();

// export const AuthProviderder = ({ children }) => {
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loadingInitial, setLoadingInitial] = useState(null);
//   const [loading, setLoading] = useState(false);

//   function onAuthStateChanged(user) {
//     if (user) {
//       setUser(user);
//     } else {
//       setUser(null);
//     }
//     setLoadingInitial(false);
//   }
//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   const onLogin = () => {
//     cllas;
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   const memoedValue = useMemo(() => ({
//     user,
//     loading,
//     error,
//     onLogin,
//     logout,
//   }));

//   return <AuthContext.Provider>{children}</AuthContext.Provider>;
// };

// export default function useAuth() {
//   return useContext(AuthContext);
// }
