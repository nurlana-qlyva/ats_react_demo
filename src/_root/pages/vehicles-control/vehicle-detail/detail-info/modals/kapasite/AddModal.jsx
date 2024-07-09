import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { AddDriverService } from "../../../../api/services/sistem-tanimlari/surucu_services";
import TextInput from "../../../../../../components/form/inputs/TextInput"

const AddModal = ({ setStatus }) => {
    const [openModal, setopenModal] = useState(false);

    const defaultValues = {};
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset } = methods;

    const onSubmit = handleSubmit((values) => {
        const body = {};

        AddDriverService(body).then((res) => {
            if (res.data.statusCode === 200) {
                setStatus(true);
                reset(defaultValues);
                setopenModal(false);
            }
        });
        setStatus(false);
    });

    const footer = [
        <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
            {t("kaydet")}
        </Button>,
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => {
                setopenModal(false);
                reset(defaultValues);
            }}
        >
            {t("iptal")}
        </Button>,
    ];

    return (
        <>
            <Button
                className="btn primary-btn"
                onClick={() => setopenModal(true)}
            >
                <PlusOutlined /> {t("ekle")}
            </Button>
            <Modal
                title={t("yeniKapasiteGirisi")}
                open={openModal}
                onCancel={() => setopenModal(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <FormProvider {...methods}>
                    <form>
                        <div className="flex flex-col gap-1">
                            <label>{t("aciklama")}</label>
                            <TextInput name="aciklama" />
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};

AddModal.propTypes = {
    setStatus: PropTypes.func,
};

export default AddModal;
