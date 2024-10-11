import { useLocation } from "react-router-dom";
import "./MainContent.scss";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { getFileByFileId } from "../../../../utils/axios/file";

const SalesFishDetail = () => {
  const location = useLocation();
  const { state } = location;
  const [imagePreviews, setImagePreviews] = useState();

  useEffect(() => {
    async function fetchFishImages() {
      try {
        // Ensure state.fishes is an array and has content before proceeding
        if (Array.isArray(state.fishes) && state.fishes.length > 0) {
          const imagePromises = state.fishes.map(async (fish) => {
            const fileId = fish.file.id;
            const imageResponse = await getFileByFileId(fileId);
            return URL.createObjectURL(imageResponse);
          });

          // Wait for all promises to resolve (i.e., all image URLs to be fetched)
          const imageUrls = await Promise.all(imagePromises);
          setImagePreviews(imageUrls); // Set the image preview to an array of URLs
        }
      } catch (error) {
        console.error("Error fetching fish images:", error);
      }
    }

    fetchFishImages();
  }, []);

  const cardStyle = {
    width: 300,
  };
  return (
    <div className="main-content">
      {/* Slider Section */}
      <div className="slider-container">
        {imagePreviews && imagePreviews.map && imagePreviews.map((image, index) => (
          <img className="fish-image" src={image} alt="" key={index} />
        ))}
      </div>

      <div className="card-container">
        <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
        >
          <Flex
            vertical
            align="flex-end"
            justify="space-around"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title
              level={5}
              style={{ width: "100%" }}
              ellipsis={{ rows: 4 }}
            >
              antd is an enterprise-class UI design language and React UI
              library. antd is an enterprise-class UI design language and React
              UI library.
            </Typography.Title>
            <Button type="primary" href="https://ant.design" target="_blank">
              View Detail
            </Button>
          </Flex>
        </Card>
        <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
        >
          <Flex
            vertical
            align="flex-end"
            justify="space-around"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title
              level={5}
              style={{ width: "100%" }}
              ellipsis={{ rows: 4 }}
            >
              antd is an enterprise-class UI design language and React UI
              library. antd is an enterprise-class UI design language and React
              UI library.
            </Typography.Title>
            <Button type="primary" href="https://ant.design" target="_blank">
              View Detail
            </Button>
          </Flex>
        </Card>
        <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
        >
          <Flex
            vertical
            align="flex-end"
            justify="space-around"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title
              level={5}
              style={{ width: "100%" }}
              ellipsis={{ rows: 4 }}
            >
              antd is an enterprise-class UI design language and React UI
              library. antd is an enterprise-class UI design language and React
              UI library.
            </Typography.Title>
            <Button type="primary" href="https://ant.design" target="_blank">
              View Detail
            </Button>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default SalesFishDetail;
