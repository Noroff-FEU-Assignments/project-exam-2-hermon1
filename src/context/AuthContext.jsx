import React from "react";
import useLocalStorage from "../Hooks/useLocalStorage";


const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
	const [auth, setAuth] = useLocalStorage("user authentication", null);
	return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

// export const AuthProvider = (props) => {
// 	const [auth, setAuth] = useState(null);
// 	return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;
// };

// export default AuthContext;