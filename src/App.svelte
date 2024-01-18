<script>
    import Question1 from "./questions/Question1.svelte";
    import Question2 from "./questions/Question2.svelte";
    import Question3 from "./questions/Question3.svelte";
    import Question4 from "./questions/Question4.svelte";
    import Question5 from "./questions/Question5.svelte";
    import Question6 from "./questions/Question6.svelte";
    import Question7 from "./questions/Question7.svelte";
    import Question8 from "./questions/Question8.svelte";
    import Question9 from "./questions/Question9.svelte";
    import Finalscore from "./questions/Finalscore.svelte";
    import {onMount} from "svelte";
    import {Router, Route, Link, navigate} from "svelte-routing";
    import { totalScore } from "./lib/counter";





</script>

<Router>
  <main>
    <h2>合計スコア{$totalScore}</h2>
    <Route path={"/"}>
      <h1>認知症テスト</h1>
      <button on:click={() => {navigate("1")}}>開始</button>
    </Route>
    <Route path={"1"}><Question1/></Route>  
    <Route path={"2"}><Question2/></Route>
    <Route path={"3"}><Question3/></Route>  
    <Route path={"4"}><Question4/></Route>
    <Route path={"5"}><Question5/></Route>  
    <Route path={"6"}><Question6/></Route>
    <Route path={"7"}><Question7/></Route>  
    <Route path={"8"}><Question8/></Route>
    <Route path={"9"}><Question9/></Route> 
    <Route path={"10"}><Finalscore/></Route>  
  </main>
</Router>
<style></style>