import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, query } from 'lit/decorators.js'
import { watch } from '../../internal/watch.ts'
import { icons } from '../../assets/icons.js'
import styles from './code-preview.styles'
import type { CSSResultGroup } from 'lit'
import type CodePreviewPanel from '../code-preview-panel/code-preview-panel.js'
import type CodePreviewTab from '../code-preview-tab/code-preview-tab.js'

const syntaxLanguages = {
    html: 'html',
    react: 'jsx',
    js: 'javascript',
    css: 'css',
    vue: 'html',
}

/**
 * @element code-preview
 * @summary Resizable preview window for code examples.
 * @status incomplete
 *
 * @slot - Default. Preview window and HTML source code.
 * @slot Nav - Code preview navigation.
 * @slot Panel - Code preview panel.
 *
 * @csspart preview - The preview window.
 *
 * @cssproperty --code-preview-background - Background color of the preview window.
 */


export default class CodePreview extends LitElement {
    static styles:CSSResultGroup = styles

    private activeTab?: CodePreviewTab
    private tabs: CodePreviewTab[] = []
    private panels: CodePreviewPanel[] = []

    @property({ type: Boolean, reflect: true }) active = false

    @query('.code-preview__preview') preview: HTMLElement
    @query('.code-preview__resizer') resizer: HTMLElement

    connectedCallback() {
        const whenAllDefined = Promise.all([
            customElements.whenDefined('code-preview-tab'),
            customElements.whenDefined('code-preview-panel'),
        ])

        super.connectedCallback()

    }

    private _setActiveTab(tab: CodePreviewTab) {

    }

    private _handleResizerDrag(event: TouchEvent | MouseEvent ) {
        const { resizer, preview } = this

        if (!resizer || !preview) return

        let startX = event.changedTouches
            ? event.changedTouches[0].pageX
            : event.clientX

        let startWidth = parseInt(document.defaultView.getComputedStyle(preview).width, 10)

        event.preventDefault()
        preview.classList.add("code-preview__preview--dragging")
        document.documentElement.addEventListener("mousemove", _dragMove)
        document.documentElement.addEventListener("touchmove", _dragMove)
        document.documentElement.addEventListener("mouseup", _dragStop)
        document.documentElement.addEventListener("touchend", _dragStop)

        function _dragMove(event: TouchEvent | MouseEvent) {
            const width = startWidth + (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - startX
            preview.style.width = `${width}px`
        }

        function _dragStop() {
            preview.classList.remove("code-preview__preview--dragging")
            document.documentElement.removeEventListener("mousemove", _dragMove)
            document.documentElement.removeEventListener("touchmove", _dragMove)
            document.documentElement.removeEventListener("mouseup", _dragStop)
            document.documentElement.removeEventListener("touchend", _dragStop)
        }
    }

    render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    'code-preview': true,
                })}
                @mousedown=${this._handleResizerDrag}
                @mouseup=null
            >
                <div class="code-preview__preview">
                    <div class="code-preview__preview-content">
                        <slot></slot>
                    </div>

                    <div class="code-preview__resizer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="" viewBox="0 0 16 16" part="svg">
                            <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                    </div>
                </div>

                <div class="code-preview__panels">
                    <div class="code-preview__panel">
                        <pre>
                            <code class="language-html">

                            </code>
                            <button type="button" class="copy-code-button" aria-label="Copy">
                                <svg class="copy-code-button__copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" part="svg">
                                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"></path>
                                </svg>

                                <svg class="copy-code-button__copied-icon" style="display: none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" part="svg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                                </svg>
                            </button>
                        </pre>
                    </div>
                </div>

                <div class="code-preview__buttons">
                    <button
                        type="button"
                        class="code-preview__button code-preview__toggle"
                        aria-expanded="false"
                        aria-controls="code-preview-source-group-123"
                    >
                        Source
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                        <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>



                    <button
                        type="button"
                        class="code-preview__button code-preview__button--codepen"
                        title="Edit on CodePen"
                    >
                        <svg
                            width="138"
                            height="26"
                            viewBox="0 0 138 26"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                        <path
                            d="M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z"
                        ></path>
                        </svg>
                    </button>
                </div>
            </div>
        `
    }
}
