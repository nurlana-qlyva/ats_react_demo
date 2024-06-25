import http from "../http";

// upload photo
export const PhotoUploadService = async (id, group, data) => {
  return await http.post(
    `/Photo/UploadPhoto?refId=${id}&refGroup=${group}`,
    data
  );
};

export const PhotoReadService = async (id, group) => {
  return await http.get(
    `/Photo/GetPhotosByRefGroup?refId=${id}&refGroup=${group}`
  );
};

export const PhotoDownloadService = async (data) => {
  return await http.post(`/Photo/DownloadPhotoById`, data, {
    responseType: "blob",
  });
};

// upload file
export const FileUploadService = async (id, group, data) => {
  return await http.post(
    `/Document/UploadDocument?refId=${id}&refGroup=${group}`,
    data
  );
};

export const FileReadService = async (id, group) => {
  return await http.get(
    `/Document/GetDocumentsByRefGroup?refId=${id}&refGroup=${group}`
  );
};

export const FileDownloadService = async (data) => {
  return await http.post(`/Document/DownloadDocumentById`, data, {
    responseType: "blob",
  });
};
