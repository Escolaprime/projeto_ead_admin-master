module.exports = {
  // devServer: {
  //     proxy: 'http://192.168.1.52:3330'
  // }
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        nsis: {
          customNsisBinary: {
            url:
              "https://github.com/electron-userland/electron-builder-binaries/releases/download",
            checksum:
              "VKMiizYdmNdJOWpRGz4trl4lD++BvYP2irAXpMilheUP0pc93iKlWAoP843Vlraj8YG19CVn0j+dCo/hURz9+Q==",
            version: "3.0.4.1",
          },
        },
        productName: "Projeto EAD Admin",
        win: {
          target: ["portable"],
          icon: "src/assets/icon.png",
        },
      },
    },
  },
};
