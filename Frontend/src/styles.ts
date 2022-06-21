import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    html {
        --primary: #EBB2D2;
        --secondary: #EBCCDD;
    }

    body {
        margin: 0;
        background: var(--secondary);
    }

    a {
        text-decoration: none;
    }
`

export { GlobalStyles }