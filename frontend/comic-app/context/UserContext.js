import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return setUser(null);

    try {
      const res = await axios.get("http://localhost:9999/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
