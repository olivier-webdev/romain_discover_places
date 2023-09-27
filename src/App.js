import React, { Suspense } from "react";
import { Outlet } from 'react-router-dom';
import AuthProvider from "./components/providers/AuthProvider";
import CreatePropProvider from "./components/providers/CreatePropProvider";
import DataProvider from "./components/providers/DataProvider";


const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
      <Suspense>
        <CreatePropProvider>
        <Outlet />
        </CreatePropProvider>
      </Suspense>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
