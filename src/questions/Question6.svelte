<!-- 数字を逆唱 6-8-2→1点、3-5-2-9→1点 -->
<script>
    import { totalScore } from "../lib/counter";
    import Question from "./Question.svelte";
    import {Router, Route, Link, navigate} from "svelte-routing";
    import {wait} from "../lib/wait";
    import { onMount, afterUpdate } from "svelte";
    import {toHalfNum} from "../lib/toHalfNum";
    import ConfirmButton from "../lib/ConfirmButton.svelte";
    import TextInput from "../lib/TextInput.svelte";

    let inputAns;

    const questions = [{
        question1: "6-8-2",
    },{
        question2: "3-5-2-9",
    }];

    $: nowQuestion = questions[0];

    function getanswer()
    {
        if(nowQuestion === questions[0]) {
            if(inputAns == "2-8-6") {
                $totalScore += 1;                
            }
            nowQuestion = questions[1];

            
        }else {
            if(inputAns == "9-2-5-3") {
                $totalScore += 1;

            }
            navigate("7")
        }
    }

    $: screenNumber = 0;

    onMount(async () => {

        await wait(5);
        screenNumber = 1;
        await wait(5);
        screenNumber = 2;


    })

    afterUpdate(
        async () => {
            if(screenNumber == 3)
            {
                await wait(5);
                inputAns="";
                screenNumber = 4;
            }   
        }
    )

</script>

<Question
    number={6}
    >
    {#if screenNumber == 0}
    <h2>これから表示される数字を逆から読み上げ、入力してください</h2>
    {/if}

    {#if screenNumber == 1}
    <div>
        <h2><span style="color:deeppink;font-size:180%;">{nowQuestion.question1}</span></h2>
    </div>
    {/if}

    {#if  screenNumber == 2}
    <div>
        <h2>入力例：〇-〇-〇</h2>
        <TextInput bind:value={inputAns} onChange={() => {
            inputAns = toHalfNum(inputAns);
        }}/>
        <div class="button-container">
            <ConfirmButton onClick={() =>{screenNumber=3; getanswer()}} />
        </div>
    </div>
    {/if}

    {#if screenNumber == 3}
    <div>
        <h2><span style="color:deeppink;font-size:180%;">{nowQuestion.question2}</span></h2>
    </div>
    {/if}

    {#if  screenNumber == 4}
    <div>
        <h2>入力例：〇-〇-〇-〇</h2>
        <TextInput bind:value={inputAns} onChange={() => {
            inputAns = toHalfNum(inputAns);
        }}/>
        <div class="button-container">
            <ConfirmButton onClick={() => getanswer()}/>
        </div>
    </div>
    {/if}
</Question>

<style>
    .button-container {
        padding-top: 20px;
    }
</style>
