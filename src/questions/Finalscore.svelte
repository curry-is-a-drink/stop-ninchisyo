<script>
    import { totalScore } from "../lib/counter";
   
</script>

<div>
    {#if $totalScore <= 20}
        <h2>認知症の可能性が高いです</h2>
    {:else}
        <h2>認知症の可能性は低いです</h2>
    {/if}
    
</div>    