<script>
    import arrow from "$lib/img/arrow.webp";
    // let { data } = $props();
    // const persons = data.persons;
    let rotateX = $state(0);
    let rotateY = $state(0);
    let sidePosition = $state(2);
    let currentFace = $state("FRONT");

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
    <button class="up-button button" onclick={() => turnHandler("up")}>
        <img src={arrow} alt="pijl" width="25" />
    </button>
    <button class="left-button button" onclick={() => turnHandler("left")}>
        <img src={arrow} alt="pijl" width="25" />
    </button>
    <button class="right-button button" onclick={() => turnHandler("right")}>
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
                <div class="face front">front</div>
                <div class="face right">right</div>
                <div class="face back">back</div>
                <div class="face left">left</div>
                <div class="face top">top</div>
                <div class="face bottom">bottom</div>
            </div>
        </div>
    </div>
</section>

<style>
    .scene {
        --cube-size: 512px;

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

    .up-button {
        position: absolute;
        top: 8%;
        right: 50%;
    }

    .left-button {
        position: absolute;
        top: 46%;
        left: 10%;
        img {
            transform: rotate(-90deg);
        }
    }

    .right-button {
        position: absolute;
        top: 46%;
        right: 10%;
        img {
            transform: rotate(90deg);
        }
    }

    .down-button {
        position: absolute;
        bottom: 8%;
        left: 50%;
        img {
            transform: rotate(180deg);
        }
    }

    .button {
        z-index: 10;
    }

    .front {
        transform: rotateY(0deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: red;
    }
    .right {
        transform: rotateY(-90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: blue;
    }
    .back {
        transform: rotateY(180deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: yellow;
    }
    .left {
        transform: rotateY(90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: green;
    }
    .top {
        transform: rotateX(90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: pink;
    }
    .bottom {
        transform: rotateX(-90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: orange;
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
