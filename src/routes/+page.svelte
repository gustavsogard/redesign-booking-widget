<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let data;

	type Room = {
		id: number,
		name: string,
		price: number,
		image: string,
		description: string,
		meta: {size: number, people: number}[],
		availableRooms: number
	}

	let selects = [...data.rooms.map((room: Room) => {
		return {
			id: room.id,
			price: room.price,
			people: 2,
			rooms: '0'
		}
	})];

	let num_rooms = 0;
	let num_single_rooms = 0;
	let sum = 0;

	function onChange() {
		num_rooms = selects.reduce((a, b) => a + parseInt(b.rooms), 0);
		num_single_rooms = selects.filter(el => el.people === 1).reduce((a, b) => a + parseInt(b.rooms), 0);
		sum = selects.reduce((a, b) => a + b.price * parseInt(b.rooms), 0) - num_single_rooms * 100;
		console.log(selects);
	}
</script>

<svelte:head>
	<title>Book ophold på hotellet</title>
	<meta name="description" content="Demo redesign af booking-widget" />
</svelte:head>

<section>
	<div class="flex w-full justify-between items-center mb-8">
		<p class="font-['Inria_Serif'] font-bold text-2xl">
			Overnatning
		</p>
		<a class="btn btn-secondary" href="https://stammershalle-badehotel.dk/">
			<ChevronLeft /> Tilbage
		</a>
	</div>

	<div>
		<table>
			<colgroup>
				<col span="1">
				<col span="1" style="width: 40%;">
				<col span="1" style="width: 10%;">
				<col span="1" style="width: 10%;">
				<col span="1" style="width: 10%;">
				<col span="1" style="width: 10%;">
			 </colgroup>
			<tr class="border-2 border-[#a39070]">
				<th class="h-[60px]"></th>
				<th>Værelser & Suiter</th>
				<th class="min-w-fit">Antal gæster</th>
				<th>Pris</th>
				<th>Antal værelser</th>
				<th></th>
			</tr>
			{#each data.rooms as room}
				<tr>
					<td>
						<div class="flex relative items-center">
							<span class="arrow-btn left-2"><ChevronLeft color="#a39070" /></span>
							<img class="min-w-[200px] rounded-md" src={room.image} alt={room.name} />
							<span class="arrow-btn right-2"><ChevronRight color="#a39070" /></span>
						</div>
					</td>
					<td style="padding: 20px !important">
						<p class="font-['Inria_Serif'] font-bold text-xl mb-2">{room.name}</p>
						<p class="text-xs text-slate-400 mb-4">Max. {room.meta.people} pers.  |  {room.meta.size} m2</p>
						<p>{room.description}</p>
					</td>
					<td class="text-center">
						<select class="select" name="guests" id="guests" bind:value={selects[room.id-1].people} on:change={onChange}>
							{#each Array(room.meta.people) as _, i}
								<option value={i+1} selected={i+1 === 2}>{i+1}</option>
							{/each}
						</select>
					</td>
					<td class="text-center">
						<p>{room.price} kr.</p>
					</td>
					<td class="text-center">
						<select class="select" name="rooms" id="rooms" bind:value={selects[room.id-1].rooms} on:change={onChange}>
							<option value="0" selected>0</option>
							{#each Array(room.availableRooms) as _, i}
								<option value={i+1}>{i+1}</option>
							{/each}
						</select>
					</td>
				{#if room.id == 1}
					<td rowspan={data.rooms.length} class="align-top text-center" style="padding: 20px !important">
						<p>{num_rooms} værelse{num_rooms != 1 ? 'r': ''}</p>
						<p class="mb-4">{sum} kr.</p>
						<a class="btn btn-primary" style="display: block" href="https://stammershalle-badehotel.dk/book-ophold-paa-hotellet/">
							Book nu
						</a>
					</td>
				{/if}
				</tr>
			{/each}
		</table>
	</div>

</section>

<style>
	.btn {
		@apply flex rounded-md font-medium px-4 py-2 border-2 border-[#a39070] transition-all duration-100 ease-in-out;
	}

	.btn-primary {
		@apply bg-[#a39070] text-white;
	}

	.btn-primary:hover {
		@apply bg-white text-[#a39070];
	}

	.btn-secondary {
		@apply bg-white text-[#a39070];
	}

	.btn-secondary:hover {
		@apply bg-[#a39070] text-white;
	}

	.select {
		@apply border-2 border-[#a39070] rounded-md px-6 py-2 text-[#a39070] text-center;
	}

	.select:hover {
		cursor: pointer;
		background-color: #a3907020;
	}

	.arrow-btn {
		@apply absolute bg-white rounded-3xl p-1;
	}

	.arrow-btn:hover {
		cursor: pointer;
	}

	td {
		@apply p-2 border-2 border-[#a39070];
	}

	th {
		@apply text-left;
	}
</style>
