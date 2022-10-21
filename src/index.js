const handpose = require("@tensorflow-models/handpose"),
  tf = require("@tensorflow/tfjs-core"),
  pixels = require("image-pixels");

require("@tensorflow/tfjs-backend-wasm");

const { GestureEstimator, Gestures } = require("fingerpose");

const detect = async (imagePath) => {
  //set tfjs backend type
  await tf.setBackend("wasm");

  //initialize gesture estimator with gestures
  const GE = new GestureEstimator([
    Gestures.VictoryGesture,
    Gestures.ThumbsUpGesture,
  ]);

  //get pixelData from img
  const img = await pixels(imagePath);

  // Load the MediaPipe handpose model.
  console.log("Loading model...");
  const model = await handpose.load();

  console.log(`Detecting \'${imagePath}\' hand landmarks...`);

  console.time("Estimation time");
  // Pass in pixelData to obtain a hand prediction from the MediaPipe graph.
  const hands = await model.estimateHands(img);

  if (!hands[0]?.landmarks) {
    console.log("no hand detected");
    return;
  }

  //estimate
  const estimatedGestures = await GE.estimate(hands[0].landmarks, 8.5);

  // console.log(JSON.stringify(estimatedGestures));

  console.table({
    handScore: hands[0].handInViewConfidence,
    gesture:
      estimatedGestures.gestures[0]?.name || "no registered gesture detected",
    gestureScore:
      estimatedGestures.gestures[0]?.score || "no registered gesture detected",
  });
  console.timeEnd("Estimation time");
};

// detect("/home/rodrigo/dev/ai-test/src/images/index_finger.jpg");
// detect("/home/rodrigo/dev/ai-test/src/images/no_hand.jpg");
// detect("/home/rodrigo/dev/ai-test/src/images/okay.jpg");
// detect("/home/rodrigo/dev/ai-test/src/images/palm.jpg");
detect("/home/rodrigo/dev/ai-test/src/images/thumbsup.jpg");
// detect("/home/rodrigo/dev/ai-test/src/images/thumbsup_2.jpg");
// detect("/home/rodrigo/dev/ai-test/src/images/victory_1.png");
// detect("/home/rodrigo/dev/ai-test/src/images/victory_2.jpg");
// detect("/home/rodrigo/dev/ai-test/src/images/drawing_hand.jpg");
// detect("/home/rodrigo/dev/ai-test/src/images/goku_hand.png");
