<!-- 5つの品物の暗記テスト、みせたあとに隠してから出題（各1点） -->
<script>
    import { totalScore } from "../lib/counter";
    import { onMount } from "svelte";
    import {wait} from "../lib/wait"
    import Question from "./Question.svelte";
    import {navigate} from "svelte-routing";
    

    let inputThings = [];
    function getthings()
    {
        const values = ['とけい', 'かぎ', 'たばこ', 'えんぴつ', 'すいか'];


        values.forEach(
            (value) => {
            const result = inputThings.some(function(inputValue)
            {
                return value === inputValue;
            })
                if(result)$totalScore += 1;
            }
        )

        navigate("9");
    }

    $: screenNumber = 0;

    onMount(async () => {

        await wait(5);
        screenNumber = 1;
        await wait(10);
        screenNumber = 2;
    })

    </script>

<Question
 number={8}
 >
 {#if screenNumber == 0}
    <h2>次に表示する画像を10秒間で覚えてください。</h2>
 {/if}
 {#if screenNumber == 1}
    <div>
        <enhanced:img src="../assets/clock.png" alt="とけい"/>
        <enhanced:img src="../assets/cigarette.png" alt="たばこ"/>
        <enhanced:img src="../assets/key.png" alt="かぎ"/>
        <enhanced:img src="../assets/pencil.png" alt="えんぴつ"/>
        <enhanced:img src="../assets/watermelon.png" alt="すいか"/>
    </div>
 {/if}

{#if screenNumber == 2}
    <div>
        <h2>５つの物の中で覚えているものをひらがなで入力してください</h2>
        <input type="text" bind:value={inputThings[0]}/>
        <input type="text" bind:value={inputThings[1]}/>
        <input type="text" bind:value={inputThings[2]}/>
        <input type="text" bind:value={inputThings[3]}/>
        <input type="text" bind:value={inputThings[4]}/>
    </div>
    <div><button on:click={getthings}>確定</button></div>
{/if}


</Question>

<style>
    img {
        width: 200px;
        height: 200px;
    }
</style>