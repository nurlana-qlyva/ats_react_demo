import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select } from "antd";
import { GetWareHouseListByTipService } from "../../../../api/services/malzeme/malzeme_services";

const Depo = ({ type }) => {
  const [data, setData] = useState([]);
  const { watch, setValue, control } = useFormContext();

  const handleClick = () => {
    GetWareHouseListByTipService(type).then((res) => {
      setData(res.data);
    });
  };

  return (
    <Controller
      name="girisDepoSiraNo"
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
            label: item.tanim,
            value: item.siraNo,
          }))}
          value={watch("depo")}
          onClick={handleClick}
          onChange={(e) => {
            field.onChange(e);
            if (e === undefined) {
              const selectedOption = data.find((option) => option.siraNo === e);
              if (!selectedOption) {
                setValue("depo", "");
                setValue("depoLokasyonId", "");
                setValue("malzemeId", "");
              }
            } else {
              const selectedOption = data.find((option) => option.siraNo === e);
              if (selectedOption) {
                setValue("depo", selectedOption.tanim);
                setValue("depoLokasyonId", selectedOption.lokasyonId);
                setValue("malzemeId", selectedOption.malzemeId);
              }
            }
          }}
        />
      )}
    />
  );
};

export default Depo;
