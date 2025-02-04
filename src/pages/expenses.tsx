import React from "react";
import ExpensesPage from "../components/pages/ExpensesPage";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { withAuth } from "../components/auth/withAuth";

function Expenses() {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <Layout user={user}>
        <ExpensesPage />
      </Layout>
    </>
  );
}

export default withAuth(Expenses);
