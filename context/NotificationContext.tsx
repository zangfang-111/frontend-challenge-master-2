import React, { type ReactNode, useContext, useState, useMemo } from 'react';

type NotificationContextProps = {
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{
      isError: boolean;
      type?: string;
    }>
  >;
  errorMessage: {
    isError: boolean;
    type?: string;
  };
  setSuccessMessage: React.Dispatch<
    React.SetStateAction<{
      isSuccess: boolean;
      type?: string;
    }>
  >;
  successMessage: {
    isSuccess: boolean;
    type?: string;
  };
};
type NotificationProviderProps = {
  children: ReactNode;
};

const notificationContextDefaultValues: NotificationContextProps = {
  setErrorMessage(): void {
    throw new Error('Function not implemented.');
  },
  errorMessage: {
    isError: false,
    type: '',
  },
  setSuccessMessage(): void {
    throw new Error('Function not implemented.');
  },
  successMessage: {
    isSuccess: false,
    type: '',
  },
};

const NotificationContext = React.createContext<NotificationContextProps>(
  notificationContextDefaultValues,
);

export function useNotificationContext(): NotificationContextProps {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }: NotificationProviderProps): JSX.Element {
  const [errorMessage, setErrorMessage] = useState({ isError: false });
  const [successMessage, setSuccessMessage] = useState({ isSuccess: false });

  const memoNotificationContextValue = useMemo(() => {
    return {
      setErrorMessage,
      errorMessage,
      setSuccessMessage,
      successMessage,
    };
  }, [setErrorMessage, errorMessage, setSuccessMessage, successMessage]);

  return (
    <NotificationContext.Provider value={memoNotificationContextValue}>
      {children}
    </NotificationContext.Provider>
  );
}
