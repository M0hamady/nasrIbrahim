module.exports = {
    resolve: {
      fallback: {
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),

        // Add any other missing modules here if necessary
      },
    },
  };
  