import { BsChevronExpand } from "react-icons/bs";

const columns = [
  {
    key: "avatar",
    title: "Avatar",
    dataIndex: "avatar",
  },
  {
    key: "customerId",
    title: "Customer ID",
    icon: <BsChevronExpand />,
    dataIndex: "id",
  },
  {
    key: "name",
    title: "Customer Name",
    icon: <BsChevronExpand />,
    dataIndex: "name",
    style: { color: "#57BC90", textDecoration: "underline" },
  },
  {
    key: "email",
    title: "Email",
    icon: <BsChevronExpand />,
    dataIndex: "email",
  },
  {
    key: "edit",
    title: "Edit",
    dataIndex: "edit",
  },
  {
    key: "delete",
    title: "Delete",
    dataIndex: "delete",
  },
];

export { columns };
