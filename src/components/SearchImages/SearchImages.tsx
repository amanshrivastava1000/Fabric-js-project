import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const PIXABAY_API_KEY = "35360285-44bf1fd8a1da6933b82e1924d"; // Your Pixabay API key

const SearchImages = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasEl = useRef<HTMLCanvasElement | null>(null);

  //  This function is work on the Enter button also
  const fetchImages = async () => {
    if (!inputSearch.trim()) return;

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
          inputSearch
        )}&image_type=photo&per_page=5`
      );
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (selectedImage && canvasEl.current) {
      const fabricCanvas = new fabric.Canvas(canvasEl.current, {
        backgroundColor: "#f5f5f5",
      });
      canvasRef.current = fabricCanvas;

      const imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = selectedImage;

      imgElement.onload = () => {
        const fabricImg = new fabric.Image(imgElement, {
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5,
        });

        fabricCanvas.add(fabricImg);
      };

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [selectedImage]);

  const addCaption = () => {
    if (canvasRef.current) {
      const text = new fabric.IText("Edit Me!", {
        left: 100,
        top: 200,
        fontSize: 24,
        fill: "white",
        backgroundColor: "black",
        padding: 5,
        editable: true,
      });

      canvasRef.current.add(text);
      console.log("canvas for text", canvasRef?.current);
      canvasRef.current.setActiveObject(text);
      text.enterEditing(); //for auto focus
      text.selectAll();
      canvasRef.current.renderAll();
    }
  };

  const addRectangle = () => {
    if (canvasRef.current) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 150,
        height: 100,
        fill: "red",
        stroke: "black",
        strokeWidth: 2,
      });

      canvasRef.current.add(rect);
      console.log("canvas for rectangle", canvasRef.current);
      canvasRef.current.setActiveObject(rect);
      canvasRef.current.renderAll();
    }
  };

  const addCircle = () => {
    if (canvasRef.current) {
      const circle = new fabric.Circle({
        left: 200,
        top: 150,
        radius: 50,
        fill: "blue",
        stroke: "black",
        strokeWidth: 2,
      });

      canvasRef.current.add(circle);
      console.log("canvas for circle", canvasRef.current);
      canvasRef.current.setActiveObject(circle);
      canvasRef.current.renderAll();
    }
  };

  const addTriangle = () => {
    if (canvasRef.current) {
      const triangle = new fabric.Triangle({
        left: 300,
        top: 200,
        width: 100,
        height: 100,
        fill: "green",
        stroke: "black",
        strokeWidth: 2,
      });

      canvasRef.current.add(triangle);
      console.log("canvas for trinagle", canvasRef.current);
      canvasRef.current.setActiveObject(triangle);
      canvasRef.current.renderAll();
    }
  };

  const addPolygon = () => {
    if (canvasRef.current) {
      const polygon = new fabric.Polygon(
        [
          { x: 50, y: 0 },
          { x: 100, y: 50 },
          { x: 75, y: 100 },
          { x: 25, y: 100 },
          { x: 0, y: 50 },
        ],
        {
          left: 400,
          top: 200,
          fill: "purple",
          stroke: "black",
          strokeWidth: 2,
        }
      );

      canvasRef.current.add(polygon);
      console.log("canvas for polygon", canvasRef.current);
      canvasRef.current.setActiveObject(polygon);
      canvasRef.current.renderAll();
    }
  };

  const downloadCanvas = () => {
    if (canvasRef.current) {
      try {
        const dataURL = canvasRef.current.toDataURL({
          format: "png",
          quality: 1.0,
        });

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "canvas.png";
        link.click();
      } catch (error) {
        console.error("Download failed", error);
      }
    }
  };

  return (
    <div>
      <div className="search-box">
        <input
          className="search-input"
          placeholder="Search for images"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchImages();
            }
          }}
        />
        <button className="fetch-image-button" onClick={fetchImages}>
          Search
        </button>
      </div>

      <div className="container">
        <div className="image-grid">
          {images?.map((item: any) => (
            <div key={item.id} className="image-card">
              <img
                src={item.webformatURL}
                alt={item.tags}
                className="image"
                onClick={() => setSelectedImage(item.webformatURL)}
              />
              <button
                className="add-caption-button"
                onClick={() => setSelectedImage(item.webformatURL)}
              >
                Add to Canvas
              </button>
            </div>
          ))}

          {images.length > 0 ? (
            <div>click on Image or button to add image in canvas</div>
          ) : (
            ""
          )}
        </div>

        {selectedImage && (
          <div className="canvas-container">
            <canvas
              ref={canvasEl}
              width={600}
              height={400}
              style={{ border: "1px solid black" }}
            />

            <div className="canvas-buttons">
              <button onClick={addCaption}>Add Caption</button>
              <button onClick={addRectangle}>Add Rectangle</button>
              <button onClick={addCircle}>Add Circle</button>
              <button onClick={addTriangle}>Add Triangle</button>
              <button onClick={addPolygon}>Add Polygon</button>
              <button onClick={downloadCanvas}>Download</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchImages;
