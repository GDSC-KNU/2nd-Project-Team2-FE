/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { styled } from "styled-components";
import { GithubPicker } from "react-color";
import html2canvas from "html2canvas";
import defaultPng from "/assets/default.png";
import cigarette from "/assets/cigarette.png";
import darkCircle from "/assets/darkCircle.png";
import hat from "/assets/hat.png";
import coffee from "/assets/coffee.png";
import glasses from "/assets/glasses.png";
import glow from "/assets/glow.png";
import graduationCloth from "/assets/graduationCloth.png";
import graduationHat from "/assets/graduationCloth.png";
import hotSix from "/assets/hotSix.png";
import macbook from "/assets/macbook.png";
import mask from "/assets/mask.png";
import schoolUniform from "/assets/schoolUniform.png";
import Smoke from "/assets/Smoke.png";
import soju from "/assets/soju.png";
import sunglass from "/assets/soju.png";

const Main = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const captureRef = useRef<HTMLDivElement>(null);
  const [captureUrl, SetCaptureUrl] = useState("");
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);
  const initCanvas = (): fabric.Canvas => {
    const newCanvas = new fabric.Canvas("canvas", {
      height: 370,
      width: 370,
      backgroundColor: backgroundColor,
    });
    fabric.Image.fromURL(defaultPng, (img) => {
      // Canvas에 이미지 추가
      newCanvas.add(img);
      // 이미지 위치 및 크기 조정
      img.set({ left: 0, top: 0, scaleX: 0.65, scaleY: 0.65 });
      newCanvas.renderAll();
    });
    setCheckItems(new Set());
    return newCanvas;
  };
  // const options = {
  //   top: 100, // 원하는 위치 Y좌표 값
  //   left: 100, // 원하는 위치 X좌표 값
  //   scaleX: 0.5, // 이미지 가로 축 크기 조절 값
  //   scaleY: 0.5, // 이미지 세로 축 크기 조절 값
  // };
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files == null) return;
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (event: ProgressEvent<FileReader>) => {
  //     const dataUrl = event.target?.result as string;
  //     fabric.Image.fromURL(dataUrl, (image: fabric.Image) => {
  //       options;
  //       canvas!.add(image);
  //       canvas!.renderAll();
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };
  const handleColorChange = ({ hex }: any) => {
    setBackgroundColor(hex);
  };
  const handleCapture = () => {
    if (!captureRef.current) {
      return;
    }

    html2canvas(captureRef.current).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      navigator.clipboard.writeText(dataURL);
      SetCaptureUrl(dataURL);
      setShowModal(true);
    });
  };

  const Desc = styled.div`
    text-align: center;
  `;

  const customColors = [
    "#ffffff", // 흰색 추가
    "#f44",
    "#f44336",
    "#ff5722",
    "#ff9800",
    "#ffc107",
    "#ffeb3b",
    "#cddc39",
    "#8bc34a",
    "#4caf50",
    "#009688",
    "#00bcd4",
    "#03a9f4",
    "#2196f3",
    "#3f51b5",
    "#673ab7",
    "#9c27b0",
    "#e91e63",
    "#795548",
    "#000000",
  ];

  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [checkItems, setCheckItems] = useState(new Set());

  const photoList = [
    cigarette,
    coffee,
    darkCircle,
    glasses,
    glow,
    graduationCloth,
    graduationHat,
    hat,
    hotSix,
    macbook,
    mask,
    schoolUniform,
    Smoke,
    soju,
    sunglass,
  ];
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCheckBoxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const isChecked = event.target.checked;
    // const ctx = canvas.getContext("2d");

    if (isChecked) {
      setCheckItems(checkItems.add(id));

      // 이미지 로드
      const index = photoList.indexOf(id);
      const img = new Image();
      img.src = photoList[index];

      // 이미지 로드 후 fabric.Image 객체 생성
      img.onload = () => {
        const newImg = new fabric.Image(img, {
          top: 0,
          left: 0,
          scaleX: 0.65,
          scaleY: 0.65,
        });
        canvas!.add(newImg);
      };
    }
    // else {
    //   checkItems.delete(id);
    //   setCheckItems(new Set(checkItems));

    //   // 이미지 삭제
    //   const objects = canvas!.getObjects();
    //   objects.forEach((obj) => {
    //     if (obj!.src === id) {
    //       canvas!.remove(obj);
    //       console.log(obj);
    //     }
    //   });
    // }
  };
  const handleCopy = () => {
    if (!captureRef.current) {
      return;
    }

    html2canvas(captureRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        const blobUrl = URL.createObjectURL(blob!);
        navigator.clipboard
          .write([
            new ClipboardItem({
              [blob!.type]: blob!,
            }),
          ])
          .then(function () {
            console.log("Copied to clipboard successfully!");
            SetCaptureUrl(blobUrl);
            setShowModal(true);
          });
      });
    });
  };

  const menuArr = [
    {
      name: "배경",
      content: (
        <>
          <BackgroundColorPicker>
            <GithubPicker colors={customColors} onChangeComplete={handleColorChange} />
            {/* <HuePicker color={color} onChange={handleHueChange} />

          <AlphaPicker color={color} onChange={handleAlphaChange} /> */}
            <h3>배경화면 색을 골라주세요!</h3>
          </BackgroundColorPicker>
          <button onClick={initCanvas}>Reset and add again</button>
        </>
      ),
    },
    {
      name: "꾸미기",
      content: (
        <>
          {/* <input type="file" onChange={handleImageUpload} /> */}
          <button onClick={initCanvas}>Reset and add again</button>
          <CheckBoxList>
            {photoList.map((issue, index) => (
              <CheckBox key={index} id={issue}>
                <img alt="미리보기" width="30%" height="30%" src={issue} />
                {/* <h3>{issue}</h3> */}
                <label>
                  <input type="checkbox" id={issue} onChange={handleCheckBoxClick} />
                </label>
              </CheckBox>
            ))}
          </CheckBoxList>
        </>
      ),
    },
    {
      name: "저장",
      content: (
        <>
          <button onClick={handleCapture}>Capture and copy to clipboard</button>
        </>
      ),
    },
  ];

  const selectMenuHandler = (index: number) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };
  useEffect(() => {
    const newCanvas = new fabric.Canvas("canvas", {
      height: 370,
      width: 370,
      backgroundColor: backgroundColor,
    });
    fabric.Image.fromURL(defaultPng, (img) => {
      // Canvas에 이미지 추가
      newCanvas.add(img);
      // 이미지 위치 및 크기 조정
      img.set({ left: 0, top: 0, scaleX: 0.65, scaleY: 0.65 });
      newCanvas.renderAll();
    });
    setCanvas(newCanvas);
  }, [backgroundColor]);
  return (
    <Layout>
      <Header>호호반우</Header>
      <CanvasLayout ref={captureRef}>
        <canvas id="canvas" />
      </CanvasLayout>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li key={index} className={index === currentTab ? "submenu focused" : "submenu"} onClick={() => selectMenuHandler(index)}>
            {el.name}
          </li>
        ))}
      </TabMenu>
      <Desc>{menuArr[currentTab].content}</Desc>
      {captureUrl && showModal && (
        <ModalWrapper>
          <ModalOverlay onClick={handleCloseModal} />
          <ImageModal>
            <CloseModalButton onClick={handleCloseModal}>X</CloseModalButton>
            <img alt="미리보기" width="100%" height="100%" src={captureUrl} />
            <CopyButton onClick={handleCopy}>복사</CopyButton>
          </ImageModal>
        </ModalWrapper>
      )}
    </Layout>
  );
};

export default Main;

const CopyButton = styled.button`
  display: inline-block;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;
`;
const CloseModalButton = styled.button`
  background: transparent;
  border: 1px dotted black;
  position: absolute;
  top: 0;
  right: 0;
`;
const ModalWrapper = styled.div`
  height: 30rem;
  width: 22.5rem;
  top: 5rem;
  background-color: white;
  padding: 2rem;
  border: 1px dotted black;
  position: absolute;
`;
const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImageModal = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  padding-top: 3rem;
  transform: translate(-50%, -50%);
`;

const Layout = styled.div`
  height: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2rem;
  margin: 1rem;
`;

const BackgroundColorPicker = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CanvasLayout = styled.div`
  border: 2px solid black;
`;

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-top: 10px;
  width: 100%;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`;

const CheckBoxList = styled.div`
  width: 100%;
  margin-right: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckBox = styled.div`
  width: 90%;
  border: 2px solid black;
  border-radius: 2%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem 0rem 0rem;
`;
