<!-- 今日は何日か（年、月、日、曜日各１点として扱う） -->

<script>
    import { totalScore } from "../lib/counter";
    import Question from "./Question.svelte";
    import {navigate} from "svelte-routing";
    import {toHalfNum} from "../lib/toHalfNum";
    import ConfirmButton from "../lib/ConfirmButton.svelte";
    import TextInput from "../lib/TextInput.svelte";
    let inputYear;
    let inputMonth;
    let inputDate;
    let inputDay;
    let weekdays = ["日","月","火","水","木","金","土"]; 
    let days = [...Array(31)].map((_, i) => i + 1);
    let months = [...Array(12)].map((_, i) => i + 1);

    function getdate()
    {
        //今日の日付を取得できるnew Dateを格納
        const today = new Date();

        //年・月・日・曜日を取得
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const day = today.getDay();

        const numYear = Number(inputYear);
        const numMonth = Number(inputMonth);
        const numDate = Number(inputDate);
    

        const inputDayNum = weekdays.indexOf(inputDay);

        if(year == inputYear) $totalScore += 1;
        if(month == inputMonth) $totalScore += 1;
        if(date == inputDate) $totalScore += 1;
        if(day == inputDayNum) $totalScore += 1;
        navigate("3");
    }

    </script>

<Question
 number={2}
 >
 <h2>今日は何年か</h2>
 <TextInput value={inputYear} onChange={() => {
    inputYear = toHalfNum(inputYear);
}}/>年
 <h2>今日は何月か</h2>

 <select bind:innerText={inputMonth} contenteditable="true">
    {#each months as month}
        <option value={month}>{month}</option>
    {/each}
</select>
 <h2>今日は何日か</h2>
    <select bind:innerText={inputDate} contenteditable="true">
        {#each days as day}
            <option value={day}>{day}</option>
        {/each}
    </select>
 <h2>今日は何曜日か</h2>
    <select bind:innerText={inputDay} contenteditable="true">
        {#each weekdays as weekday}
            <option value={weekday}>{weekday}</option>
        {/each}
    </select>
 <div class="button-container"><ConfirmButton onClick={getdate}/></div>
</Question>

<style>
    .button-container {
        padding-top: 20px;
    }

    select {
        font-size: xx-large;
    }
</style>