// AdminContext.js
import React, { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <AdminContext.Provider value={{ isToggled, setIsToggled }}>
      {children}
    </AdminContext.Provider>
  );
};
