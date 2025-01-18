"use client";

import { useState } from "react";
import { addNode } from "../../api";
import { trimDoubleQuotes } from "../../lib/utils";
import AddPersonModal from "../org_tree/AddPersonModal";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { SquarePlus } from "lucide-react";

// Triggers a modal to add a new person
const AddPersonBtn = ({ treeData, fetchNodes }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleAddNode = async (nodeData) => {
    try {
      await addNode(nodeData);
      await fetchNodes();
      setOpen(false);
      setError(null);
    } catch (error) {
      setError(trimDoubleQuotes(error.message));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-2 py-0 rounded-md font-normal text-sm hover:bg-primary"
          variant="ghost"
        >
          <SquarePlus />
          <span>Add person</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <AddPersonModal
          handleFormSubmit={handleAddNode}
          error={error}
          parents={treeData?.parents}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPersonBtn;
