<script>
    // let { data } = $props();
    // const persons = data.persons;
    let rotateX = $state(0);
    let rotateY = $state(0);
    let sidePosition = $state(2);
    let currentFace = $state('front')

    function turnHandler(direction) {
        let cube = document.querySelector(".cube");

        switch (direction) {
            case "top":
                rotateX -=  90;
                break;
            case "left":
                rotateY += 90;
                break;
            case "right":
                rotateY -= 90;
                break;
            case "bottom":
                rotateX += 90;
                break;
        }
    }
</script>

<section>
    <button class="top-button" onclick={() => turnHandler("top")}>top</button>
    <button class="left-button" onclick={() => turnHandler("left")}>left</button
    >
    <button class="right-button" onclick={() => turnHandler("right")}
        >right</button
    >
    <button class="bottom-button" onclick={() => turnHandler("bottom")}
        >bottom</button
    >

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

            transition: ease-in-out 2s;
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
</style>
