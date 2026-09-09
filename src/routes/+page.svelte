<script>
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
    <button class="up-button" onclick={() => turnHandler("up")}> up </button>
    <button class="left-button" onclick={() => turnHandler("left")}>
        left
    </button>
    <button class="right-button" onclick={() => turnHandler("right")}>
        right
    </button>
    <button class="down-button" onclick={() => turnHandler("down")}>
        down
    </button>

    <div class="scene" style={`--side-position: ${sidePosition};`}>
        <div
            class="cube"
            style={`--rotate-X: ${rotateX}deg; --rotate-Y: ${rotateY}deg;`}
        >
            <div class="face front">front</div>
            <div class="face right">right</div>
            <div class="face back">back</div>
            <div class="face left">left</div>
            <div class="face top">top</div>
            <div class="face bottom">bottom</div>
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

            transition: cubic-bezier(0.79, 0.48, 0.31, 1.52) 2s;
            animation: idle 7.5s linear 0s infinite alternate;
            .face {
                width: var(--cube-size);
                height: var(--cube-size);
                position: absolute;
                background-size: cover;
                background-position: center;
            }
        }
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
            transform: translate(-50%, -50%) rotateX(var(--rotate-X))
                rotateY(var(--rotate-Y));
        }

        25% {
            transform: translate(-50%, -50%)
                rotateX(calc(var(--rotate-X) - 2deg))
                rotateY(calc(var(--rotate-Y) + 2deg));
        }

        50% {
            transform: translate(-50%, -50%)
                rotateX(calc(var(--rotate-X) + 2deg))
                rotateY(calc(var(--rotate-Y) + 4deg));
        }

        75% {
            transform: translate(-50%, -50%)
                rotateX(calc(var(--rotate-X) - 2deg))
                rotateY(calc(var(--rotate-Y) - 2deg));
        }
        100% {
            transform: translate(-50%, -50%)
                rotateX(calc(var(--rotate-X) + 2deg))
                rotateY(calc(var(--rotate-Y) - 4deg));
        }
    }
</style>
