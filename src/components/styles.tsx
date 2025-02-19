import { css, cx, keyframes, Style } from 'hono/css'
export const globalClass = `
    body {
        height: 100dvh;
        background: #0d121b;
        color: #fff;
        --border-radius:20px;
        position: relative;
        font-family: system-ui;
        font-size: x-large;

    }

    body::after{
        content: "";
        position: absolute;
        width: 60%;
        height: 200px;
        top: 0;
        left: 20%;
        background-color: aqua;
        filter: blur(190px);
    }
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100dvh;
    }

    .input_container {
        display: flex;
        flex-direction: row;
        gap: 7px;
        position: relative;
        padding-bottom: 100px;
    }

    .input_container .label {
        font-size: 15px;
        padding-left: 10px;
        position: absolute;
        top: 13px;
        transition: 0.3s;
        pointer-events: none;
    }

    .input {
        min-width: 300px;
        width: 100%;
        height: 50px;
        padding: 0 10px;
        border: none;
        outline: none;
        font-size: 15px;
        background-color: transparent;
        border-radius: var(--border-radius);
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.726),
        -1px -1px 6px rgba(255, 255, 255, 0.4);
        color: #fff;
        &&:hover {
            border: 2px solid rgb(1, 235, 252);
            box-shadow: 0px 0px 100px rgb(1, 235, 252) , inset 0px 0px 10px rgb(1, 235, 252),0px 0px 5px rgb(255, 255, 255);
        }
    }

    button {
        color: #fff;
        border-radius: var(--border-radius);
        max-width: 200px;
        width: 100px;
        background-color: transparent;
        box-shadow: 3px 3px 10px rgba(9, 11, 34, 0.418),
    -1px -1px 6px rgba(255, 255, 255, 0.4);
        cursor:pointer;
        &&:hover {
            border: 2px solid rgb(1, 235, 252);
            box-shadow: 0px 0px 100px rgb(1, 235, 252) , inset 0px 0px 10px rgb(1, 235, 252),0px 0px 5px rgb(255, 255, 255);
        } 
    }

    @media ( width < 750px ) {
        .input_container {
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
        .input {
            min-width: fit-content;
            width: 100%;
        }
        button {
            padding: 5px;
            min-width: fit-content;
            width: 100%;
        }
    }
`