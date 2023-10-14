import Container from "../../layout/Container";
import BodySection from "../../layout/BodySection";
import classes from "./style.module.css";
import Button from "../../UI/Button";
import { AiOutlinePlus } from "react-icons/ai";
import Table from "../../widgets/Table";
import { columns } from "./elements-data/table-data";
import Loader from "../../widgets/Loader";
import useOneTimeCall from "./useOneTimeCall";
import { useState } from "react";
import AddCustomer from "./actions/AddCustomer";
import EditCustomer from "./actions/EditCustomer";
import DeleteCustomer from "./actions/DeleteCustomer";
import { useDispatch } from "react-redux";
import { sorting } from "../../../store/slices/customer-slice";

const Home = (props) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({
    editId: "",
    isEdit: false,
  });

  const [deleteCustomer, setDeleteCustomer] = useState({
    deleteId: "",
    isDelete: false,
  });

  const [isModal, setIsModal] = useState(false);
  const [data, error, isLoading] = useOneTimeCall(
    (isTruthy, id) => {
      setEdit((prev) => ({ ...prev, editId: id, isEdit: isTruthy }));
    },
    (isTruthy, id) => {
      setDeleteCustomer((prev) => ({
        ...prev,
        deleteId: id,
        isDelete: isTruthy,
      }));
    }
  );

  const tableData = data?.map((d) => ({ ...d, id: `00${d?.id}` }));
  const tableColumns = columns.map((col) => ({
    ...col,
    onClick: () => {
      dispatch(sorting(col.dataIndex));
    },
  }));

  return (
    <BodySection className={classes.section} headerName="CUSTOMERS">
      {deleteCustomer.isDelete && (
        <DeleteCustomer
          onModal={(isModal) => {
            setDeleteCustomer((prev) => ({ ...prev, isDelete: isModal }));
          }}
          id={deleteCustomer.deleteId}
        />
      )}

      {edit.isEdit && (
        <EditCustomer
          onModal={(isModal) => {
            setEdit((prev) => ({ ...prev, isEdit: isModal }));
          }}
          id={edit.editId}
        />
      )}
      {isModal && <AddCustomer onModal={setIsModal} id={data?.length} />}
      <Container className={classes.rightBodyContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {error ? (
              <p>{error}</p>
            ) : (
              <>
                <Button
                  className={classes.addNewBtn}
                  svg={<AiOutlinePlus color="#FFFFFF" />}
                  text="ADD NEW CUSTOMER"
                  onClick={() => {
                    setIsModal(true);
                  }}
                />
                <div className={classes.tableContainer}>
                  <Table
                    className={classes.table}
                    columns={tableColumns}
                    data={tableData}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </BodySection>
  );
};

export default Home;
