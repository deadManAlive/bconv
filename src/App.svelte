<script>
    import { norm_b2d, f2b, b2f } from "./func";

    let input_val = 0.0;
    let val_arr = [...f2b(0).binary];

    let mts_val = 0.0;
    let apx_val = 0.0;

    $: val_val = input_val === null ? "0" : input_val;

    /**
     * @description Updater, called for text input to binary processing.
     */
    function forwardConvert() {
        const b_repr = f2b(val_val);
        const imp_b = b_repr.exponent == "00000000" ? "0" : "1";
        const bdvl = imp_b + "." + b_repr.mantissa;
        mts_val = norm_b2d(bdvl);

        const sign = b_repr.sign == "1" ? -1 : 1;
        const expv =
            b_repr.exponent == "00000000"
                ? -126
                : parseInt(b_repr.exponent, 2) - 127;
        apx_val = sign * Math.pow(2, expv) * mts_val;

        val_arr = [...f2b(val_val).binary];
    }

    /**
     * @description Updater, called for per bit input processing.
     */
    function backwardConvert() {
        const mtsb = val_arr.slice(9).join("");
        const imp_b = val_arr.slice(1, 9).join("") == "00000000" ? "0" : "1";
        const bdvl = imp_b + "." + mtsb;
        mts_val = norm_b2d(bdvl);

        const sign = val_arr[0] == "1" ? -1 : 1;
        const expv =
            val_arr.slice(1,9).join("") == "00000000"
                ? -126
                : parseInt(val_arr.slice(1,9).join(""), 2) - 127;
        apx_val = sign * Math.pow(2, expv) * mts_val;
    }

    /**
     *
     * @param {number} idx
     * @param {function(string):string} modifier
     */
    function arrayMod(idx, modifier) {
        const newv = [...val_arr];
        newv[idx] = modifier(newv[idx]);
        val_arr = [...newv];
        backwardConvert();
    }
</script>

<div>
    <h1>
        <code>float32</code>
    </h1>
    <div width="100%">
        <input
            type="text"
            id="input"
            bind:value={input_val}
            placeholder="Insert float here..."
            style="width: 100%;"
            on:input={forwardConvert}
        />
    </div>

    <h2>Binary: <code>{val_arr.join("")}</code></h2>
    <div class="output-container">
        <div id="sign-container">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="bit"
                id="sign"
                on:click={(e) =>
                    arrayMod(0, (s) => {
                        return s == "1" ? "0" : "1";
                    })}
            >
                <code>{val_arr[0]}</code>
            </div>
            <strong>
                {val_arr[0] == "0" ? "+" : "-"}
            </strong>
        </div>

        <div class="struct-div">
            <div class="bit-container">
                {#each val_arr.slice(1, 9) as exp_bit, idx}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="bit" id="exponent" on:click={(e) =>
                        arrayMod(idx + 1, (s) => {
                            return s == "1" ? "0" : "1";
                        })}>
                        <code>{exp_bit}</code>
                    </div>
                {/each}
            </div>
            <strong>
                {parseInt(val_arr.slice(1, 9).join(""), 2)}
            </strong>
        </div>

        <div class="struct-div">
            <div class="bit-container">
                {#each val_arr.slice(9) as mts_bit, idx}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="bit" id="mantissa" on:click={(e) =>
                        arrayMod(idx + 9, (s) => {
                            return s == "1" ? "0" : "1";
                        })}>
                        <code>{mts_bit}</code>
                    </div>
                {/each}
            </div>
            <strong>
                {val_arr.slice(1, 9).join("") == "00000000" ? "0" : "1"} + {norm_b2d(
                    "0." + val_arr.slice(9).join("")
                )}
                {#if val_arr.slice(1, 9).join("") == "00000000" && val_arr
                        .slice(9)
                        .includes("1")}
                    <small>(Denormal)</small>
                {/if}
            </strong>
        </div>
    </div>
    <h2>
        <span>
            {val_arr[0] == "0" ? 1 : -1}
        </span>
        &times;
        <span>
            2<sup
                >{val_arr.slice(1, 9).join("") == "00000000"
                    ? -126
                    : parseInt(val_arr.slice(1, 9).join(""), 2) - 127}</sup
            >
        </span>
        &times;
        {mts_val}
        &equals;
        {#if val_arr.join("") == "10000000000000000000000000000000"}
            -0
        {:else if val_arr.slice(1, 9).join("") != "11111111"}
            {apx_val}
        {:else if val_arr.slice(9).includes("1")}
            NaN
        {:else}
            {#if val_arr[0] == "1"}
                &minus;
            {/if}
            &infin;
        {/if}
    </h2>
    <h2>
        &Delta; &equals;
        {#if val_arr.slice(1, 9).join("") != "11111111"}
            {Math.abs(apx_val - val_val).toFixed(12)} ({(
                Math.abs(apx_val - val_val) /
                (Math.abs(val_val) === 0 ? 1 : val_val)
            ).toFixed(12)} &percnt;)
        {:else if val_arr.slice(9).includes("1")}
            Not Applicable
        {:else}
            {#if val_arr[0] == "1"}
                &minus;
            {/if}
            &infin;
        {/if}
    </h2>
</div>

<style>
    #sign,
    #exponent,
    #mantissa {
        cursor: pointer;
    }
    #sign {
        background-color: #c5fcff;
    }
    #sign:hover {
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
