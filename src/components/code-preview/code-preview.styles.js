import { css } from 'lit'
import componentStyles from '../../styles/component.styles.js'

export default css`
    ${componentStyles}

    :host {
        display: block;
    }

    .code-preview {
        background-color: var(--eos-color-neutral-50);
        border-radius: 3px;
        margin-bottom: 1.5rem;
        position: relative;
    }

    .code-preview__preview {
        background-color: var(--eos-color-neutral-1000);
        border-bottom: none;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: solid 1px var(--eos-color-neutral-200);
        max-width: 100%;
        min-width: 20rem;
        padding: 1.5rem 3.25rem 1.5rem 1.5rem;
        position: relative;
    }

    /* Block the preview while dragging to prevent iframes from intercepting drag events */
    .code-preview__preview--dragging:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: ew-resize;
    }

    .code-preview__resizer {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1.75rem;
        font-size: 20px;
        color: var(--eos-color-neutral-600);
        background-color: var(--eos-color-neutral-0);
        border-left: solid 1px var(--eos-color-neutral-200);
        border-top-right-radius: 3px;
        cursor: ew-resize;
    }

    @media screen and (max-width: 600px) {
        .code-preview__preview {
            padding-right: 1.5rem;
        }

        .code-preview__resizer {
            display: none;
        }
    }

    .code-preview__source {
        border: solid 1px var(--eos-color-neutral-200);
        border-bottom: none;
        border-radius: 0 !important;
        display: none;
    }

    .code-preview--expanded .code-preview__source {
        display: block;
    }

    .code-preview__source pre {
        margin: 0;
    }

    .code-preview__buttons {
        position: relative;
        border: solid 1px var(--eos-color-neutral-200);
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        display: flex;
    }

    .code-preview__button {
        flex: 0 0 auto;
        height: 2.5rem;
        min-width: 2.5rem;
        border: none;
        border-radius: 0;
        background: var(--eos-color-neutral-0);
        font: inherit;
        font-size: 0.7rem;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--eos-color-neutral-600);
        padding: 0 1rem;
        cursor: pointer;
    }

    .code-preview__button:not(:last-of-type) {
        border-right: solid 1px var(--eos-color-neutral-200);
    }

    .code-preview__button--html,
    .code-preview__button--react {
        width: 70px;
        display: flex;
        place-items: center;
        justify-content: center;
    }

    .code-preview__button--selected {
        font-weight: 700;
        color: var(--eos-color-primary-600);
    }

    .code-preview__button--codepen {
        display: flex;
        place-items: center;
        width: 6rem;
    }

    .code-preview__button:first-of-type {
        border-bottom-left-radius: 3px;
    }

    .code-preview__button:last-of-type {
        border-bottom-right-radius: 3px;
    }

    .code-preview__button:hover,
    .code-preview__button:active {
        box-shadow: 0 0 0 1px var(--eos-color-primary-400);
        border-right-color: transparent;
        background-color: var(--eos-color-primary-50);
        color: var(--eos-color-primary-600);
        z-index: 1;
    }

    .code-preview__button:focus-visible {
        outline: none;
        outline: var(--eos-focus-ring);
        z-index: 2;
    }

    .code-preview__toggle {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        width: 100%;
        color: var(--eos-color-neutral-600);
        cursor: pointer;
    }

    .code-preview__toggle svg {
        width: 1em;
        height: 1em;
        margin-left: 0.25rem;
    }

    .code-preview--expanded .code-preview__toggle svg {
        transform: rotate(180deg);
    }

    /* We can apply data-flavor="html|react" to any element on the page to toggle it when the flavor changes */
    .flavor-html [data-flavor]:not([data-flavor="html"]) {
        display: none;
    }

    .flavor-react [data-flavor]:not([data-flavor="react"]) {
        display: none;
    }
`