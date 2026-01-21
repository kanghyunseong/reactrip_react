import React from "react";
import {
  TableWrap,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  RowActions,
  ActionButton,
  EmptyWrap,
  EmptyTitle,
  EmptyDesc,
} from "./AdminUI.styles";

const AdminTable = ({
  columns = [],
  rows = [],
  rowKey = (row) => row?.id,
  actions = [],
  emptyTitle = "데이터가 없습니다",
  emptyDesc = "조건을 바꿔 다시 시도해보세요.",
}) => {
  if (!rows?.length) {
    return (
      <EmptyWrap>
        <EmptyTitle>{emptyTitle}</EmptyTitle>
        <EmptyDesc>{emptyDesc}</EmptyDesc>
      </EmptyWrap>
    );
  }

  return (
    <TableWrap>
      <Table>
        <Thead>
          <Tr>
            {columns.map((c) => (
              <Th key={c.key} style={c.thStyle}>
                {c.label}
              </Th>
            ))}
            {actions?.length ? <Th style={{ width: 160 }}>액션</Th> : null}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr key={rowKey(row)}>
              {columns.map((c) => (
                <Td key={c.key} style={c.tdStyle} title={c.title ? c.title(row) : undefined}>
                  {typeof c.render === "function" ? c.render(row) : row?.[c.key]}
                </Td>
              ))}
              {actions?.length ? (
                <Td>
                  <RowActions>
                    {actions.map((a) => (
                      <ActionButton
                        key={a.key}
                        $variant={a.variant}
                        type="button"
                        onClick={() => a.onClick?.(row)}
                        disabled={a.disabled?.(row)}
                      >
                        {a.label}
                      </ActionButton>
                    ))}
                  </RowActions>
                </Td>
              ) : null}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableWrap>
  );
};

export default AdminTable;

