import jsonServerProvider from "ra-data-json-server";
import { CreateParams, fetchUtils, UpdateParams } from "react-admin";
const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers();
  }

  if (options.body instanceof FormData) {
    options.headers.delete("Content-Type"); // Let the browser set it automatically
  } else {
    options.headers.set("Accept", "application/json");
  }
  const auth = localStorage?.getItem("auth");
  const { data } = auth ? JSON.parse(auth) : { data: null };
  options.headers.set("Authorization", `Bearer ${data?.accessToken}`);
  return fetchUtils.fetchJson(url, options);
};
const baseDataProvider = jsonServerProvider(apiUrl, httpClient);
type itineraryType = {
  title: string;
  discription: string;
};
type PackageParams = {
  id: string;
  title: string;
  price: string;
  durationDays: string;
  destination: string;
  availableSlots: string;
  vendorId: string;
  description: string;
  images: {
    rawFile: File;
    src?: string;
    title?: string;
  };
  quickItinerary: string;
  itinerary: itineraryType[];
  inclusion: string;
  exclusion: string;
  otherInfo: string;
};
const createPackageFormData = (
  params: CreateParams<PackageParams> | UpdateParams<PackageParams>
) => {
  const formData = new FormData();
  debugger;
  if (params.data.images) {
    const imagesArr: any = params?.data?.images;
    for (let fileObj of imagesArr) {
      formData.append("images", fileObj?.rawFile);
    }
  }
  params.data.title && formData.append("title", params.data.title);
  params.data.price && formData.append("price", params.data.price);
  params.data.durationDays &&
    formData.append("durationDays", params.data.durationDays);
  params.data.destination &&
    formData.append("destination", params.data.destination);
  params.data.availableSlots &&
    formData.append("availableSlots", params.data.availableSlots);
  params.data.description &&
    formData.append("description", params.data.description);
  params.data.vendorId && formData.append("vendorId", params.data.vendorId);
  params.data.quickItinerary &&
    formData.append("quickItinerary", params.data.quickItinerary);
  params.data.itinerary &&
    formData.append("itinerary", JSON.stringify(params.data.itinerary));
  params.data.inclusion && formData.append("inclusion", params.data.inclusion);
  params.data.exclusion && formData.append("exclusion", params.data.exclusion);
  params.data.otherInfo && formData.append("otherInfo", params.data.otherInfo);

  return formData;
};
export const dataProviders = {
  ...baseDataProvider,
  create: (resource, params) => {
    if (resource === "package") {
      const formData = createPackageFormData(params);
      debugger;
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    } else if (resource === "destination") {
      const formData = new FormData();
      formData.append("title", params.data.title);
      formData.append("description", params.data.description);
      formData.append("image", params.data.image.rawFile);
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    }

    return baseDataProvider.create(resource, params);
  },
  update: (resource, params) => {
    if (resource === "package") {
      const formData = createPackageFormData(params);
      formData.append("id", params.id);
      return httpClient(`${apiUrl}/${resource}`, {
        method: "PUT",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    }
    return baseDataProvider.update(resource, params);
  },
  approvePackage: async (id: string) => {
    return httpClient(
      `https://destinationvista-backend.onrender.com/package/approve/${id}`,
    ).then(({ json }) => ({ data: json }));
  },
};
