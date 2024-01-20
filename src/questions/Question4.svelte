<!-- 3つの単語の記憶（暗唱出来たら各1点） -->

<script>
    import { totalScore } from "../lib/counter";
    import { onMount, afterUpdate } from "svelte";
    import {wait} from "../lib/wait"
    import Question from "./Question.svelte";
    import { question } from "../lib/question";
    import {navigate} from "svelte-routing";
    import ConfirmButton from "../lib/ConfirmButton.svelte";
    import TextInput from "../lib/TextInput.svelte";
    const questions = [
        ["さくら", "ねこ", "でんしゃ"],
        ["うめ", "いぬ", "じどうしゃ"],
    ];
    $question = questions[Math.floor(Math.random() * questions.length)]

    $: inputWords = "";
    $: screenNumber = 0;

    onMount(async () => {
        await wait(10);
        screenNumber = 1;
    });

    afterUpdate(async () => {

        if(screenNumber == 1) {
            await wait(5);
            screenNumber = 2;
            inputWords="";
        }

        if(screenNumber == 3) {
            await wait(5);
            screenNumber = 4;
            inputWords="";
        }

        if(screenNumber == 5) {
            await wait(5);
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
    <h2><span style="color:red">あとでまた聞くのでよく覚えておいてください</span></h2>
 {/if}

 {#if screenNumber == 1}
    <h2><span style="color:deeppink;font-size:180%;">{$question[0]}</span></h2>
 {/if}

{#if screenNumber == 2}
    <TextInput bind:value={inputWords}/>
    <div class="button-container">
        <ConfirmButton onClick={() => {
            screenNumber = 3;
            if(inputWords == $question[0])$totalScore += 1;
        }}/>
    </div>
{/if}

{#if screenNumber == 3}
    <h2><span style="color:deeppink;font-size:180%;">{$question[1]}</span></h2>
{/if}

{#if screenNumber == 4}
    <TextInput bind:value={inputWords}/>
    <div class="button-container">
        <ConfirmButton onClick={() => {
            screenNumber = 5;
            if(inputWords == $question[1])$totalScore += 1;

        }}/>
    </div>
{/if}

{#if screenNumber == 5}
    <h2><span style="color:deeppink;font-size:180%;">{$question[2]}</span></h2>

{/if}

{#if screenNumber == 6}
    <TextInput bind:value={inputWords}/>
    <div class="button-container">
        <ConfirmButton onClick={() => {
            screenNumber = 7;
            if(inputWords == $question[2])$totalScore += 1;
            navigate("5");
        }}/>
    </div>



{/if}
</Question>

<style>
    .button-container {
        padding-top: 20px;
    }
</style>