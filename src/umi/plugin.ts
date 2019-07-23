import { join } from "path"

export default function (api: any) {
    api.modifyEntryRender((memo: any) => {
        return `
        const rootContainer = window.g_plugins.apply("rootContainer", {
            initialValue: React.createElement(
                require("${join(__dirname, "/entry")}").default,
                null,
                React.createElement(require("./router").default)
            ),        
        })
        
        ReactDOM.render(rootContainer, document.getElementById("root"))
        `.trim()
    })
}
