<!-- 知っている野菜の名前を列挙（0から5→0点、6→1点、7→2点、8→3点、9→4点、10以上→5点） -->
<script>
    import Question from "./Question.svelte"
    import OpenAI from "openai";
    import {wait} from "../lib/wait";
    import {onMount, afterUpdate} from "svelte";
    import {navigate} from "svelte-routing";
    import axios from "axios";
    import {totalScore} from "../lib/counter"
    import { Spinner } from 'flowbite-svelte';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

    let inputVegetables = Array(10);
    $: leftTime = 0;
    let score = 0;
    let alreadySent = false;
    $: isCheckingAnwer = false;

    onMount( async() => {
        while(1) {
            leftTime++;
            await wait(1);

            if(leftTime == 10) {
                if(!alreadySent) await checkAnswer();
                navigate("/10");
            }
         }
    });

    async function checkAnswer() {
        alreadySent = true;
        isCheckingAnwer = true;
        for (let vegetable of inputVegetables) {
            if(!!vegetable) {
                const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: `この後送る単語が、野菜なら "1"、そうでないか空文字列なら "0"と答えてください。`}, {role: "user", content: vegetable}],
                model: "gpt-3.5-turbo",
            })
            const answer = completion.choices[0].message.content;
            score += Number(answer);
        }

        }

        if(score >= 5) {
            $totalScore += score - 5;
        }
        
            
    }

    function onChangeInput() {
        leftTime = 0;
    }

</script>

<Question number={9}>
    <h2>知っている野菜の名前をできるだけ多く入力してください</h2>
    {#if !isCheckingAnwer}
        {#each inputVegetables as inputVegetable, index}
            <input type="text" bind:value={inputVegetables[index]} on:change={onChangeInput}>
        {/each}
            
            <div><button on:click={async() => {
                await checkAnswer();
                navigate("10");
            }}>確定</button></div>
    {:else}
        <h3>答えの確認中</h3>
    {/if}

</Question>
