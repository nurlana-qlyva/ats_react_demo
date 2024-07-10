import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Driver = ({ name, codeName }) => {
  const [data, setData] = useState([]);
  const { watch, setValue, control } = useFormContext();

  const handleClickSelect = () => {
    CodeControlByUrlService("Driver/GetDriverListForSelectInput").then(
      (res) => {
        setData(res.data);
      }
    );
  };

  return (
    <Controller
      name={codeName ? codeName : "surucuId"}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          showSearch
          allowClear
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label.toLowerCase() ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={data.map((item) => ({
            label: item.isim,
            value: item.surucuId,
          }))}
          value={name ? watch(name) : watch("surucu")}
          onClick={handleClickSelect}
          onChange={(e) => {
            field.onChange(e);
            if (e === undefined) {
              const selectedOption = data.find(
                (option) => option.surucuId === e
              );
              if (!selectedOption) {
                name ? setValue(name, "") : setValue("surucu", "");
                codeName ? setValue(codeName, -1) : setValue("surucuId", -1);
              }
            } else {
              const selectedOption = data.find(
                (option) => option.surucuId === e
              );
              if (selectedOption) {
                name
                  ? setValue(name, selectedOption.isim)
                  : setValue("surucu", selectedOption.isim);
              }
            }
          }}
        />
      )}
    />
  );
};

export default Driver;
