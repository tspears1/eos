import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { watch } from '../../internal/watch.js'
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

    @query('.code-preview-tab') tab: HTMLButtonElement

    /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
    @property({ reflect: true }) panel = ''

    /** Draws the tab in an active state. */
    @property({ type: Boolean, reflect: true }) active = false

    connectedCallback() {
        super.connectedCallback()
        this.setAttribute('role', 'tab')
    }

    @watch('active')
    handleActiveChange() {
        this.setAttribute('aria-selected', this.active ? 'true' : 'false')
    }

    /** Sets focus to the tab. */
    focus(options?: FocusOptions) {
        this.tab.focus(options)
    }

    /** Removes focus from the tab. */
    blur() {
        this.tab.blur()
    }

    render() {
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        this.id = this.id.length > 0 ? this.id : this.componentId

        return html`
            <button
                part="base"
                class=${classMap({
                    'code-preview-tab': true,
                    'code-preview-tab--active': this.active,
                    'code-preview__botton': true,
                    'code-preview__button--selected': this.active,
                })}
            >
                <slot></slot>
            </button>
        `
    }
}

