/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

// flowlint unsafe-getters-setters:off

import Event from '../../src/private/webapis/dom/events/Event';

/**
 * Event dispatched when the hardware back button is pressed on Android.
 *
 * The `timeStamp` property reflects the native timestamp from
 * `SystemClock.uptimeMillis()` captured when the back press was emitted,
 * or falls back to `performance.now()` at event construction time if
 * no native timestamp is available.
 */
export class HardwareBackPressEvent extends Event {
  _nativeTimestamp: ?number;

  constructor(timestamp?: number) {
    super('hardwareBackPress');
    this._nativeTimestamp = timestamp;
  }

  get timeStamp(): number {
    return this._nativeTimestamp ?? super.timeStamp;
  }
}

export const HardwareBackPressEvent_public: typeof HardwareBackPressEvent =
  /* eslint-disable no-shadow */
  // $FlowExpectedError[incompatible-type]
  function HardwareBackPressEvent() {
    throw new TypeError(
      "Failed to construct 'HardwareBackPressEvent': Illegal constructor",
    );
  };

// $FlowExpectedError[prop-missing]
HardwareBackPressEvent_public.prototype = HardwareBackPressEvent.prototype;
