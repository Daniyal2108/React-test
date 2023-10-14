import classes from "../style.module.css";

const inputsProps = [
  {
    className: classes.formControl,
    input: {
      values: {
        type: "text",
        placeholder: "Customer Name",
        name: "name",
      },
    },
  },
  {
    className: classes.formControl,
    input: {
      values: {
        type: "text",
        placeholder: "Email",
        name: "email",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Upload Photo",
      properties: {
        htmlFor: "upload-photo",
      },
    },
    input: {
      className: classes.fileUpload,
      values: {
        accept: "image/*",
        type: "file",
        id: "upload-photo",
        name: "avatar",
      },
    },
  },
];

export { inputsProps };
