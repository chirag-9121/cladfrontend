import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import PersonForm from "./PersonForm";

const EditPersonSheet = ({
  handleFormSubmit,
  error,
  parents,
  selectedParent,
  selectedNode,
}) => {
  return (
    <>
      <SheetHeader className="mb-3">
        <SheetTitle>Edit person details</SheetTitle>
        <SheetDescription />
      </SheetHeader>

      <PersonForm
        handleFormSubmit={handleFormSubmit}
        error={error}
        parents={parents}
        selectedParent={selectedParent}
        selectedNode={selectedNode}
      />
    </>
  );
};

export default EditPersonSheet;
