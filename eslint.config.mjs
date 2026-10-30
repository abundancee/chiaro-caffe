import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", "scripts/**", "next-env.d.ts"] }];
export default config;
