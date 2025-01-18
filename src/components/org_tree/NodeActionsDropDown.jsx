"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { addNode } from "../../api";
import { updateNode } from "../../api";
import { deleteNode } from "../../api";
import AddPersonModal from "./AddPersonModal";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { trimDoubleQuotes } from "../../lib/utils";
import EditPersonSheet from "./EditPersonSheet";
import { useToast } from "../../hooks/use-toast";
import { SquarePlus } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";

// Renders the actions for adding, updating and deleting a node
const NodeActionsDropDown = ({
  open,
  setOpen,
  style,
  treeData,
  selectedNode,
  fetchNodes,
}) => {
  const { toast } = useToast();

  // Diolog and error states for adding and updating node
  const [addPersonError, setAddPersonError] = useState(null);
  const [editPersonError, setEditPersonError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  // Action handlers
  const handleAddNode = async (nodeData) => {
    try {
      await addNode(nodeData);
      await fetchNodes();
      setIsAddModalOpen(false);
      setOpen(false);
      setAddPersonError(null);
    } catch (error) {
      setAddPersonError(trimDoubleQuotes(error.message));
    }
  };

  const handleUpdateNode = async (updatedNode) => {
    try {
      await updateNode(selectedNode.data.id, updatedNode);
      await fetchNodes();
      setIsEditSheetOpen(false);
      setOpen(false);
      setEditPersonError(null);
    } catch (error) {
      setEditPersonError(trimDoubleQuotes(error.message));
    }
  };

  const handleDeleteNode = async () => {
    try {
      await deleteNode(selectedNode.data.id);
      await fetchNodes();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Failed to delete person",
        description: "You can only delete leaf nodes.",
        className: "text-destructive border-destructive",
      });
    }
  };

  return (
    <div style={style}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger />
        <DropdownMenuContent className="flex flex-col">
          {/* Add node */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger className="w-full">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsAddModalOpen(true);
                }}
              >
                <SquarePlus className="mr-1" />
                Add person
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <AddPersonModal
                handleFormSubmit={handleAddNode}
                error={addPersonError}
                parents={treeData?.parents}
                selectedParent={selectedNode.data.id}
              />
            </DialogContent>
          </Dialog>

          {/* Update node */}
          <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
            <SheetTrigger className="w-full">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsEditSheetOpen(true);
                }}
              >
                <Pencil className="mr-1" />
                Edit details
              </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent>
              <EditPersonSheet
                handleFormSubmit={handleUpdateNode}
                error={editPersonError}
                parents={treeData?.parents}
                selectedParent={selectedNode.data.parent}
                selectedNode={selectedNode}
              />
            </SheetContent>
          </Sheet>

          {/* Delete node */}
          <DropdownMenuItem onSelect={handleDeleteNode} className="group ">
            <Trash className="group-hover:text-destructive mr-1" />
            <span className="group-hover:text-destructive">Delete person</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NodeActionsDropDown;
