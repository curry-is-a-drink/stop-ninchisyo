<!-- 現在地の確認（自発的に答えられたら２点、ヒントありなら１点） -->

<script>
    import Question from "./Question.svelte"
    import jsonp from "../lib/getYahooAPI"
    import OpenAI from "openai";
    import axios from "axios";
    import {navigate} from "svelte-routing";
    import {totalScore} from "../lib/counter"
    import ConfirmButton from "../lib/ConfirmButton.svelte";
    import TextInput from "../lib/TextInput.svelte";
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

    let inputPrefecture;
    let inputCity;
    let inputBuilding;
    $: isInHome = false;

    async function getLocation() {
        const getCurrentPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }

        const position = await getCurrentPosition();

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        return await jsonp(latitude,longitude);
    }
        

    async function onConfirm() {
        const locationData = await getLocation();
        const correctAdress = locationData.ResultSet.Address.slice(0,2);
        const correctBuilding = locationData.ResultSet.Result;
        


        console.log(correctAdress, inputBuilding);

        let answer = 0;
        if(!isInHome) {
            const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `${correctBuilding} このデータに次の場所として区別できる場所が含まれたら"1"と答え、含まれなければ"0"と答えてください`}, {role: "user", content: inputBuilding}],
            model: "gpt-3.5-turbo",
        })
            answer = Number(completion.choices[0].message.content);
        }


        
        if(inputPrefecture == correctAdress[0] && correctAdress[1].includes(inputCity)) {
            if(isInHome) {
                $totalScore += 1;
            }else if(answer){
                $totalScore += 1;
            }
        }
        navigate("/4")
    }
</script>

<Question number={3}>
    <h2>今いる都道府県</h2>
    <TextInput bind:value={inputPrefecture}/>
    <h2>今いる市町村</h2>
    <TextInput bind:value={inputCity}/>
    <h2>今いる建物(例:病院)</h2>
    <TextInput bind:value={inputBuilding} disabled={isInHome}/>
    <div class="checkbox-container">
        <input type="checkbox" on:change={() => {isInHome = !isInHome}}>
            <div>自宅ならチェック</div>
    </div>
    <div class="button-container"><ConfirmButton onClick={onConfirm}/></div>
</Question>

<style>
    .checkbox-container {
        display: flex;
        padding-left: 90px;
    }
    .button-container {
        padding-top: 20px;
    }
</style>
