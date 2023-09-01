import CodePreview from "./code-preview.component"

export * from './code-preview.component'
export default CodePreview

window.customElements.define('code-preview', CodePreview)

declare global {
    interface HTMLElementTagNameMap {
        'code-preview': CodePreview;
    }
}