import React, { useEffect } from "react";
import {
  BoundingBox,
  CameraOptions,
  useFaceDetection,
} from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { useAppDispatch } from "../../store/store";
import {
  resetDetectionStatus,
  selectDetectedPeopleNames,
  selectDetectionStatus,
  sendStudentPicture,
} from "../../store/slices/Student";
import { useSelector } from "react-redux";

function MainCam() {
  const dispatch = useAppDispatch();

  const { webcamRef, boundingBox, detected, facesDetected } = useFaceDetection({
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
  }) as unknown as {
    webcamRef: React.RefObject<Webcam>;
    boundingBox: BoundingBox[];
    detected: boolean;
    facesDetected: number;
  };

  useEffect(() => {
    if (!detected) {
      dispatch(resetDetectionStatus());
    }
  }, [detected, dispatch]);

  useEffect(() => {
    if (
      detected &&
      facesDetected === 1 &&
      webcamRef !== null &&
      webcamRef.current
    ) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "student.jpg", {
              type: "image/jpeg",
            });
            dispatch(sendStudentPicture({ picture: file }));
          })
          .catch(console.error);
      }
    }
  }, [detected, facesDetected, dispatch, webcamRef]);

  const detectionStatus = useSelector(selectDetectionStatus);
  const detectedPeopleNames = useSelector(selectDetectedPeopleNames);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute top-0 text-white p-2 font-semibold">
        {detected ? (
          detectionStatus === "loading" ? (
            <p className="bg-blue-500 p-2 rounded-lg">Detecting Person...</p>
          ) : detectedPeopleNames.length > 0 ? (
            <p className="bg-green-500 p-2 rounded-lg">
              {detectedPeopleNames.join(", ")} Detected
            </p>
          ) :
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
      />
    </div>
  );
}

export default MainCam;
