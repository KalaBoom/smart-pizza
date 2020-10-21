<template>
    <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <img src="../assets/pizza-slice.svg" alt="Иконка пиццы" class="small_img">
                <div class="modal-text">
                    <slot></slot>
                </div>
                <div class="modal-block-btn">
                    <button class="modal-default-button" @click="$emit('close')">
                    OK
                    </button>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<style lang="scss">
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: flex;
        align-items: center;
    }

    .modal-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 30%;
        margin: 2em auto 0;
        padding: 2em 3em;
        background-color: #fff;
        border-radius: 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }
    .modal-text {
        font-size: 2rem;
    }
    .modal-enter {
        opacity: 0;
    }
    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>