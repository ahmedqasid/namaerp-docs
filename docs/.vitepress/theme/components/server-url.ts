import {ref} from "vue";

const STORAGE_KEY = 'serverBaseUrl'
export const serverUrl = ref((typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null)
  || "http://localhost:8080/erp/");

export function updateServerURL(url?: string) {
  localStorage.setItem(STORAGE_KEY, url);
  serverUrl.value = url;
}