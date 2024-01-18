<!-- 項目4の3単語記憶（自発的に答えられたら各2点、ヒントありで1点） -->
<script>
    import { totalScore } from "../lib/counter";
    import {question} from "../lib/question";

    import { onMount } from "svelte";
    import { wait } from "../lib/wait"
    import Question from "./Question.svelte";
    import { navigate } from "svelte-routing";
    
    $: screenNumber = 0;
    let inputWord;

    let answerTime = 0;
    

    $: hints = [
        {
            str: "植物",
            show: false,
            answerd: false,
        }, 
        {
            str: "動物",
            show: false,
            answerd: false,
        }, 
        {
            str: "乗り物",
            show: false,
            answerd: false,
        }, 
    ];

    const getHint = () => {
        const index =  hints.findIndex(
            (hint) => {
                if(hint.answerd == false) {
                    return true;
                }
            }
        )
        if(index == -1) return 0;
        return index;
    }

    const checkAnswer = (answer) => {
        return $question.indexOf(answer);
    }

    </script>

<Question
 number={7}
 >
 <h2>質問4で先ほど覚えてもらった言葉をもう一度入力してください</h2>
    {#if hints[getHint()].show}
        <p>ヒント: {hints[getHint()].str}</p>
    {/if}
    <h3>{answerTime + 1}つ目</h3>
    <input type="text" bind:value={inputWord}>

    <button on:click={
        () => {
            hints[getHint()].show = true;
        }
    }>ヒント</button>
    <div><button on:click={
        () => {
            const index = checkAnswer(inputWord);
            answerTime++;

            if(index >=  0){
                if(!hints[index].answerd) {
                    hints[index].answerd = true;
                    if(hints[index].show == true) $totalScore += 1;
                    else $totalScore += 2;
                }
            }
            inputWord ="";

            if(answerTime > 2) {
                navigate("8");
            }
        }
    }>確定</button></div>
</Question>

<style>
    
</style>