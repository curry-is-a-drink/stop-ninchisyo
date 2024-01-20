<script>
    export let value;
    export let onChange = () => null;
    export let disabled = false;
</script>

<input type="text" bind:value={value} on:change={onChange} disabled={disabled}/>

<style>
    input {
        height: 30px;
        width: 50%;
        font-size: xx-large;
    }
</style>