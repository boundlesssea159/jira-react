const CracoLessPlugin = require("craco-less")
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1DA57A',  // 修改主色调
                            '@link-color': '#1890ff',     // 修改链接颜色
                            '@font-size-base': '14px',    // 修改字体大小
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}