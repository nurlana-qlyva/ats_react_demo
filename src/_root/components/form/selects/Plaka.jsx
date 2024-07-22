import { useContext, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetFuelCardContentByIdService } from "../../../../api/services/vehicles/yakit/services";

const Plaka = ({ name, codeName, required }) => {
  const { plaka, setData } = useContext(PlakaContext);
  const { setValue, control, watch } = useFormContext();

  useEffect(() => {
    if (plaka.length === 1) {
      GetFuelCardContentByIdService(plaka[0].id).then((res) => {
        setData(res.data);
      });
    }
  }, [plaka]);

  const handleChange = (e) => {
    GetFuelCardContentByIdService(e).then((res) => setData(res.data));
  };

  return (
    <Controller
      name={codeName ? codeName : "plaka"}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field}
            showSearch
            allowClear
            optionFilterProp="children"
            className={fieldState.error ? "input-error" : ""}
            value={watch("plaka") || watch(codeName)}
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label.toLowerCase() ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={plaka.map((item) => ({
              label: item.plaka,
              value: item.id,
            }))}
            onChange={(e) => {
              field.onChange(e);
              handleChange(e);
              if (e === undefined) {
                const selectedOption = plaka.find((option) => option.id === e);
                if (!selectedOption) {
                  name ? setValue(name, "") : setValue("plaka", "");
                  setData([]);
                }
              } else {
                const selectedOption = plaka.find((option) => option.id === e);
                if (selectedOption) {
                  name
                    ? setValue(name, selectedOption.plaka)
                    : setValue("plaka", selectedOption.plaka);
                }
              }
            }}
            disabled={plaka.length === 1}
          />
          {fieldState.error && (
            <span style={{ color: "red" }}>{fieldState.error.message}</span>
          )}
        </>
      )}
    />
  );
};

Plaka.propTypes = {
  name: PropTypes.string,
  codeName: PropTypes.string,
  required: PropTypes.bool,
};

export default Plaka;
