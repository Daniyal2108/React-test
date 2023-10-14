import Label from "../UI/Label";
import Input from "../UI/Input";

const InputField = (props) => {
  return (
    <div className={props.className} style={props.style} id={props.id}>
      <Label {...props.label} />
      <Input {...props.input} />
      {props.input.error}
    </div>
  );
};

export default InputField;
