<!--年はいくつか（前後２歳までの誤差は正解）-->

<script>
    import { totalScore } from "../lib/counter";
    import Question from "./Question.svelte";
    import {toHalfNum} from "../lib/toHalfNum";
    import {navigate} from "svelte-routing";
    let inputAge;
    let inputBirthday;
    function getAge(year, month, day) {

        // 今日の日付データを取得
        const today = new Date();

        // 生年月日の日付データを取得
        const birthdate = new Date(year, month - 1, day);

        // 今年の誕生日の日付データを取得
        const currentYearBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());

        // 生まれた年と今年の差を計算
        let age = today.getFullYear() - birthdate.getFullYear();

        // 今日の日付と今年の誕生日を比較
        if (today < currentYearBirthday) {
        // 今年誕生日を迎えていない場合、1を引く
        age--;
        }

        // 年齢の値を返す
        return age;
    }

    function onConfirm() {
        const today = new Date(Date.now());
        const year = today.getFullYear();   
        const month = today.getMonth() + 1;
        const date = today.getDate();

        const inputYear = Number(inputBirthday.slice(0,4));
        const inputMonth = Number(inputBirthday.slice(5,7));
        const inputDate = Number(inputBirthday.slice(8,10));

        const age = getAge(inputYear,inputMonth, inputDate);
        const difference = age - inputAge;
        if(difference <= 2 && difference >= -2) $totalScore += 1;
        navigate("2");

    }
</script>

<div>
    <Question
        number={1}
    >
        <h2>年齢はいくつですか</h2>
        <input type="text" bind:value={inputAge} on:change={() => {
            inputAge = toHalfNum(inputAge);
        }}/>
        <h2>生年月日を答えてください</h2>
        <input type="date" bind:value={inputBirthday}>  
    
        <div class="button-container"><button on:click={onConfirm}>確定</button></div>
    </Question>
</div>


<style>
    .button-container {
        padding-top: 20px;
    }
</style>