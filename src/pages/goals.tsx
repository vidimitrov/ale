import GoalsPage from "../components/pages/GoalsPage";
import { withAuth } from "../components/auth/withAuth";
import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { Toaster } from "react-hot-toast";

const Goals = () => {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <Layout user={user}>
        <GoalsPage />
      </Layout>
    </>
  );
};

export default withAuth(Goals);
