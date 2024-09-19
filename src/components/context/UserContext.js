import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [id, setId] = useState(null);

    const updateUserId = (id) => {
       setId(id);
    };

    return (
        <UserContext.Provider value={{id, updateUserId}}>
            {children}
        </UserContext.Provider>
    );
};