import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    html {
        --primary: #6E2346;
        --secondary: #FDFDFD;
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