<!-- 100から7を順番に引く、93→1点、86→1点 -->
<script>
    import { totalScore } from "../lib/counter";
    import Question from "./Question.svelte";
    import {Router, Route, Link, navigate} from "svelte-routing";
    import {onMount} from "svelte";
    import {toHalfNum} from "../lib/toHalfNum";
    import ConfirmButton from "../lib/ConfirmButton.svelte";
    import TextInput from "../lib/TextInput.svelte";

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
            }
            navigate("/6");
        }
    }

</script>

<div>
    <Question
        number={5}
    >
    <div>
        <h2>{nowQuestion.question}</h2>
        <TextInput bind:value={inputAns} onChange={() => {
            inputAns = toHalfNum(inputAns);
        }}/>
    </div>

    
        <div class="button-container"><ConfirmButton onClick={getanswer} /></div>
    </Question>
</div>


<style>
    .button-container {
        padding-top: 20px;
    }
</style>