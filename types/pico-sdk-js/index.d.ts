// THIS FILE IS AUTOGENERATED
// Do not directly modify this file. Instead, consider adding to
// /script/native-modules.json or the /script/*.handlebars templates
// within the https://github.com/pico-sdk-js/pico-sdk-js-engine repository.
//
// To regenerate these files run 'node build --gen'
//

// global module

declare function require(id: string): any;

declare function print(...data: any[]): void;

// highlevel module
declare module "pico/highlevel" {
    type absolute_time_t = number;

    /**
     * Wait until after the given timestamp to return.
     * @param { absolute_time_t } target The time after which to return.
     */
    function sleep_until(target: absolute_time_t): void;

    /**
     * Wait for the given number of microseconds before returning.
     * @param { uint64_t } us The number of microseconds to sleep.
     */
    function sleep_us(us: number): void;

    /**
     * Wait for the given number of milliseconds before returning.
     * @param { uint32_t } ms The number of milliseconds to sleep.
     */
    function sleep_ms(ms: number): void;

    /**
     * Helper method for blocking on a timeout.
     * @param { absolute_time_t } timeout_timestamp The timeout time.
     * @returns { bool } True if the target time is reached, false otherwise .
     */
    function best_effort_wfe_or_timeout(timeout_timestamp: absolute_time_t): boolean;
}

// hardware module
declare module "pico/hardware" {
    type resus_callback_t = () => void;

    type gpio_irq_callback_t = (gpio: number, event_mask: number) => void;

    type hardware_alarm_callback_t = (alarm_num: number) => void;

    /**
     * Initialise the ADC HW.
     */
    function adc_init(): void;

    /**
     * Initialise the gpio for use as an ADC pin.
     * @param { uint32_t } gpio The GPIO number to use. Allowable GPIO numbers are 26 to 29 inclusive.
     */
    function adc_gpio_init(gpio: number): void;

    /**
     * ADC input select.
     * @param { uint32_t } input Input to select.
     */
    function adc_select_input(input: number): void;

    /**
     * Get the currently selected ADC input channel.
     * @returns { uint } The currently selected input channel. 0...3 are GPIOs 26...29 respectively. Input 4 is the onboard temperature sensor. .
     */
    function adc_get_selected_input(): number;

    /**
     * Round Robin sampling selector.
     * @param { uint32_t } input_mask A bit pattern indicating which of the 5 inputs are to be sampled. Write a value of 0 to disable round robin sampling.
     */
    function adc_set_round_robin(input_mask: number): void;

    /**
     * Enable the onboard temperature sensor.
     * @param { bool } enable Set true to power on the onboard temperature sensor, false to power off.
     */
    function adc_set_temp_sensor_enabled(enable: boolean): void;

    /**
     * Perform a single conversion.
     * @returns { uint16_t } Result of the conversion. .
     */
    function adc_read(): number;

    /**
     * Enable or disable free-running sampling mode.
     * @param { bool } run False to disable, true to enable free running conversion mode.
     */
    function adc_run(run: boolean): void;

    /**
     * Set the ADC Clock divisor.
     * @param { float } clkdiv If non-zero, conversion will be started at intervals rather than back to back.
     */
    function adc_set_clkdiv(clkdiv: number): void;

    /**
     * Setup the ADC FIFO.
     * @param { bool } en Enables write each conversion result to the FIFO.
     * @param { bool } dreq_en Enable DMA requests when FIFO contains data.
     * @param { uint16_t } dreq_thresh Threshold for DMA requests/FIFO IRQ if enabled.
     * @param { bool } err_in_fifo If enabled, bit 15 of the FIFO contains error flag for each sample.
     * @param { bool } byte_shift Shift FIFO contents to be one byte in size (for byte DMA) - enables DMA to byte buffers.
     */
    function adc_fifo_setup(
        en: boolean,
        dreq_en: boolean,
        dreq_thresh: number,
        err_in_fifo: boolean,
        byte_shift: boolean,
    ): void;

    /**
     * Check FIFO empty state.
     * @returns { bool } Returns true if the FIFO is empty .
     */
    function adc_fifo_is_empty(): boolean;

    /**
     * Get number of entries in the ADC FIFO.
     */
    function adc_fifo_get_level(): number;

    /**
     * Get ADC result from FIFO.
     */
    function adc_fifo_get(): number;

