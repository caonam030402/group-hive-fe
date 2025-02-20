import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  type TableProps,
  TableRow,
} from "@heroui/react";

interface IProps extends TableProps {
  columns: {
    key: string;
    label: string;
  }[];
  data: Iterable<unknown> | undefined;
}

export default function TableList({ data, columns, ...props }: IProps) {
  return (
    <Table {...props} isStriped aria-label="table-list">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item: any) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
