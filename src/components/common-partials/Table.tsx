import { FC } from "react";
import { IBlenderCheatSheetData } from "@data/model/blender-page/blender-cheat-sheet.model";

interface ITableProps {
  dataTable: IBlenderCheatSheetData;
  wrapClasses?: string;
}

const Table: FC<ITableProps> = ({ dataTable, wrapClasses }) => {
  const classNameTh =
    "border-b dark:border-slate-600 font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left";
  const classNameTd =
    "border-b border-slate-100 dark:border-slate-700 p-2 pl-8 text-slate-500 dark:text-slate-400";
  return (
    <div
      className={`${wrapClasses} not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25`}
    >
      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm overflow-hidden my-2">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                {dataTable.headTitle.map((value, index) => (
                  <th className={classNameTh} key={index}>
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {dataTable.bodyData.map((arrStr, index) => {
                return (
                  <tr key={index}>
                    {arrStr.map((value, indexN) => (
                      <td className={classNameTd} key={indexN}>
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
