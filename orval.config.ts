export default {
  main: {
    input: "./src/lib/api/schema.yaml",
    output: {
      target: "./src/lib/api/generated.ts",
      prettier: true,
      override: {
        mutator: {
          path: "./src/lib/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
};
