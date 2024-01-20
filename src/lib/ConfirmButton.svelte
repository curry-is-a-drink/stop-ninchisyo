<script>
    export let onClick;
</script>

<button class="button" on:click={onClick}>
    <div class="inner-text">確定</div>
</button>

<style>
.button {
    width: 80%;
    height: 70px;
    background-color: rgb(135, 216, 246);
}

.inner-text {
    font-size: xx-large;
}
</style>