import { Table, type TableProps } from "antd";

import styles from "./EntityTable.module.scss";

export function EntityTable<T extends object>({ className, pagination, ...props }: TableProps<T>) {
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
                              ...pagination,
                          }
                }
            />
        </div>
    );
}
