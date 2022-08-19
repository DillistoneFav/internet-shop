import { $authHost } from "./index";

export const sendOrder = async ({ mobile, basket }) => {
  const { data } = await $authHost({
    method: "POST",
    url: "api/orders",
    data: { mobile, basket },
  });
  return data;
};

export const fetchOrders = async () => {
  const { data } = await $authHost.get(`api/orders`);
  return data;
};

export const fetchChangeStatusOrder = async ({ complete, id }) => {
  const { data } = await $authHost.put("api/orders", { complete, id });
  return data;
};

export const deleteOrder = async ({ id }) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/orders",
    data: { id },
  });
  return data;
};
