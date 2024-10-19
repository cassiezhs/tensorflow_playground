let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  
  // Start video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  // Load the Handpose model
  handpose = ml5.handpose(video, modelLoaded);
  
  // When handpose detects hands, it calls this function
  handpose.on('predict', results => {
    predictions = results;
  });
}

function modelLoaded() {
  console.log('Handpose model loaded!');
}

function draw() {
  // Display the video
  image(video, 0, 0, width, height);

  // Draw hand keypoints if any hands are detected
  for (let i = 0; i < predictions.length; i++) {
    let hand = predictions[i];
    for (let j = 0; j < hand.landmarks.length; j++) {
      let [x, y] = hand.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 10, 10);  // Draw a circle at each hand keypoint
    }
  }
}
