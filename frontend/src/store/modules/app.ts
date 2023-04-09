import { defineStore } from "pinia";
import { AppState } from "../types";
import { useOsTheme } from "naive-ui";
const osThemeRef = useOsTheme();
import { useStorage } from "@vueuse/core";
import { setLocale } from "@/i18n";
import { themeRef } from "@/utils/tips";

const useAppStore = defineStore("app", {
  // pinia用法 这里定义全局变量
  state: (): AppState => ({
    theme: useStorage("theme", osThemeRef.value),
    language: useStorage("language", "zh"),
  }),
  getters: {},
  actions: {
    // setTheme(theme: string | null) {
    //   this.theme = theme;
    // },
    // 切换主题
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";    // 这里的this就是tate
      themeRef.value = this.theme;
    },
    setLanguage(lang: string) {
      this.language = lang;
      setLocale(lang);
    },
  },
});

export default useAppStore;
