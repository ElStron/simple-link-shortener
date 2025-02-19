import { css, cx, keyframes, Style } from 'hono/css'

export  const Title = () => {
    return (
        
        <h1>
            <span class="text-cyan-400">URL</span> 
            Shortener
        </h1>
    );
}

const titleStyle = css`
    h1>.sub {
        color: aqua;
    }
`