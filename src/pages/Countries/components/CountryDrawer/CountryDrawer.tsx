import { Button, Drawer, Space } from "antd";
import { useTranslation } from "react-i18next";

import {
    type CountryDetail,
    type CountryFormValues,
    useCreateCountry,
    useUpdateCountry,
} from "@/entities/country";

import { CountryForm } from "../CountryForm";
import styles from "./CountryDrawer.module.scss";

interface CountryDrawerProps {
    open: boolean;
    country?: CountryDetail;
    onClose: () => void;
}

export function CountryDrawer({ open, country, onClose }: CountryDrawerProps) {
    const { t } = useTranslation("app");

    const createCountry = useCreateCountry();
    const updateCountry = useUpdateCountry();

    const isEditing = Boolean(country);
    const isSubmitting = createCountry.isPending || updateCountry.isPending;

    const handleSubmit = async (values: CountryFormValues) => {
        if (country) {
            await updateCountry.mutateAsync({
                id: country.id,
                values,
            });
        } else {
            await createCountry.mutateAsync(values);
        }

        onClose();
    };

    return (
        <Drawer
            open={open}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.countries"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.countries"),
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
                            form="country-form"
                            loading={isSubmitting}
                        >
                            {t("actions.save")}
                        </Button>
                    </Space>
                </div>
            }
        >
            <CountryForm
                defaultValues={
                    country
                        ? {
                              code: country.code,
                              name: country.name,
                              continentId: country.continent.id,
                              translations: country.translations,
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </Drawer>
    );
}
