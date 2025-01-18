"use client";

import { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import "./custom-tree.css";
import NodeActionsDropDown from "./NodeActionsDropDown";

const OrgTree = ({ treeData, fetchNodes }) => {
  const [initialAxes, setInitialAxes] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (nodeData, evt) => {
    setSelectedNode(nodeData);
    setDropdownPosition({ x: evt.clientX, y: evt.clientY });
    setDropdownOpen(true);
  };

  // To align the tree in the center of the page, as default is (0,0)
  useEffect(() => {
    if (!treeData) return;
    const treeWrapper = document.getElementById("treeWrapper");
    const dimensions = treeWrapper.getBoundingClientRect();
    setInitialAxes({
      x: dimensions.width / 2,
      y: 50,
    });
  }, [treeData]);

  return (
    <main className="w-full h-[90vh]">
      <div
        id="treeWrapper"
        className="flex items-center justify-center w-full h-full"
      >
        {initialAxes && (
          <Tree
            data={treeData?.orgTree}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            orientation="vertical"
            collapsible={false}
            pathFunc={"straight"}
            translate={initialAxes}
            onNodeClick={handleNodeClick}
          />
        )}
      </div>

      {/* Action Buttons Dropdown */}
      {dropdownOpen && (
        <NodeActionsDropDown
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          style={{
            position: "absolute",
            top: dropdownPosition.y,
            left: dropdownPosition.x,
            zIndex: 10,
          }}
          treeData={treeData}
          selectedNode={selectedNode}
          fetchNodes={fetchNodes}
        />
      )}
    </main>
  );
};

export default OrgTree;
