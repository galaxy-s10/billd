module.exports = {
  apps: [
    {
      name: "verdaccio-4873",
      exec_mode: "fork",
      instances: "1", // Or a number of instances
      script: "npm",
      args: "run dev",
      watch: false,
      // env: {
      //   PORT: 4873,
      // },
    },
  ],
};
