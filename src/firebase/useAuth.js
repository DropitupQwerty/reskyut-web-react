// import React, {
//   useState,
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
// } from 'react';
// import { auth } from './firebase-config';
// import { signOut, onAuthStateChanged } from 'firebase/auth';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   const onLogin = () => {};

//   const logout = async () => {
//     await signOut(auth);
//   };

//   const value = useMemo(
//     () => ({
//       user,
//       onLogin,
//       logout,
//     }),
//     [user]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default function useAuth() {
//   return useContext(AuthContext);
// }
