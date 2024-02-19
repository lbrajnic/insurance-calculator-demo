import { MdDeleteForever } from "react-icons/md";

const DeleteCell = ({ row, table }) => {
  const meta = table.options.meta;
  const id = row.original.id;

  const handleDeleteRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    meta.deleteRow(id);
  };

  return (
    <div>
      <button
        onClick={(e) => handleDeleteRow(e)}
        name="remove"
        title="Delete"
        className="bg-red-500 hover:bg-red-600 text-white rounded-full px-1 py-1"
      >
        <MdDeleteForever />
      </button>
    </div>
  );
};

export default DeleteCell;
