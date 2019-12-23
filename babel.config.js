module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            ie: 11
          },
          corejs: 2,
          useBuiltIns: "usage"
        }
      }
    ]
  ]
}
