import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface TicketType {
  subject: string;
  openAt: string;
  department: string;
  status: string;
  message: string;
  id: string;
}

interface AuthContextType {
  isReady: boolean;
  isAuthenticated: boolean;
  user: User | null;
  tickets: TicketType[];
  login: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
  adminLogin: (email: string, password: string) => Promise<void>;
  check: () => Promise<boolean | undefined>;
}

interface User {
  name: string;
  auth_token: string;
  email: string;
  account_type:
    | "user"
    | "superadmin"
    | "admin_department1"
    | "admin_department2";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    async function initializeAuth() {
      const token = localStorage.getItem("auth_token");
      const accountType = localStorage.getItem("account_type");

      if (token && accountType) {
        if (accountType === "user") {
          const name = localStorage.getItem("user_name");
          const email = localStorage.getItem("user_email_address");

          setUser({
            name: name || "",
            email: email || "",
            account_type: "user",
            auth_token: token,
          });
          setIsAuthenticated(true);
        } else {
          const name = localStorage.getItem("admin_name");
          const email = localStorage.getItem("admin_email_address");
          setUser({
            name: name || "",
            email: email || "",
            account_type: accountType as any,
            auth_token: token,
          });
          setIsAuthenticated(true);
        }
      }

      setTickets([
        {
          subject: "Issue with login",
          openAt: "2024-07-01",
          department: "department1",
          status: "Open",
          message: "I am unable to login to my account",
          id: "1234",
        },
        {
          subject: "Unable to access account",
          openAt: "2024-07-02",
          department: "department1",
          status: "Closed",
          message: "I am unable to access my account",
          id: "1235",
        },
        {
          subject: "Billing discrepancy",
          openAt: "2024-07-03",
          department: "department2",
          status: "Pending",
          message: "I have been charged extra",
          id: "1236",
        },
        {
          subject: "Feature request",
          openAt: "2024-07-04",
          department: "department2",
          status: "In Progress",
          message: "I would like to request a new feature",
          id: "1237",
        },
      ]);
      setIsReady(true);
    }

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    localStorage.setItem(
      "auth_token",
      "lkmdfvklsndmflkvsdf;bskjdbkjsngbjksngfbkj"
    );
    localStorage.setItem("account_type", "user");
    localStorage.setItem("user_name", "Sumith Emmadi");
    localStorage.setItem("user_email_address", "sumithemmadi244@gmail.com");

    setUser({
      name: "Sumith Emmadi",
      email: "sumithemmadi244@gmail.com",
      account_type: "user",
      auth_token: "lkmdfvklsndmflkvsdf;bskjdbkjsngbjksngfbkj",
    });
    setIsAuthenticated(true);
  };

  const adminLogin = async (email: string, password: string) => {
    localStorage.setItem(
      "auth_token",
      "lkmdfvklsndmflkvsdf;bskjdbkjsngbjksngfbkj"
    );
    localStorage.setItem("account_type", "superadmin");
    localStorage.setItem("admin_name", "Sumith Emmadi");
    localStorage.setItem("admin_email_address", "");
    setUser({
      name: "Sumith Emmadi",
      email: "sumithemmadi244@gmail.com",
      account_type: "superadmin",
      auth_token: "lkmdfvklsndmflkvsdf;bskjdbkjsngbjksngfbkj",
    });
    setIsAuthenticated(true);
  };

  const forgotPassword = async (email: string) => {
    console.log("Forgot password");
  };

  const logout = () => {
    console.log("Logging out");
    // common
    localStorage.removeItem("auth_token");
    localStorage.removeItem("account_type");

    // users
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email_address");

    // admin
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_email_address");
    setUser(null);
    setIsAuthenticated(false);
  };

  const check = async () => {
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isReady,
        user,
        tickets,
        login,
        forgotPassword,
        adminLogin,
        logout,
        check,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
