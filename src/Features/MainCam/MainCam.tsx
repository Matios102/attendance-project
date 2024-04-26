import React from "react";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

function MainCam() {
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame }: CameraOptions) =>
        new Camera(mediaSrc, {
          onFrame,
        }),
    });

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute top-0 text-white p-2 font-semibold">
        {detected ? (
          facesDetected > 1 ? (
            <p className="bg-yellow-500 p-2 rounded-lg">
              {facesDetected} People Detected, please show only one person
            </p>
          ) : (
            <p className="bg-green-500 p-2 rounded-lg">Person Detected</p>
          )
        ) : (
          <p className="bg-red-500 p-2 rounded-lg">No Person Detected</p>
        )}
      </div>
      {boundingBox.map((box, index) => (
        <div
          key={`${index + 1}`}
          style={{
            border: "2px solid green",
            position: "absolute",
            top: `${box.yCenter * 100}%`,
            left: `${box.xCenter * 100}%`,
            width: `${box.width * 100}%`,
            height: `${box.height * 100}%`,
            zIndex: 1,
          }}
        />
      ))}
      <Webcam
        ref={webcamRef}
        forceScreenshotSourceSize
        className="w-full h-full object-cover rounded-lg"
        // mirrored={true}
      />
    </div>
  );
}

export default MainCam;
