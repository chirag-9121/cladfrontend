"use client";

import React, { useState, useEffect } from "react";
import { getAllNodes } from "./api";
import OrgTree from "./components/org_tree";
import Header from "./components/top_nav";
import { Toaster } from "./components/ui/toaster";
import NoDataFound from "./components/ui/NoDataFound";

// Storing the fetched data in state and sharing it to child components
function App() {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    setLoading(true);
    try {
      const data = await getAllNodes();
      setTreeData(data);
    } catch (error) {
      setTreeData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header treeData={treeData} fetchNodes={fetchNodes} />

      {loading ? null : treeData ? (
        <OrgTree treeData={treeData} fetchNodes={fetchNodes} />
      ) : (
        <NoDataFound />
      )}
      <Toaster />
    </>
  );
}

export default App;
