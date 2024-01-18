<!-- 100から7を順番に引く、93→1点、86→1点 -->
<script>
    import { totalScore } from "../lib/counter";
    import Question from "./Question.svelte";
    import {Router, Route, Link, navigate} from "svelte-routing";
    import {onMount} from "svelte";
    import {toHalfNum} from "../lib/toHalfNum";

    let inputAns;

    const questions = [{
        question: "100から7を引いてください",
        answer: 93,
    },{
        question: "先ほどの答えから更に7を引いてください",
        answer: 86
    }];

    $: nowQuestion = questions[0];


    function getanswer()
    {
        if(nowQuestion === questions[0]) {
            if(inputAns == questions[0].answer) {
                $totalScore += 1;
                nowQuestion = questions[1];
                inputAns="";
            }else {
                navigate("/6");
            }
        }else {
            if(inputAns == questions[1].answer) {
                $totalScore += 1;
                navigate("/6");
            }
        }
    }

</script>

<div>
    <Question
        number={5}
    >
    <div>
        <h2>{nowQuestion.question}</h2>
        <input type="text" bind:value={inputAns} on:change={() => {
            inputAns = toHalfNum(inputAns);
        }}/>
    </div>

    
        <div><button on:click={() => getanswer()}>確定</button></div>
    </Question>
</div>


<style>
</style>