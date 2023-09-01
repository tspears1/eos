import CodePreviewPanel from "./code-preview-panel.component"

export * from './code-preview-panel.component'
export default CodePreviewPanel

window.customElements.define('code-preview-panel', CodePreviewPanel)

declare global {
    interface HTMLElementTagNameMap {
        'code-preview-panel': CodePreviewPanel;
    }
}