import * as React from "react";
import {FC} from "react";
import TableBody from "@mui/material/TableBody";

import {Data, TypeRow} from "./index.tsx";
import EnhancedTableRowPost from "../../view/posts/EnhancedTableRowPost.tsx";
import EnhancedTableRowAlbums from "../../view/albums/EnhancedTableRowAlbums.tsx";
import EnhancedTableRowTodos from "../../view/todos/EnhancedTableRowTodos.tsx";

type TableBodyType = {
    visibleRows: Data[]
    isSelected: (id: number) => boolean | undefined
    handleClick: (_: React.MouseEvent<unknown>, id: number) => void
    typeRow: TypeRow
}
const EnhancedTableBody: FC<TableBodyType> = ({visibleRows, isSelected, handleClick, typeRow}) => {

    const date=new Date().toString()
    return <TableBody key={date}>
        {visibleRows.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
                <React.Fragment key={row.id}>
                    {typeRow === 'posts'
                        ? <EnhancedTableRowPost data={row}
                                                handleClick={handleClick}
                                                isItemSelected={isItemSelected}
                                                labelId={labelId}
                                                key={row.id+typeRow}
                        />
                        : typeRow === 'albums'
                            ? <EnhancedTableRowAlbums row={row}
                                                      handleClick={handleClick}
                                                      isItemSelected={isItemSelected}
                                                      labelId={labelId}
                                                      key={row.id+typeRow}
                            />
                            : <EnhancedTableRowTodos data={row}
                                                     handleClick={handleClick}
                                                     isItemSelected={isItemSelected}
                                                     labelId={labelId}
                                                     key={row.id+typeRow}/>
                    }
                </React.Fragment>
            );
        })}
    </TableBody>
};

export default EnhancedTableBody;