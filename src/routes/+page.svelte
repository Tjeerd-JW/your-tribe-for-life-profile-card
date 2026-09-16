<script>
    import arrow from "$lib/img/arrow.webp";
    let { data } = $props();
    let person = $derived(data.person[0]);
    let rotateX = $state(0);
    let rotateY = $state(0);
    let sidePosition = $state(2);
    let currentFace = $state("FRONT");
    console.log(person);

    const transitions = {
        FRONT: {
            up: "TOP",
            right: "LEFT",
            left: "RIGHT",
            down: "BOTTOM",
        },
        BACK: {
            up: "TOP",
            right: "RIGHT",
            left: "LEFT",
            down: "BOTTOM",
        },
        BOTTOM: {
            up: "FRONT",
            right: "LEFT",
            left: "RIGHT",
            down: "BACK",
        },
        TOP: {
            up: "BACK",
            right: "LEFT",
            left: "RIGHT",
            down: "FRONT",
        },
        RIGHT: {
            up: "TOP",
            right: "FRONT",
            left: "BACK",
            down: "BOTTOM",
        },
        LEFT: {
            up: "TOP",
            right: "BACK",
            left: "FRONT",
            down: "BOTTOM",
        },
    };

    const rotations = {
        FRONT: { x: 0, y: 0 },
        BACK: { x: 0, y: -180 },
        BOTTOM: { x: 90, y: 0 },
        TOP: { x: -90, y: 0 },
        RIGHT: { x: 0, y: 90 },
        LEFT: { x: 0, y: -90 },
    };

    function turnHandler(direction) {
        let targetRotation;
        switch (direction) {
            case "up":
                targetRotation = transitions[currentFace].up;
                break;
            case "left":
                targetRotation = transitions[currentFace].left;
                break;
            case "right":
                targetRotation = transitions[currentFace].right;
                break;
            case "down":
                targetRotation = transitions[currentFace].down;
                break;
        }
        rotateX = rotations[targetRotation].x;
        rotateY = rotations[targetRotation].y;
        currentFace = targetRotation;
    }
</script>

<section>
    <div class="cube-container">
        <button class="up-button button" onclick={() => turnHandler("up")}>
            <img src={arrow} alt="pijl" width="25" />
        </button>
        <button class="left-button button" onclick={() => turnHandler("left")}>
            <img src={arrow} alt="pijl" width="25" />
        </button>
        <button
            class="right-button button"
            onclick={() => turnHandler("right")}
        >
            <img src={arrow} alt="pijl" width="25" />
        </button>
        <button class="down-button button" onclick={() => turnHandler("down")}>
            <img src={arrow} alt="pijl" width="25" />
        </button>

        <div class="scene" style={`--side-position: ${sidePosition};`}>
            <div
                class="cube"
                style={`--rotate-X: ${rotateX}deg; --rotate-Y: ${rotateY}deg;`}
            >
                <div class="cube-wobble">
                    <div class="face front">
                        <h1>Welkom op mijn visite kaartje</h1>
                        <p>Draai de kubus rond om meer informatie te zien</p>
                    </div>
                    <div class="face right">right</div>
                    <div class="face back">back</div>
                    <div class="face left">left</div>
                    <div class="face top">
                        <svg viewBox="0 0 500 500">
                            <path
                                id="curve"
                                fill="transparent"
                                d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
                            />
                            <text width="500" height="200">
                                <textPath
                                    href="#curve"
                                    textAnchor="middle"
                                    startOffset="5%"
                                >
                                    Mijn naam is {person.name}
                                </textPath>
                            </text>
                        </svg>
                        <img
                            src="https://fdnd.directus.app/assets/{person.mugshot}?width=500"
                            alt="foto van {person.name}"
                            width="400"
                        />
                    </div>
                    <div class="face bottom">bottom</div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .cube-container {
        --cube-size: 512px;
        --arrow-gap: 50px;

        position: relative;

        width: calc(var(--cube-size) + 2 * var(--arrow-gap));
        height: calc(var(--cube-size) + 2 * var(--arrow-gap));

        margin: auto;
        .scene {
            position: absolute;
            inset: var(--arrow-gap);
            .cube {
                width: var(--cube-size);
                height: var(--cube-size);
                position: absolute;
                top: 50%;
                left: 50%;
                transform-style: preserve-3d;
                transform: translate(-50%, -50%) rotateX(var(--rotate-X))
                    rotateY(var(--rotate-Y));
                transition: transform 2s cubic-bezier(0.79, 0.48, 0.31, 1.52);
                .cube-wobble {
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                    animation: idle 7.5s linear 0s infinite alternate;
                }
                .face {
                    width: var(--cube-size);
                    height: var(--cube-size);
                    position: absolute;
                    background-size: cover;
                    background-position: center;
                }
            }
        }
    }
    .button {
        z-index: 10;
        padding: 0;
        display: grid;
        place-items: center;
        background-color: transparent;
        border: transparent;
        transition: ease-in-out 0.2s;
        &:focus {
            border: solid 2px blue;
        }
        &:hover {
            transform: scale(1.2);
            cursor: pointer;
        }
    }
    .up-button {
        position: absolute;
        top: 0;
        right: 50%;
    }

    .left-button {
        position: absolute;
        top: 50%;
        left: 0;
        img {
            transform: rotate(-90deg);
        }
    }

    .right-button {
        position: absolute;
        top: 50%;
        right: 0;
        img {
            transform: rotate(90deg);
        }
    }

    .down-button {
        position: absolute;
        bottom: 0;
        left: 50%;
        img {
            transform: rotate(180deg);
        }
    }

    .front {
        transform: rotateY(0deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: #e8fccf;
        color: contrast-color(#e8fccf);
        display: grid;
        place-content: center;
        text-align: center;
    }
    .right {
        transform: rotateY(-90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: #96e072;
        color: contrast-color(#96e072);
    }
    .back {
        transform: rotateY(180deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: #3da35d;
        color: contrast-color(#3da35d);
    }
    .left {
        transform: rotateY(90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: #3e8914;
        color: contrast-color(#3e8914);
    }
    .top {
        transform: rotateX(90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: #134611;
        color: contrast-color(#134611);

        svg {
            position: absolute;
            inset: 0;
            z-index: 2;
            overflow: visible;
            text {
                font-family: "Space Grotesk", sans-serif;
                font-size: 30px;
                fill: contrast-color(#134611);
            }
        }
        img {
            border-radius: 50%;
            position: absolute;
            inset: 0;
            width: 300px;
            height: 300px;
            object-fit: cover;
            z-index: 1;
            margin: auto;
        }
    }
    .bottom {
        transform: rotateX(-90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: #fefcad;
        color: contrast-color(#fefcad);
    }

    @keyframes idle {
        0% {
            transform: rotateX(0deg) rotateY(0deg);
        }
        25% {
            transform: rotateX(-2deg) rotateY(2deg);
        }
        50% {
            transform: rotateX(2deg) rotateY(4deg);
        }
        75% {
            transform: rotateX(-2deg) rotateY(-2deg);
        }
        100% {
            transform: rotateX(2deg) rotateY(-4deg);
        }
    }
</style>