    /**
     * Wait for the ADC FIFO to have data.
     */
    function adc_fifo_get_blocking(): number;

    /**
     * Drain the ADC FIFO.
     */
    function adc_fifo_drain(): void;

    /**
     * Enable/Disable ADC interrupts.
     * @param { bool } enabled Set to true to enable the ADC interrupts, false to disable.
     */
    function adc_irq_set_enabled(enabled: boolean): void;

    /**
     * Initialise the clock hardware.
     */
    function clocks_init(): void;

    /**
     * Configure the specified clock.
     * @param { uint32_t } clk_index The clock to configure.
     * @param { uint32_t } src The main clock source, can be 0.
     * @param { uint32_t } auxsrc The auxiliary clock source, which depends on which clock is being set. Can be 0.
     * @param { uint32_t } src_freq Frequency of the input clock source.
     * @param { uint32_t } freq Requested frequency.
     */
    function clock_configure(clk_index: number, src: number, auxsrc: number, src_freq: number, freq: number): boolean;

    /**
     * Stop the specified clock.
     * @param { uint32_t } clk_index The clock to stop.
     */
    function clock_stop(clk_index: number): void;

    /**
     * Get the current frequency of the specified clock.
     * @param { uint32_t } clk_index Clock.
     * @returns { uint32_t } Clock frequency in Hz .
     */
    function clock_get_hz(clk_index: number): number;

    /**
     * Measure a clocks frequency using the Frequency counter.
     * @param { uint32_t } src
     */
    function frequency_count_khz(src: number): number;

    /**
     * Set the &quot;current frequency&quot; of the clock as reported by clock_get_hz without actually changing the clock.
     * @param { uint32_t } clk_index
     * @param { uint32_t } hz
     */
    function clock_set_reported_hz(clk_index: number, hz: number): void;

    /**
     * Enable the resus function. Restarts clk_sys if it is accidentally stopped.
     * @param { resus_callback_t } resus_callback A function pointer provided by the user to call if a resus event happens.
     */
    function clocks_enable_resus(resus_callback: resus_callback_t): void;

    /**
     * Output an optionally divided clock to the specified gpio pin.
     * @param { uint32_t } gpio The GPIO pin to output the clock to. Valid GPIOs are: 21, 23, 24, 25. These GPIOs are connected to the GPOUT0-3 clock generators.
     * @param { uint32_t } src The source clock. See the register field CLOCKS_CLK_GPOUT0_CTRL_AUXSRC for a full list. The list is the same for each GPOUT clock generator.
     * @param { uint32_t } div_int The integer part of the value to divide the source clock by. This is useful to not overwhelm the GPIO pin with a fast clock. this is in range of 1..2^24-1.
     * @param { uint8_t } div_frac The fractional part of the value to divide the source clock by. This is in range of 0..255 (/256).
     */
    function clock_gpio_init_int_frac(gpio: number, src: number, div_int: number, div_frac: number): void;

    /**
     * Output an optionally divided clock to the specified gpio pin.
     * @param { uint32_t } gpio The GPIO pin to output the clock to. Valid GPIOs are: 21, 23, 24, 25. These GPIOs are connected to the GPOUT0-3 clock generators.
     * @param { uint32_t } src The source clock. See the register field CLOCKS_CLK_GPOUT0_CTRL_AUXSRC for a full list. The list is the same for each GPOUT clock generator.
     * @param { float } div The float amount to divide the source clock by. This is useful to not overwhelm the GPIO pin with a fast clock.
     */
    function clock_gpio_init(gpio: number, src: number, div: number): void;

    /**
     * Configure a clock to come from a gpio input.
     * @param { uint32_t } clk_index The clock to configure.
     * @param { uint32_t } gpio The GPIO pin to run the clock from. Valid GPIOs are: 20 and 22.
     * @param { uint32_t } src_freq Frequency of the input clock source.
     * @param { uint32_t } freq Requested frequency.
     */
    function clock_configure_gpin(clk_index: number, gpio: number, src_freq: number, freq: number): boolean;

    /**
     * Select GPIO function.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } fn Which GPIO function select to use from list gpio_function.
     */
    function gpio_set_function(gpio: number, fn: number): void;

