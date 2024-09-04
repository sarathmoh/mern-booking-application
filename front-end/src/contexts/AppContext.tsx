import React, { useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
type AppContext = {
  showToast: (toastMessages: ToastMessage) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState<ToastMessage | undefined>(undefined);
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessages) => {
          setVisible(toastMessages);
        },
      }}
    >
      {" "}
      {visible && (
        <Toast
          message={visible.message}
          type={visible.type}
          onClose={() => {
            setVisible(undefined);
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
