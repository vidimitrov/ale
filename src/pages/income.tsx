import React from "react";
import IncomePage from "../components/pages/IncomePage";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { withAuth } from "../components/auth/withAuth";

function Income() {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <Layout user={user}>
        <IncomePage />
      </Layout>
    </>
  );
}

export default withAuth(Income);
