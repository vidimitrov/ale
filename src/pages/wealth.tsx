import WealthPage from "../components/pages/WealthPage";
import { withAuth } from "../components/auth/withAuth";
import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { Toaster } from "react-hot-toast";

const Wealth = () => {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <Layout user={user}>
        <WealthPage />
      </Layout>
    </>
  );
};

export default withAuth(Wealth);
