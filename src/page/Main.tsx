import { useEffect, useState } from "react";
import { fabric } from "fabric";

const Main = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | "">("");
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);
  const initCanvas = (): fabric.Canvas =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      backgroundColor: "pink",
    });
  const options = {
    top: 100, // 원하는 위치 Y좌표 값
    left: 100, // 원하는 위치 X좌표 값
    scaleX: 0.5, // 이미지 가로 축 크기 조절 값
    scaleY: 0.5, // 이미지 세로 축 크기 조절 값
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const dataUrl = event.target?.result as string;
      fabric.Image.fromURL(dataUrl, (image) => {
        options;
        canvas?.add(image);
        canvas?.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <h1>호호반우</h1>
      <canvas id="canvas" />
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default Main;
