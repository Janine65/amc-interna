module.exports = {
  //...
  infrastructureLogging: {
    level: "error",
  },
  plugins: [
    new ModuleFederationPlugin({
      shared: share({
        "@angular/forms": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          includeSecondaries: true,
        },
      }),
    }),
  ],
};
