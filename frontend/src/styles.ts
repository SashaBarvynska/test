import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    html {
        --primary: #6E2346;
        --secondary: #EDE1E6;
        --error: #EB5146;
        --success: #48AD6A;
        --hover: #ED8CB5;

        --white: #FDFDFD;
        --black: #000000;
    }

    body {
        margin: 0;
        background: var(--white);
    }

    a {
        text-decoration: none;
    }
`

export { GlobalStyles }