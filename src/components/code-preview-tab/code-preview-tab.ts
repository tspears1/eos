import CodePreviewTab from "./code-preview-tab.component"

export * from './code-preview-tab.component'
export default CodePreviewTab

window.customElements.define('code-preview-tab', CodePreviewTab)

declare global {
    interface HTMLElementTagNameMap {
        'code-preview-tab': CodePreviewTab;
    }
}