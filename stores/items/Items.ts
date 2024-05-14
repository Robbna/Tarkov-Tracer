import { TarkovService } from "~/services/tarkov/TarkovService";
import type { IItem } from "~/services/tarkov/types";

export const useItems = defineStore("items", () => {
  const items = ref<IItem[] | null>(null);

  const fetchItems = async () => {
    await TarkovService.getAllItems().then((response) => {
      items.value = response.items;
    });
  }

  return {
    items,
    fetchItems,
  }
})