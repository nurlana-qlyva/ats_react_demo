import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import tr_TR from "antd/lib/locale/tr_TR";
import { t } from "i18next";
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  Modal,
} from "antd";
import { GetVehicleDetailsInfoService } from '../../../../../../../api/services/vehicles/vehicles/services'

import CodeControl from "../../../../../../components/form/selects/CodeControl";
import Towns from "../../../../../../components/form/selects/Towns";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import DateInput from "../../../../../../components/form/date/DateInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";

dayjs.locale("tr");

const Garanti = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 3).then((res) => {});
  }, [id, status]);

  return <div></div>;
};

export default Garanti;
