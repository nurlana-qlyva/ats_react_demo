import http from "./http";
import {
  CodeControlService,
  CustomCodeControlService,
  MaterialListSelectService,
  GetLocationByDepoIdService,
  CodeItemValidateService,
} from "./services/select_services";

import {
  PhotoUploadService,
  PhotoReadService,
  PhotoDownloadService,
  FileUploadService,
  FileReadService,
  FileDownloadService,
} from "./services/upload_services";

import {
  VehiclesReadForSearchService,
  VehiclesReadForPageService,
  VehiclesReadForFilterService,
  NewVehicleAddService,
  VehiclesUpdateReadService,
  VehiclesUpdateSetService,
} from "./services/vehicles_services";

import {
  KMGetService,
  KMValidateService,
  KMAddService,
  KMResetService,
  KMEditService,
  KMLogListGetService,
  KMLogListGetByIdService,
  KMLogListDeleteService,
  KMLogListValidateService,
  KMLogListUpdateService,
} from "./services/km_services";

import {
  YakitGetService,
  YakitListSearchService,
  YakitGetByIdService,
  YakitListSearchByIdService,
  YakitDataGetByIdService,
  YakitDataGetByDateService,
  YakitAddService,
  YakitHistoryGetService,
  YakitTankGetService,
  YakitKmLogValidateService,
  YakitKmLogValidateForUpdateService,
  YakitPriceGetService,
  YakitUpdateDataGetService,
  YakitUpdateDataUpdateService,
  YakitDataDeleteService,
} from "./services/yakit_services";

import {
  MalzemeListGetService,
  MalzemeListSearchService,
  MalzemeAddService,
  MalzemeUpdateService,
  MalzemeDepoListGetService,
  MalzemeCodeGetService,
  MalzemeDataByIdGetService,
} from "./services/malzeme_services";

import {
  GirisFisleriListGetService,
  GirisFisleriListSearchService,
  GirisFisCodeGetService,
  GirisFisleriAddService,
} from "./services/girisfis_services";

import {
  DetailInfoGetService,
  DetailInfoUpdateService,
} from "./services/detay_services";

// login
export const LoginUserService = (data) => {
  return http.post("/Login", data);
};

// Vehicle/GetUserId   demo
export const DemoService = () => {
  return http.get(`/Vehicle/GetUserId`);
};

// custom inputs
export const CustomInputsReadService = (form) => {
  return http.get(`/CustomField/GetCustomFields?form=${form}`);
};

export const CustomInputsUpdateService = (form, topic, field) => {
  return http.post(
    `/CustomField/AddCustomFieldTopic?form=${form}&topic=${topic}&field=${field}`
  );
};

// personal fields --> ozel alanlar
export const PersonalFieldsReadService = (form) => {
  return http.get(`/CustomField/GetCustomFields?form=${form}`);
};
export const PersonalFieldsUpdateService = (form, topic, field) => {
  return http.post(
    `/CustomField/AddCustomFieldTopic?form=${form}&topic=${topic}&field=${field}`
  );
};

export {
  CodeControlService,
  CustomCodeControlService,
  MaterialListSelectService,
  GetLocationByDepoIdService,
  CodeItemValidateService,
  PhotoUploadService,
  PhotoReadService,
  PhotoDownloadService,
  FileUploadService,
  FileReadService,
  FileDownloadService,
  VehiclesReadForSearchService,
  VehiclesReadForPageService,
  VehiclesReadForFilterService,
  NewVehicleAddService,
  VehiclesUpdateReadService,
  VehiclesUpdateSetService,
  KMGetService,
  KMValidateService,
  KMAddService,
  KMResetService,
  KMEditService,
  KMLogListGetService,
  KMLogListGetByIdService,
  KMLogListDeleteService,
  KMLogListValidateService,
  KMLogListUpdateService,
  YakitGetService,
  YakitListSearchService,
  YakitGetByIdService,
  YakitListSearchByIdService,
  YakitDataGetByIdService,
  YakitDataGetByDateService,
  YakitAddService,
  YakitHistoryGetService,
  YakitTankGetService,
  YakitKmLogValidateService,
  YakitKmLogValidateForUpdateService,
  YakitPriceGetService,
  YakitUpdateDataGetService,
  YakitUpdateDataUpdateService,
  YakitDataDeleteService,
  MalzemeListGetService,
  MalzemeListSearchService,
  MalzemeAddService,
  MalzemeUpdateService,
  MalzemeDepoListGetService,
  MalzemeCodeGetService,
  MalzemeDataByIdGetService,
  GirisFisleriListGetService,
  GirisFisleriListSearchService,
  GirisFisCodeGetService,
  GirisFisleriAddService,
  DetailInfoGetService,
  DetailInfoUpdateService,
};