    /**
     * Determine current GPIO function.
     * @param { uint32_t } gpio GPIO number.
     * @returns { int } Which GPIO function is currently selected from list gpio_function .
     */
    function gpio_get_function(gpio: number): number;

    /**
     * Select up and down pulls on specific GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @param { bool } up If true set a pull up on the GPIO.
     * @param { bool } down If true set a pull down on the GPIO.
     */
    function gpio_set_pulls(gpio: number, up: boolean, down: boolean): void;

    /**
     * Set specified GPIO to be pulled up.
     * @param { uint32_t } gpio GPIO number.
     */
    function gpio_pull_up(gpio: number): void;

    /**
     * Determine if the specified GPIO is pulled up.
     * @param { uint32_t } gpio GPIO number.
     * @returns { bool } True if the GPIO is pulled up .
     */
    function gpio_is_pulled_up(gpio: number): boolean;

    /**
     * Set specified GPIO to be pulled down.
     * @param { uint32_t } gpio GPIO number.
     */
    function gpio_pull_down(gpio: number): void;

    /**
     * Determine if the specified GPIO is pulled down.
     * @param { uint32_t } gpio GPIO number.
     * @returns { bool } True if the GPIO is pulled down .
     */
    function gpio_is_pulled_down(gpio: number): boolean;

    /**
     * Disable pulls on specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     */
    function gpio_disable_pulls(gpio: number): void;

    /**
     * Set GPIO IRQ override.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } value See gpio_override.
     */
    function gpio_set_irqover(gpio: number, value: number): void;

    /**
     * Set GPIO output override.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } value See gpio_override.
     */
    function gpio_set_outover(gpio: number, value: number): void;

    /**
     * Select GPIO input override.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } value See gpio_override.
     */
    function gpio_set_inover(gpio: number, value: number): void;

    /**
     * Select GPIO output enable override.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } value See gpio_override.
     */
    function gpio_set_oeover(gpio: number, value: number): void;

    /**
     * Enable GPIO input.
     * @param { uint32_t } gpio GPIO number.
     * @param { bool } enabled True to enable input on specified GPIO.
     */
    function gpio_set_input_enabled(gpio: number, enabled: boolean): void;

    /**
     * Enable/disable GPIO input hysteresis (Schmitt trigger).
     * @param { uint32_t } gpio GPIO number.
     * @param { bool } enabled True to enable input hysteresis on specified GPIO.
     */
    function gpio_set_input_hysteresis_enabled(gpio: number, enabled: boolean): void;

    /**
     * Determine whether input hysteresis is enabled on a specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     */
    function gpio_is_input_hysteresis_enabled(gpio: number): boolean;

    /**
     * Set slew rate for a specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } slew GPIO output slew rate.
     */
    function gpio_set_slew_rate(gpio: number, slew: number): void;

    /**
     * Determine current slew rate for a specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @returns { int } Current slew rate of that GPIO .
     */
    function gpio_get_slew_rate(gpio: number): number;

    /**
     * Set drive strength for a specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } drive GPIO output drive strength.
     */
    function gpio_set_drive_strength(gpio: number, drive: number): void;

    /**
     * Determine current slew rate for a specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @returns { int } Current drive strength of that GPIO .
     */
    function gpio_get_drive_strength(gpio: number): number;

    /**
     * Enable or disable specific interrupt events for specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } event_mask Which events will cause an interrupt.
     * @param { bool } enabled Enable or disable flag.
     */
    function gpio_set_irq_enabled(gpio: number, event_mask: number, enabled: boolean): void;

    /**
     * Set the generic callback used for GPIO IRQ events for the current core.
     * @param { gpio_irq_callback_t } callback Default user function to call on GPIO irq. Note only one of these can be set per processor.
     */
    function gpio_set_irq_callback(callback: gpio_irq_callback_t): void;

    /**
     * Convenience function which performs multiple GPIO IRQ related initializations.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } event_mask Which events will cause an interrupt. See gpio_irq_level for details.
     * @param { bool } enabled Enable or disable flag.
     * @param { gpio_irq_callback_t } callback User function to call on GPIO irq. if NULL, the callback is removed.
     */
    function gpio_set_irq_enabled_with_callback(
        gpio: number,
        event_mask: number,
        enabled: boolean,
        callback: gpio_irq_callback_t,
    ): void;

