import '@/styles/global.css'
import '@/styles/animation.css'
import NextNProgress from 'nextjs-progressbar';
import Cookies from "universal-cookie";

function App({ Component, pageProps }) {

    // Тест с cookies
    const cookies = new Cookies()
    cookies.set('user_id', '1', {path: '/'})
    // - - - - - - -

    return (
        <>
            <NextNProgress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height={5}
                showOnShallow={true}
            />
            <Component {...pageProps} />
        </>
    )
}

export default App