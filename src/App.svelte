<script>
	let input_val = 0.0;
	$: val_val = input_val === null ? '0' : input_val;
	
	$: b_repr = f2b(val_val);
	
	let imp_b = 0;
	let mts_val = 0.0;
	
	$: {
		imp_b = b_repr.exponent == '00000000'? '0' : '1';
		let bdvl = imp_b + '.' + b_repr.mantissa;
		
		mts_val = norm_b2d(bdvl);
	}
	
	function f2b(val) {
    const f32repr = new Float32Array([val]);
    const u32repr = new Uint32Array(f32repr.buffer);
  
    let qtn = u32repr[0];
    let res = "";
    while(true) {
        let rem = qtn % 2;
        res += rem;

        qtn = Math.floor(qtn / 2);
  
        if (qtn < 1) {
            break;
        }
    }

    while (res.length < 32) {
        res += "0";
    }

    res =  res.split("").reverse().join("");
		
		return {
			binary: res,
			sign: res[0],
			exponent: res.slice(1,9),
			mantissa: res.slice(9)
		};
	}
	
	function norm_b2d(val) {
		const valarr = val.split(".");

		const dec = parseInt(valarr[0], 2);
		if (dec > 1) {
			throw new Error("This function only works for normalized value!");
		}

		const dval = valarr.join("");
		let res = 0;

		for(let i = 0; i < dval.length; i++) {
			res += (+dval[i]) * Math.pow(2, -i);
		}

		return res;
	}
</script>

{@debug input_val}

<div>
	<div width="100%">
		<input type="text" id="input" bind:value={input_val} placeholder="Insert float here...">
	</div>
	
	<h2>Binary: <code>{b_repr.binary}</code></h2>
	<div class="output-container">
		
		<div id="sign-container">
			<div class = "bit" id="sign">
			<p>{b_repr.sign}</p>
			</div>
			<strong>
				{b_repr.sign === '0' ? '+' : '-'}
			</strong>
		</div>
		
		<div class="struct-div">
			<div class="bit-container">
				{#each b_repr.exponent as exp_bit}
				<div class = "bit" id="exponent">
					<p>{exp_bit}</p>
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
						<p>{mts_bit}</p>
					</div>
				{/each}
			</div>
			<strong>
				{imp_b} + {norm_b2d('0.' + b_repr.mantissa)}
			</strong>
		</div>
	</div>
	<h2>
		<span>
			{b_repr.sign === '0' ? 1 : -1}
		</span>
		&times;
		<span>
			2<sup>{Math.abs(val_val) === 0 ? -126 : parseInt(b_repr.exponent, 2) - 127}</sup>
		</span>
		&times;
		{mts_val}
		= {val_val}
	</h2>
</div>

<style>
	#sign {
		background-color: #c5fcff;
	}
	#exponent {
		background-color: #9fffad;
	}
	#mantissa {
		background-color: #ffaead;
	}
	#input {
		width: 50%;
	}
	.output-container {
		display: flex;
	}
	.bit {
		border: 1px solid;
		margin: 0 1px 0 0;
		padding: 0 4px 0 4px;
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