    /**
     * Enable dormant wake up interrupt for specified GPIO and events.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } event_mask Which events will cause an interrupt. See gpio_irq_level for details.
     * @param { bool } enabled Enable/disable flag.
     */
    function gpio_set_dormant_irq_enabled(gpio: number, event_mask: number, enabled: boolean): void;

    /**
     * Return the current interrupt status (pending events) for the given GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @returns { uint32_t } Bitmask of events that are currently pending for the GPIO. See gpio_irq_level for details. .
     */
    function gpio_get_irq_event_mask(gpio: number): number;

    /**
     * Acknowledge a GPIO interrupt for the specified events on the calling core.
     * @param { uint32_t } gpio GPIO number.
     * @param { uint32_t } event_mask Bitmask of events to clear. See gpio_irq_level for details.
     */
    function gpio_acknowledge_irq(gpio: number, event_mask: number): void;

    /**
     * Initialise a GPIO for (enabled I/O and set func to GPIO_FUNC_SIO).
     * @param { uint32_t } gpio GPIO number.
     */
    function gpio_init(gpio: number): void;

    /**
     * Resets a GPIO back to the NULL function, i.e. disables it.
     * @param { uint32_t } gpio GPIO number.
     */
    function gpio_deinit(gpio: number): void;

    /**
     * Initialise multiple GPIOs (enabled I/O and set func to GPIO_FUNC_SIO).
     * @param { uint32_t } gpio_mask Mask with 1 bit per GPIO number to initialize.
     */
    function gpio_init_mask(gpio_mask: number): void;

    /**
     * Get state of a single specified GPIO.
     * @param { uint32_t } gpio GPIO number.
     * @returns { bool } Current state of the GPIO. 0 for low, non-zero for high .
     */
    function gpio_get(gpio: number): boolean;

    /**
     * Get raw value of all GPIOs.
     * @returns { uint32_t } Bitmask of raw GPIO values, as bits 0-29 .
     */
    function gpio_get_all(): number;

    /**
     * Drive high every GPIO appearing in mask.
     * @param { uint32_t } mask Bitmask of GPIO values to set, as bits 0-29.
     */
    function gpio_set_mask(mask: number): void;

    /**
     * Drive low every GPIO appearing in mask.
     * @param { uint32_t } mask Bitmask of GPIO values to clear, as bits 0-29.
     */
    function gpio_clr_mask(mask: number): void;

    /**
     * Toggle every GPIO appearing in mask.
     * @param { uint32_t } mask Bitmask of GPIO values to toggle, as bits 0-29.
     */
    function gpio_xor_mask(mask: number): void;

    /**
     * Drive GPIO high/low depending on parameters.
     * @param { uint32_t } mask Bitmask of GPIO values to change, as bits 0-29.
     * @param { uint32_t } value Value to set.
     */
    function gpio_put_masked(mask: number, value: number): void;

    /**
     * Drive all pins simultaneously.
     * @param { uint32_t } value Bitmask of GPIO values to change, as bits 0-29.
     */
    function gpio_put_all(value: number): void;

    /**
     * Drive a single GPIO high/low.
     * @param { uint32_t } gpio GPIO number.
     * @param { bool } value If false clear the GPIO, otherwise set it.
     */
    function gpio_put(gpio: number, value: boolean): void;

    /**
     * Determine whether a GPIO is currently driven high or low.
     * @param { uint32_t } gpio GPIO number.
     * @returns { bool } True if the GPIO output level is high, false if low. .
     */
    function gpio_get_out_level(gpio: number): boolean;

    /**
     * Set a number of GPIOs to output.
     * @param { uint32_t } mask Bitmask of GPIO to set to output, as bits 0-29.
     */
    function gpio_set_dir_out_masked(mask: number): void;

    /**
     * Set a number of GPIOs to input.
     * @param { uint32_t } mask Bitmask of GPIO to set to input, as bits 0-29.
     */
    function gpio_set_dir_in_masked(mask: number): void;

    /**
     * Set multiple GPIO directions.
     * @param { uint32_t } mask Bitmask of GPIO to set to input, as bits 0-29.
     * @param { uint32_t } value Values to set.
     */
    function gpio_set_dir_masked(mask: number, value: number): void;

