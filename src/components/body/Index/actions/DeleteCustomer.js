import Modal from "../../../widgets/Modal";
import reactDom from "react-dom";
import classes from "../style.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { deleteCustomer } from "../../../../store/slices/customer-slice";
import { useDispatch } from "react-redux";
import { BsTrash3 } from "react-icons/bs";

const DeleteCustomer = (props) => {
  const dispatch = useDispatch();

  const Button = (props) => {
    return (
      <button
        id={props.id}
        className={props.className}
        style={props.style}
        onClick={props.onClick}
        type={props.type}
      >
        {props.svg && props.svg}
        {props.btnImg && <img src={props.btnImg} alt={props.btnAlt} />}
        {props.text}
      </button>
    );
  };

  const btns = [
    {
      className: classes.cancel,
      onClick: () => {
        props.onModal(false);
      },
      text: "CANCEL",
    },
    {
      className: classes.delete,
      onClick: () => {
        dispatch(deleteCustomer(props?.id));
        props.onModal(false);
      },
      text: "DELETE",
    },
  ];
  const modalHelper = reactDom.createPortal(
    <Modal className={classes.modal} backdropClass={classes.backdrop}>
      <header style={{ background: "transparent" }}>
        <AiOutlineClose
          color="#000000"
          onClick={() => {
            props?.onModal(false);
          }}
        />
      </header>
      <div className={classes.trash}>
        <BsTrash3 />
      </div>
      <div className={classes.promptTxt}>
        <h3>Are you sure?</h3>
        <p>
          Do you really want to delete this customer? This process can not be
          undone.
        </p>
      </div>

      <div className={classes.actionsBtn}>
        {btns.map((btn, _) => (
          <Button key={_} {...btn} />
        ))}
      </div>
    </Modal>,
    document.getElementById("overlay")
  );

  return modalHelper;
};

export default DeleteCustomer;
