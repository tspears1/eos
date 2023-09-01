import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property } from 'lit/decorators.js'
import { watch } from '../../internal/watch.ts'
import styles from './code-preview-panel.styles'

let id = 0

/**
 * @element code-preview-panel
 * @summary Tab panels are used inside [code-preview](/components/code-preview) to display tabbed content.
 * @status incomplete
 *
 * @slot - Default. Tab panel content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --code-preview-panel-background - Background color of the tab panel.
 * @cssproperty --code-preview-panel-padding - Padding of the tab panel.
 */
export default class CodePreviewPanel extends LitElement {

    static styles = styles

    attrId = ++id
    componentId = `code-preview-panel-${this.attrId}`

    /** The tab panel's name. */
    @property({ reflect: true }) name = ''

    /** When true, the tab panel will be shown. */
    @property({ type: Boolean, reflect: true }) active = false

    connectedCallback() {
        super.connectedCallback();
        this.id = this.id.length > 0 ? this.id : this.componentId;
        this.setAttribute('role', 'tabpanel');
    }

    @watch('active')
    handleActiveChange() {
        this.setAttribute('aria-hidden', this.active ? 'false' : 'true');
    }

    render() {
        return html`
            <slot
                part="base"
                class=${classMap({
                    'code-preview-panel': true,
                    'code-preview-panel--active': this.active
                })}
            ></slot>
        `
    }
}