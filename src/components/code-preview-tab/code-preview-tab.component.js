import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, query } from 'lit/decorators.js'
import styles from './code-preview-tab.styles.js'

let id = 0

/**
 * @element code-preview-tab
 * @summary Tabs are used inside [code-preview](/components/code-preview) to trigger tab panels.
 * @status incomplete
 *
 * @slot - Default. Tab's label.
 *
 * @csspart base - The component's base wrapper.
 */
export default class CodePreviewTab extends LitElement {

    static styles = styles

    attrId = ++id
    componentId = `code-preview-tab-${this.attrId}`

    @query('.code-preview-tab') tab

    /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
    @property({ reflect: true }) panel = ''

    /** Draws the tab in an active state. */
    @property({ type: Boolean, reflect: true }) active = false
}

