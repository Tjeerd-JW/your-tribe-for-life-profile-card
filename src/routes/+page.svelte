<script>
    let { data } = $props();

    const persons = data.persons;

    console.log(persons);
</script>

<div class="scene">
    <div class="cube">
        <div class="face front"></div>
        <div class="face right"></div>
        <div class="face back"></div>
        <div class="face left"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
    </div>
</div>

<style>
    .scene {
        --cube-size: 512px;
        --side-position: 2;

        .cube {
            width: var(--cube-size);
            height: var(--cube-size);
            position: absolute;
            top: 50%;
            left: 50%;
            transform-style: preserve-3d;
            transform: translate(-50%, -50%) rotateX(240deg) rotateY(120deg);
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
        transform: rotateX(-90deg)
            translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: pink;
    }
    .bottom {
        transform: rotateX(90deg) translateZ(calc(var(--cube-size) / var(--side-position)));
        background-color: orange;
    }
</style>
