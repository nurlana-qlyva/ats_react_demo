import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Firma = ({ name, codeName, checked }) => {
  const [data, setData] = useState([]);
  const { setValue, watch, control } = useFormContext();

  const handleClick = () => {
    CodeControlByUrlService("Company/GetCompanyListForSelectInput").then(
      (res) => {
        setData(res?.data);
      }
    );
  };

  return (
    <Controller
      name={codeName ? codeName : "firmaId"}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          showSearch
          allowClear
          optionFilterProp="children"
          disabled={checked}
          filterOption={(input, option) =>
            (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label.toLowerCase() ?? "").localeCompare(
              optionB?.label.toLowerCase() ?? ""
            )
          }
          options={data.map((item) => ({
            label: item.unvan,
            value: item.firmaId,
          }))}
          value={name ? watch(name) : watch("unvan")}
          onClick={handleClick}
          onChange={(e) => {
            field.onChange(e);
            if (e === undefined) {
              setValue("tedarikciKod", "");
              setValue("unvan", "");
              if (!selectedOption) {
                name ? setValue(name, "") : setValue("unvan", "");
                codeName ? setValue(codeName, -1) : setValue("firmaId", -1);
              }
            } else {
              const selectedOption = data.find(
                (option) => option.firmaId === e
              );
              if (selectedOption) {
                setValue("tedarikciKod", selectedOption.kod);
                setValue("unvan", selectedOption.unvan);

                if (selectedOption) {
                  name
                    ? setValue(name, selectedOption.unvan)
                    : setValue("unvan", selectedOption.unvan);
                }
              }
            }
          }}
        />
      )}
    />
  );
};

Firma.propTypes = {
  name: PropTypes.string,
  codeName: PropTypes.string,
  checked: PropTypes.bool,
};

export default Firma;
