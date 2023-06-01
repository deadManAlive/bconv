<script>
    import { norm_b2d, f2b, b2f, exp2dcp } from "./func";

    let input_val = 0.0;
    let val_arr = [...f2b(0).binary];

    let mts_val = 0.0;
    let apx_val = 0.0;
    let val_ctr = 0.0;

    $: dbfs = 20 * Math.log10(Math.abs(apx_val));

    /**
     * @description Updater, called for text input to binary processing.
     */
    function forwardConvert() {
        const val_val = input_val ?? "0";
        val_ctr = +val_val;
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
            val_arr.slice(1, 9).join("") == "00000000"
                ? -126
                : parseInt(val_arr.slice(1, 9).join(""), 2) - 127;
        apx_val = sign * Math.pow(2, expv) * mts_val;

        val_ctr = b2f(val_arr.join(""));
        input_val = val_ctr.toString();
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
    <hr />
    <div class="input-field" width="100%">
        <input
            type="text"
            id="float-input"
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
                {#if val_arr[0] == "0"}
                    &plus;
                {:else}
                    &minus;
                {/if}
            </strong>
        </div>

        <div class="struct-div">
            <div class="bit-container">
                {#each val_arr.slice(1, 9) as exp_bit, idx}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="bit"
                        id="exponent"
                        on:click={(e) =>
                            arrayMod(idx + 1, (s) => {
                                return s == "1" ? "0" : "1";
                            })}
                    >
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
                    <div
                        class="bit"
                        id="mantissa"
                        on:click={(e) =>
                            arrayMod(idx + 9, (s) => {
                                return s == "1" ? "0" : "1";
                            })}
                    >
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
    <hr />
    <h2>
        <span style="color: #00d6e2;">
            {val_arr[0] == "0" ? 1 : -1}
        </span>
        &times;
        <span>
            2<sup style="color: #00cf1e;"
                >{val_arr.slice(1, 9).join("") == "00000000"
                    ? -126
                    : parseInt(val_arr.slice(1, 9).join(""), 2) - 127}</sup
            >
        </span>
        &times;
        <span style="color: #d60300;">
            {mts_val}
        </span>
        &equals;
        {#if val_arr.join("") == "00000000000000000000000000000000"}
            0
        {:else if val_arr.join("") == "10000000000000000000000000000000"}
            -0
        {:else if val_arr.slice(1, 9).join("") != "11111111"}
            {exp2dcp(apx_val.toExponential()).mantissa}
            {#if exp2dcp(apx_val.toExponential()).exponent != 0}
                &times; 10{#if exp2dcp(apx_val.toExponential()).exponent != 1}<sup
                    >
                        {exp2dcp(apx_val.toExponential()).exponent}
                    </sup>{/if}
            {/if}
        {:else if val_arr.slice(9).includes("1")}
            NaN
        {:else}
            {#if val_arr[0] == "1"}
                -
            {/if}
            &infin;
        {/if}
    </h2>
    <h2>
        <span
            title="Against numerical input, should be zero when using per bit input"
            >&Delta;</span
        >
        &equals;
        {#if val_arr.slice(1, 9).join("") != "11111111"}
            {Math.abs(apx_val - val_ctr).toFixed(12)} ({(
                Math.abs(apx_val - val_ctr) /
                (Math.abs(val_ctr) === 0 ? 1 : val_ctr)
            ).toFixed(12)} &percnt;)
        {:else if val_arr.slice(9).includes("1")}
            Not Applicable
        {:else}
            {#if val_arr[0] == "1"}
                -
            {/if}
            &infin;
        {/if}
    </h2>
    <h2>
        <span title="Against normalized range of |1.0|"
            >L<sub><small>dBFS</small></sub></span
        >
        = {#if apx_val == 0}
            -&infin; dBFS
        {:else if val_arr.slice(1, 9).join("") == "11111111"}
            {#if val_arr.slice(9).includes("1")}
                Not Applicable
            {:else}
                <span class="db-over">&infin;</span> dBFS
            {/if}
        {:else}
            <span class:db-over={dbfs > 1.0}>
                {dbfs.toFixed(3)}
            </span> dBFS
        {/if}
    </h2>
    <hr />
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
    .input-field {
        width: 100%;
    }
    @media screen and (min-width: 768px) {
        .input-field {
            width: 50%;
        }
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
        font-size: 12pt;
        width: 20px;
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
    .db-over {
        color: crimson;
    }
</style>