    /**
     * Set direction of all pins simultaneously.
     * @param { uint32_t } values Individual settings for each gpio; for GPIO N, bit N is 1 for out, 0 for in.
     */
    function gpio_set_dir_all_bits(values: number): void;

    /**
     * Set a single GPIO direction.
     * @param { uint32_t } gpio GPIO number.
     * @param { bool } out True for out, false for in.
     */
    function gpio_set_dir(gpio: number, out: boolean): void;

    /**
     * Check if a specific GPIO direction is OUT.
     * @param { uint32_t } gpio GPIO number.
     * @returns { bool } True if the direction for the pin is OUT .
     */
    function gpio_is_dir_out(gpio: number): boolean;

    /**
     * Get a specific GPIO direction.
     * @param { uint32_t } gpio GPIO number.
     * @returns { uint } 1 for out, 0 for in .
     */
    function gpio_get_dir(gpio: number): number;

    /**
     * Return a 32 bit timestamp value in microseconds.
     * @returns { uint32_t } The 32 bit timestamp .
     */
    function time_us_32(): number;

    /**
     * Return the current 64 bit timestamp value in microseconds.
     * @returns { uint64_t } The 64 bit timestamp.
     */
    function time_us_64(): number;

    /**
     * Busy wait wasting cycles for the given (32 bit) number of microseconds.
     * @param { uint32_t } delay_us Delay amount in microseconds.
     */
    function busy_wait_us_32(delay_us: number): void;

    /**
     * Busy wait wasting cycles for the given (64 bit) number of microseconds.
     * @param { uint64_t } delay_us Delay amount in microseconds.
     */
    function busy_wait_us(delay_us: number): void;

    /**
     * Busy wait wasting cycles for the given number of milliseconds.
     * @param { uint32_t } delay_ms Delay amount in milliseconds.
     */
    function busy_wait_ms(delay_ms: number): void;

    /**
     * Busy wait wasting cycles until after the specified timestamp.
     * @param { absolute_time_t } t Absolute time to wait until.
     */
    function busy_wait_until(t: number): void;

    /**
     * Check if the specified timestamp has been reached.
     * @param { absolute_time_t } t Absolute time to compare against current time.
     * @returns { bool } True if it is now after the specified timestamp .
     */
    function time_reached(t: number): boolean;

    /**
     * Cooperatively claim the use of this hardware alarm_num.
     * @param { uint32_t } alarm_num The hardware alarm to claim.
     */
    function hardware_alarm_claim(alarm_num: number): void;

    /**
     * Cooperatively claim the use of this hardware alarm_num.
     * @param { bool } required
     * @returns { int } Alarm_num the hardware alarm claimed or -1 if requires was false, and none are available .
     */
    function hardware_alarm_claim_unused(required: boolean): number;

    /**
     * Cooperatively release the claim on use of this hardware alarm_num.
     * @param { uint32_t } alarm_num The hardware alarm to unclaim.
     */
    function hardware_alarm_unclaim(alarm_num: number): void;

    /**
     * Determine if a hardware alarm has been claimed.
     * @param { uint32_t } alarm_num The hardware alarm number.
     * @returns { bool } True if claimed, false otherwise .
     */
    function hardware_alarm_is_claimed(alarm_num: number): boolean;

    /**
     * Enable/Disable a callback for a hardware timer on this core.
     * @param { uint32_t } alarm_num The hardware alarm number.
     * @param { hardware_alarm_callback_t } callback The callback to install, or NULL to unset.
     */
    function hardware_alarm_set_callback(alarm_num: number, callback: hardware_alarm_callback_t): void;

    /**
     * Set the current target for the specified hardware alarm.
     * @param { uint32_t } alarm_num The hardware alarm number.
     * @param { absolute_time_t } t The target timestamp.
     * @returns { bool } True if the target was &quot;missed&quot;; i.e. it was in the past, or occurred before a future hardware timeout could be set .
     */
    function hardware_alarm_set_target(alarm_num: number, t: number): boolean;

    /**
     * Cancel an existing target (if any) for a given hardware_alarm.
     * @param { uint32_t } alarm_num The hardware alarm number.
     */
    function hardware_alarm_cancel(alarm_num: number): void;

    /**
     * Force and IRQ for a specific hardware alarm.
     * @param { uint32_t } alarm_num The hardware alarm number.
     */
    function hardware_alarm_force_irq(alarm_num: number): void;
}
