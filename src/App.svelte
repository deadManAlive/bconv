<script>
    import {norm_b2d, f2b, b2f} from './func';

	let input_val = 0.0;
    let val_arr = [];

	$: val_val = input_val === null ? '0' : input_val;
	
	$: b_repr = f2b(val_val);
	
	$: imp_b = b_repr.exponent == '00000000'? '0' : '1';

	let mts_val = 0.0;
	let apx_val = 0.0;

	$: {
		const bdvl = imp_b + '.' + b_repr.mantissa;
		mts_val = norm_b2d(bdvl);

        const sign = b_repr.sign == '1' ? -1 : 1;
        const expv = b_repr.exponent == '00000000' ? -126 : parseInt(b_repr.exponent, 2) - 127;
        apx_val = sign * Math.pow(2, expv) * mts_val;

        val_arr = [...f2b(val_val).binary];
    }

    $: console.log(val_arr.join(""), b2f(val_arr.join("")));
    
    /**
     * 
     * @param {number} idx
     * @param {function(string):string} modifier
     */
    function arrayMod(idx, modifier) {
        val_arr[idx] = modifier(val_arr[idx]);
    }
</script>

<div>
    <h1>
        <code>float32</code>
    </h1>
	<div width="100%">
		<input type="text" id="input" bind:value={input_val} placeholder="Insert float here..." style="width: 100%;">
	</div>
	
	<h2>Binary: <code>{b_repr.binary}</code></h2>
	<div class="output-container">
		
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div id="sign-container" on:click={e => arrayMod(0, (s) => {return s == '1' ? '0' : '1';})}>
			<div class = "bit" id="sign">
			<code>{b_repr.sign}</code>
			</div>
			<strong>
				{b_repr.sign == '0' ? '+' : '-'}
			</strong>
		</div>
		
		<div class="struct-div">
			<div class="bit-container">
				{#each b_repr.exponent as exp_bit}
				<div class = "bit" id="exponent">
					<code>{exp_bit}</code>
				</div>
			{/each}
			</div>
			<strong>
				{parseInt(b_repr.exponent, 2)}
			</strong>
		</div>
		
		<div class="struct-div">
			<div class="bit-container">
				{#each b_repr.mantissa as mts_bit}
					<div class = "bit" id="mantissa">
						<code>{mts_bit}</code>
					</div>
				{/each}
			</div>
			<strong>
                {imp_b} + {norm_b2d('0.' + b_repr.mantissa)}
                {#if imp_b == '0' && b_repr.mantissa.includes('1')}
                    <small>(Denormal)</small>
                {/if}
			</strong>
		</div>
	</div>
	<h2>
		<span>
			{b_repr.sign == '0' ? 1 : -1}
		</span>
		&times;
		<span>
			2<sup>{b_repr.exponent == '00000000' ? -126 : parseInt(b_repr.exponent, 2) - 127}</sup>
		</span>
		&times;
		{mts_val}
		&equals;
        {#if b_repr.exponent != '11111111'}
            {apx_val}
        {:else if b_repr.mantissa.includes('1')}
            NaN
        {:else}
            {#if b_repr.sign == '1'}
                &minus;
            {/if}
            &infin;
        {/if}
	</h2>
    <h2>
        &Delta; &equals;
        {#if b_repr.exponent != '11111111'}
            {Math.abs(apx_val - val_val).toFixed(12)} ({(Math.abs(apx_val - val_val) / (Math.abs(val_val) === 0 ? 1 : val_val)).toFixed(12)} &percnt;)
        {:else if b_repr.mantissa.includes('1')}
            Not Applicable
        {:else}
            {#if b_repr.sign == '1'}
                &minus;
            {/if}
            &infin;
        {/if}
    </h2>
</div>

<style>
    #sign, #exponent, #mantissa {
        cursor: pointer;
    }
	#sign {
		background-color: #c5fcff;
	}
    #sign:hover{
        background-color: #00d6e2;
    }
	#exponent {
		background-color: #9fffad;
	}
    #exponent:hover {
		background-color: #00cf1e;
	}
	#mantissa {
		background-color: #ffaead;
	}
    #mantissa:hover {
		background-color: #d60300;
	}
	#input {
		width: 50%;
	}
	.output-container {
		display: flex;
        flex-wrap: wrap;
	}
	.bit {
		border: 1px solid;
		margin: 0 1px 0 0;
		padding: 0 4px 0 4px;
        user-select: none;
        height: 30px;
        text-align: center;
	}
	#sign-container strong {
		width: 100%;
		text-align: center;
		margin: 0 1px 0 0;
		padding: 0 4px 0 4px;
	}
	.bit-container {
		display: flex;
	}
    .bit code {
        height: 20px;
    }
	.struct-div {
		display: flex;
		flex-direction: column;
	}
	.struct-div strong {
		margin-top: 2px;
		width: 100%;
		text-align: center;
	}
</style>