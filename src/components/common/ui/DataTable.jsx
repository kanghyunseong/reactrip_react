import React from "react";
import {
  ActionButton,
  Badge,
  EmptyDesc,
  EmptyTitle,
  EmptyWrap,
  RowActions,
  Table,
  TableWrap,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "./CommonUI.styles";

const DataTable = ({
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
        <colgroup>
          {columns.map((c) => (
            <col
              key={c.key}
              style={{
                width:
                  c?.thStyle?.width !== undefined
                    ? typeof c.thStyle.width === "number"
                      ? `${c.thStyle.width}px`
                      : c.thStyle.width
                    : undefined,
              }}
            />
          ))}
          {actions?.length ? <col style={{ width: 180 }} /> : null}
        </colgroup>
        <Thead>
          <Tr>
            {columns.map((c) => (
              <Th key={c.key} style={c.thStyle}>
                {c.label}
              </Th>
            ))}
            {actions?.length ? <Th style={{ width: 180, textAlign: "center" }}>액션</Th> : null}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr key={rowKey(row)}>
              {columns.map((c) => (
                <Td key={c.key} style={c.tdStyle} title={c.title ? c.title(row) : undefined}>
                  {typeof c.render === "function" ? c.render(row, { Badge }) : row?.[c.key]}
                </Td>
              ))}
              {actions?.length ? (
                <Td style={{ textAlign: "right" }}>
                  <RowActions>
                    {actions.map((a) => {
                      const label = typeof a.label === "function" ? a.label(row) : a.label;
                      const variant = typeof a.variant === "function" ? a.variant(row) : a.variant;
                      return (
                        <ActionButton
                          key={a.key}
                          $variant={variant}
                          type="button"
                          onClick={() => a.onClick?.(row)}
                          disabled={a.disabled?.(row)}
                        >
                          {label}
                        </ActionButton>
                      );
                    })}
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

export default DataTable;

