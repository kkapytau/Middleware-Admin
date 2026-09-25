import { Table, type TableProps } from "antd";
import * as React from "react";

import { AUTOMATION_ID } from "@/shared/lib";

import styles from "./EntityTable.module.scss";

interface EntityTableProps<T extends object> extends TableProps<T> {
    entityName: string;
}

export function EntityTable<T extends object>({
    entityName,
    className,
    pagination,
    ...props
}: EntityTableProps<T>) {
    return (
        <div className={styles.container}>
            <Table<T>
                {...props}
                className={className ?? styles.table}
                pagination={
                    pagination === false
                        ? false
                        : {
                              pageSize: 10,
                              showSizeChanger: false,
                              itemRender: (page, type, originalElement) => {
                                  if (!React.isValidElement(originalElement)) {
                                      return originalElement;
                                  }

                                  if (type === "prev") {
                                      return React.cloneElement(originalElement, {
                                          // @ts-expect-error -- Ant Design types do not allow custom data attributes here
                                          "data-testid": AUTOMATION_ID.paginationPrev(entityName),
                                      });
                                  }

                                  if (type === "next") {
                                      return React.cloneElement(originalElement, {
                                          // @ts-expect-error -- Ant Design types do not allow custom data attributes here
                                          "data-testid": AUTOMATION_ID.paginationNext(entityName),
                                      });
                                  }

                                  if (type === "page") {
                                      return React.cloneElement(originalElement, {
                                          // @ts-expect-error -- Ant Design types do not allow custom data attributes here
                                          "data-testid": AUTOMATION_ID.paginationPage(
                                              entityName,
                                              page,
                                          ),
                                      });
                                  }

                                  return originalElement;
                              },
                              ...pagination,
                          }
                }
            />
        </div>
    );
}
