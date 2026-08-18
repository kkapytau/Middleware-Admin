import { Button, Drawer, Space } from "antd";
import { useTranslation } from "react-i18next";

import {
    type Continent,
    type ContinentFormValues,
    useCreateContinent,
    useUpdateContinent,
} from "@/entities/continent";

import { ContinentForm } from "../ContinentForm";
import styles from "./ContinentDrawer.module.scss";

interface ContinentDrawerProps {
    open: boolean;
    continent?: Continent;
    onClose: () => void;
}

export function ContinentDrawer({ open, continent, onClose }: ContinentDrawerProps) {
    const { t } = useTranslation("app");

    const createContinent = useCreateContinent();
    const updateContinent = useUpdateContinent();

    const isEditing = Boolean(continent);
    const isSubmitting = createContinent.isPending || updateContinent.isPending;

    const handleSubmit = async (values: ContinentFormValues) => {
        if (continent) {
            await updateContinent.mutateAsync({
                id: continent.id,
                values,
            });
        } else {
            await createContinent.mutateAsync(values);
        }

        onClose();
    };

    return (
        <Drawer
            open={open}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.continent"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.continent"),
                      })
            }
            onClose={onClose}
            destroyOnHidden
            footer={
                <div className={styles.footer}>
                    <Space>
                        <Button onClick={onClose} disabled={isSubmitting}>
                            {t("actions.cancel")}
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            form="continent-form"
                            loading={isSubmitting}
                        >
                            {t("actions.save")}
                        </Button>
                    </Space>
                </div>
            }
        >
            <ContinentForm defaultValues={continent} onSubmit={handleSubmit} />
        </Drawer>
    );
}
