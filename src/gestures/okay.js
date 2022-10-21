const fp = require("fingerpose");

const okayDescription = new fp.GestureDescription("okay");

// thumb:
// - curl: none (must)
// - direction vertical up (best)
// - direction diagonal up left / right (acceptable)
okayDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
okayDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
okayDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
okayDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  0.9
);

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  okayDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  okayDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// require the index finger to be somewhat left or right pointing
// but NOT down and NOT fully up
okayDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
okayDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
okayDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);
okayDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);

module.exports = okayDescription;
