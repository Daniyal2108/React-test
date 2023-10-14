import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../../store/slices/customer-slice";
import useFetch from "../../../hooks/use-fetch";
import { useMemo, useEffect } from "react";
import Button from "../../UI/Button";
import Image from "../../UI/Image";
import classes from "./style.module.css";

const useOneTimeCall = (onEdit = () => {}, onDelete = () => {}) => {
  const dispatch = useDispatch();
  const { customers: getAllCustomers, isApiTruthy } = useSelector(
    (state) => state.customer
  );
  const [{ response, error, isLoading }, fetchCustomers] =
    useFetch("users?page=1");

  const customers = useMemo(() => ({ ...response }), [response]);

  useEffect(() => {
    if (isApiTruthy) {
      fetchCustomers();
    }
  }, [fetchCustomers, isApiTruthy]);

  useEffect(() => {
    const oneTimeApiFetch = setInterval(() => {
      if (customers?.data?.length > 0 && isApiTruthy) {
        dispatch(getCustomers(customers?.data));
        clearInterval(oneTimeApiFetch);
      }
    }, 1000);

    return () => clearInterval(oneTimeApiFetch);
  }, [customers, isApiTruthy, dispatch]);

  const tableData = getAllCustomers?.map((itm) => {
    return {
      ...itm,
      id: itm?.id,
      name: `${itm?.first_name && itm?.first_name} ${
        itm?.last_name && itm?.last_name
      }`,
      edit: (
        <Button
          text="Edit"
          onClick={() => {
            onEdit(true, itm?.id);
          }}
          className={classes.editBtn}
        />
      ),
      delete: (
        <Button
          text="Delete"
          onClick={() => {
            onDelete(true, itm?.id);
          }}
          className={classes.dltBtn}
        />
      ),
      avatar: <Image src={itm?.avatar} alt="customer-avatar" />,
    };
  });

  return [tableData, error, isLoading];
};

export default useOneTimeCall;

// typeof itm?.avatar !== "string"
// ? URL.createObjectURL(itm?.avatar)
// :
