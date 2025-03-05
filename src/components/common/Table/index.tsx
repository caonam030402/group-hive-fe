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
    render?: (data: any) => JSX.Element;
  }[];
  data: Iterable<unknown> | undefined;
  isLoading?: boolean;
}

export default function TableList({
  data,
  columns,
  isLoading,
  ...props
}: IProps) {
  return (
    <Table
      classNames={{
        base: "max-h-[calc(100vh-193px)] scroll",
      }}
      isHeaderSticky
      {...props}
      isStriped
      aria-label="table-list"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody isLoading={isLoading} className="border" items={data}>
        {(item: any) => (
          <TableRow className="border-b" key={item.key}>
            {(columnKey) => {
              const col = columns.find((column) => column.key === columnKey);
              return (
                <TableCell>
                  {col?.render
                    ? col?.render(item)
                    : getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
