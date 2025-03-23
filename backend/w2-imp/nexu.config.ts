import { defineConfig } from "nexujs";

export default defineConfig({
  port: 5000,
  keys: {
    public: String(process.env.NEXU_PUBLIC_KEY),
    private: String(process.env.NEXU_PRIVATE_KEY),
  },
  disableEncryption: true,
});
