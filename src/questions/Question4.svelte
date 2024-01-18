<!-- 3つの単語の記憶（暗唱出来たら各1点） -->

<script>
    import { totalScore } from "../lib/counter";
    import { onMount, afterUpdate } from "svelte";
    import {wait} from "../lib/wait"
    import Question from "./Question.svelte";
    import { question } from "../lib/question";
    import {navigate} from "svelte-routing";
    const questions = [
        ["さくら", "ねこ", "でんしゃ"],
        ["うめ", "いぬ", "じどうしゃ"],
    ];
    $question = questions[Math.floor(Math.random() * questions.length)]

    $: inputWords = "";
    $: screenNumber = 0;

    onMount(async () => {
        await wait(5);
        screenNumber = 1;
    });

    afterUpdate(async () => {

        if(screenNumber == 1) {
            await wait(2);
            screenNumber = 2;
            inputWords="";
        }

        if(screenNumber == 3) {
            await wait(2);
            screenNumber = 4;
            inputWords="";
        }

        if(screenNumber == 5) {
            await wait(2);
            screenNumber = 6;
            inputWords="";
        }

    })

</script>
<Question
 number={4}
 >
 {#if screenNumber == 0}
    <h2>これから表示される言葉を音読してからひらがなで入力してください</h2>
    <h2>あとでまた聞くのでよく覚えておいてください</h2>
 {/if}

 {#if screenNumber == 1}
    <h2>{$question[0]}</h2>
 {/if}

{#if screenNumber == 2}
    <input type="text" bind:value={inputWords}/>
    <button on:click={() => {
        screenNumber = 3;
        if(inputWords == $question[0])$totalScore += 1;
    }}>確定</button>
{/if}

{#if screenNumber == 3}
    <h2>{$question[1]}</h2>
{/if}

{#if screenNumber == 4}
    <input type="text" bind:value={inputWords}/>
    <button on:click={() => {
        screenNumber = 5;
        if(inputWords == $question[1])$totalScore += 1;

    }}>確定</button>
{/if}

{#if screenNumber == 5}
    <h2>{$question[2]}</h2>
{/if}

{#if screenNumber == 6}
<input type="text" bind:value={inputWords}/>
<button on:click={() => {
    screenNumber = 7;
    if(inputWords == $question[2])$totalScore += 1;
    navigate("5");
}}>確定</button>

{/if}
</Question>

<style>
</style>