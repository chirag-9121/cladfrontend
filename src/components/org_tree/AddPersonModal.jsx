import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import PersonForm from "./PersonForm";

const AddPersonModal = ({
  handleFormSubmit,
  error,
  parents,
  selectedParent,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add a new person</DialogTitle>
        <DialogDescription />
      </DialogHeader>

      <PersonForm
        handleFormSubmit={handleFormSubmit}
        error={error}
        parents={parents}
        selectedParent={selectedParent}
      />
    </>
  );
};

export default AddPersonModal;
