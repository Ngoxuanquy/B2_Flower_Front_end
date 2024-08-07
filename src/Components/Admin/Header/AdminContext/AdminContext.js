import React, { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  const setIsToggeSideBar = (value) => {
    setIsToggled(value);
  };

  return (
    <AdminContext.Provider value={{ isToggled, setIsToggeSideBar }}>
      {children}
    </AdminContext.Provider>
  );
};
