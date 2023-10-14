import Modal from "../../../widgets/Modal";
import reactDom from "react-dom";
import InputField from "../../../widgets/InputField";
import { inputsProps } from "../elements-data/input-data";
import classes from "../style.module.css";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../../UI/Button";
import { useValidate } from "../../../../hooks/use-validate";
import { addCustomer } from "../../../../store/slices/customer-slice";
import { useDispatch } from "react-redux";

const AddCustomer = (props) => {
  const dispatch = useDispatch();
  const { inputHandler, submit, inputs, inputsErr } = useValidate(
    {
      name: "",
      email: "",
      avatar: "",
    },
    true,
    (data) => {
      if (!data?.name || !data?.email || !data?.avatar?.length > 0) return;
      const userData = {
        ...data,
        first_name: data?.name?.split(" ")[0]
          ? data?.name?.split(" ")[0]
          : data?.name,
        last_name: data?.name?.split(" ")[1]
          ? data?.name?.split(" ")[1]
          : data?.name,
        avatar: URL.createObjectURL(data?.avatar[0]),
        id: props?.id + 1,
      };
      dispatch(addCustomer(userData));
      inputs.name = "";
      inputs.email = "";
      inputs.avatar = "";
      props?.onModal(false);
    }
  );

  const inputsAttr = inputsProps?.map((prop) => ({
    ...prop,
    input: {
      ...prop.input,
      error: prop.input.values.type === "file" && (
        <p className={classes.inputError}>
          {inputsErr[prop.input.values.name]}
        </p>
      ),
      className: ` ${prop.input.className} ${
        prop.input.values.type !== "file" &&
        inputsErr[prop.input.values.name] &&
        classes.inputErr
      }`,
      values: {
        ...prop.input.values,
        value:
          prop.input.values.type !== "file"
            ? inputs[prop.input.values.name]
            : "",
        onChange: inputHandler,
      },
    },
  }));

  const modalHelper = reactDom.createPortal(
    <Modal className={classes.modal} backdropClass={classes.backdrop}>
      <header>
        <AiOutlineClose
          onClick={() => {
            props?.onModal(false);
          }}
        />
        <h2>Add New Customer</h2>
      </header>

      <form onSubmit={submit}>
        {inputsAttr?.map((prop, _) => (
          <InputField key={_} {...prop} />
        ))}
        <p className={classes.fileDetail}>
          {inputs?.avatar[0] && inputs?.avatar[0]?.name}
        </p>

        <Button text="ADD CUSTOMER" />
      </form>
    </Modal>,
    document.getElementById("overlay")
  );

  return modalHelper;
};

export default AddCustomer;
