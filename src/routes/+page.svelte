<script>
    let { data } = $props();

    const persons = data.persons;

    console.log(persons)
</script>

{#each persons as person }
    <p>{person.name} - {person.fav_movie}</p>

{/each}

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
