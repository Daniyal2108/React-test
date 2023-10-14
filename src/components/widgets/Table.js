import classes from "./Table.module.css";

const Table = (props) => {
  const rows = props?.data?.map((dataObject, index) => ({
    ...dataObject,
    sno: index,
  }));

  return (
    <table border="0" className={`${classes.table} ${props.className}`}>
      <thead>
        <tr>
          {props?.columns?.map((titleData) => (
            <th colSpan={titleData.colSpan} key={titleData.key}>
              <span onClick={titleData.onClick}>
                {titleData.title}
                {titleData.icon}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => (
          <tr key={row.sno}>
            {props?.columns.map((col) => (
              <td key={col.key} colSpan={col.colSpan} style={col.style}>
                {row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
